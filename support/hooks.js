require('dotenv').config()
const { BeforeAll, Before, After, AfterAll, AfterStep, Status } = require('@cucumber/cucumber')
const fs = require('fs')
const path = require('path')
const playwright = require('@playwright/test')
const logger = require('../utilities/Logger')
const { launchBrowser, createBrowserContext, getPermissions, stabilizeNetworkConditions } = require('../utilities/BrowserUtil')
const { PageObjectManager } = require('../page_objects/Common/PageObjectManager')
const { APIUtil } = require('../utilities/APIUtil')
const { DataGenerator } = require('../data/DataGenerator')
const { BackEndHelper } = require('../utilities/BackEndHelper')

const sessionStatePath = path.resolve(__dirname, '../../out/loginSessionStorage.json')
const executionInCI = process.env.IS_CI === 'true'

const outputDir = path.resolve(__dirname, '../../out')
const screenshotsDir = path.join(outputDir, 'screenshots')
const videosDir = path.join(outputDir, 'videos')
const tracesDir = path.join(outputDir, 'traces')
const allureResultsDir = path.join(outputDir, 'allure-results')
const logsDir = path.join(outputDir, 'logs')
const coverageDir = path.join(outputDir, 'coverage')

function ensureDirectoriesExist (directories) {
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
      logger.info(`Directory created: ${dir}`)
    }
  })
}

BeforeAll(async function () {
  try {
    ensureDirectoriesExist([tracesDir, screenshotsDir, allureResultsDir, logsDir, coverageDir])
    logger.info('Global setup: All necessary directories have been created.')
  } catch (error) {
    logger.error(`Error during BeforeAll setup: ${error.message}`)
  }
})

Before(async function (scenario) {
  try {
    logger.info(`Starting Scenario: ${scenario.pickle.name}`)
    const browserToUse = process.env.BROWSER_TO_USE || 'chrome' // Read browser from .env
    const deviceToEmulate = process.env.DEVICE_TO_EMULATE || null // Read device from .env
    const permissions = getPermissions(browserToUse)
    const headless = process.env.HEADLESS_VIEWPORT === 'true' // Read headless mode from .env

    this.browser = await launchBrowser(browserToUse) // Launch the browser as per config
    const contextOptions = fs.existsSync(sessionStatePath) ? { storageState: sessionStatePath } : {}
    if (contextOptions.storageState) {
      logger.info('Loading session state from file.')
    } else {
      logger.info('No session state file found. Starting fresh session.')
    }

    // Create browser context with device emulation if specified
    this.context = await createBrowserContext(this.browser, contextOptions, permissions, headless, deviceToEmulate)

    await this.context.setDefaultTimeout(60000)
    this.page = await this.context.newPage()

    await stabilizeNetworkConditions(this.page)

    this.poManager = new PageObjectManager(this.page)
    this.loginPage = await this.poManager.fetchLoginPage()
    this.landingPage = await this.poManager.fetchLandingPage()
    this.apiContext = await playwright.request.newContext()
    this.apiUtil = new APIUtil(this.apiContext)
    this.dataGenerator = new DataGenerator(this.apiContext)
    this.backEndHelper = new BackEndHelper(this.apiUtil)
    this.jwtToken = await this.apiUtil.getjwtToken()

    await this.loginPage.gotoLoginPage()
    await this.loginPage.loginToMaya()
    await this.landingPage.waitForLoadState('domcontentloaded')

    if (!executionInCI) {
      await this.context.tracing.start({ screenshots: true, snapshots: true })
      this.tracingStarted = true
    }
  } catch (error) {
    logger.error(`Error during Before hook: ${error.message}`)
    throw error
  }
})

AfterStep(async function ({ result, pickle }) {
  if (result.status === Status.FAILED) {
    const sanitizedTitle = pickle.name.replace(/[^a-zA-Z0-9-_]/g, '_')
    const screenshotName = `${sanitizedTitle}-${Date.now()}.png`
    await this.page.screenshot({ path: path.join(screenshotsDir, screenshotName) })
    logger.error(`Step failed: ${pickle.name}, screenshot captured as ${screenshotName}.`)

    if (!this.tracingStarted && !executionInCI) {
      await this.context.tracing.start({ screenshots: true, snapshots: true })
      this.tracingStarted = true
    }
  }
})

After(async function ({ result, pickle }) {
  try {
    if (result.status === Status.FAILED) {
      logger.error(`Scenario Failed: ${pickle.name}, saving trace and video (if available).`)
      if (await this.page.video()) {
        // await this.page.close()
        const videoPath = await this.page.video().path()
        const targetVideoPath = path.join(videosDir, `${pickle.name.replace(/[^a-zA-Z0-9-_]/g, '_')}-${Date.now()}.webm`)
        fs.copyFileSync(videoPath, targetVideoPath)
        fs.unlinkSync(videoPath)
        logger.info(`Video saved as ${targetVideoPath}`)
      }

      if (this.tracingStarted && !executionInCI) {
        const tracePath = path.join(tracesDir, `${pickle.name.replace(/[^a-zA-Z0-9-_]/g, '_')}-${Date.now()}.zip`)
        await this.context.tracing.stop({ path: tracePath })
        logger.info(`Trace saved as ${tracePath}`)
      }
    } else {
      if (this.page.video()) {
        const videoPath = await this.page.video().path()
        fs.unlinkSync(videoPath)
      }
    }

    await this.page.close()
    await this.context.close()
    await this.browser.close()
  } catch (error) {
    logger.error(`Error during After hook: ${error.message}`)
    await this.page.close()
    await this.context.close()
    await this.browser.close()
  }
})

AfterAll(async function () {
  try {
    if (this.browser && typeof this.browser.close === 'function') {
      await this.page.close()
      await this.context.close()
      await this.browser.close()
      logger.info('Browser has been closed successfully.')
    }
  } catch (error) {
    logger.error(`Error during AfterAll cleanup: ${error.message}`)
  }
})

After({ tags: '@WKS_Mandatory' }, async function () {
  try {
    await this.apiUtil.deleteAPI(`api/v3/projects/${this.initialResponseMap.get('albertId')}`, await this.jwtToken)
  } catch (error) {
    logger.error(`Error during After hook with @WKS_Mandatory tag: ${error.message}`)
  }
})

After({ tags: '@Delete_Task' }, async function () {
  try {
    await this.apiUtil.deleteAPI(`api/v3/tasks/TAS${this.createdTaskID}`, await this.jwtToken)
  } catch (error) {
    logger.error(`Error during After hook with @Delete_Task tag: ${error.message}`)
  }
})

After({ tags: '@Delete_Lots' }, async function () {
  try {
    const lotIDs = this.lotInformationGenerated.map(item => item.albertId)
    const queryString = lotIDs.reduce((acc, id, index) => `${acc}${index === 0 ? '?' : '&'}id=${id}`, 'api/v3/lots')
    await this.apiUtil.deleteAPI(queryString, await this.jwtToken)
  } catch (error) {
    logger.error(`Error during After hook with @Delete_Lots tag: ${error.message}`)
  }
})

module.exports = {
  ensureDirectoriesExist,
  logger
}
