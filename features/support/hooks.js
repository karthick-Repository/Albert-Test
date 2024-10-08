const { BeforeAll, Before, After, AfterAll, AfterStep, Status } = require('@cucumber/cucumber')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const playwright = require('@playwright/test')
const logger = require('../../utilities/Logger')
const { PageObjectManager } = require('../../page_objects/Common/PageObjectManager')
const { APIUtil } = require('../../utilities/APIUtil')
const { DataGenerator } = require('../../data/DataGenerator')
const { BackEndHelper } = require('../../utilities/BackEndHelper')

const sessionStatePath = 'loginSessionStorage.json'
const executionInCI = process.env.IS_CI

function ensureDirectoriesExist (directories) {
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })
}

BeforeAll(async function () {
  try {
    if (executionInCI === 'false') {
      ensureDirectoriesExist(['traces'])
    }
    ensureDirectoriesExist(['videos', 'screenshots', 'allure-results'])
    logger.info('Global setup: All necessary directories have been created.')
    // if (fs.existsSync(sessionStatePath)) {
    //   execSync(`rm -rf ${sessionStatePath}`)
    //   logger.info('Session storage file has been deleted successfully.')
    // }
  } catch (error) {
    logger.error(`Error during BeforeAll setup: ${error.message}`)
  }
})

Before(async function (scenario) {
  try {
    logger.info(`Starting Scenario: ${scenario.pickle.name}`)
    this.browser = await playwright.chromium.launch({
      channel: 'chrome',
      headless: true
    })

    const contextOptions = fs.existsSync(sessionStatePath) ? { storageState: sessionStatePath } : {}
    this.context = await this.browser.newContext({
      ...contextOptions,
      permissions: ['clipboard-read', 'clipboard-write'],
      recordVideo: { dir: 'videos/' }
    })

    await this.context.setDefaultTimeout(60000)
    this.page = await this.context.newPage()
    this.poManager = new PageObjectManager(this.page)
    this.loginPage = await this.poManager.fetchLoginPage()
    this.landingPage = await this.poManager.fetchLandingPage()
    this.apiContext = await playwright.request.newContext()
    this.apiUtil = new APIUtil(this.apiContext)
    this.dataGenerator = new DataGenerator(this.apiContext)
    this.backEndHelper = new BackEndHelper(this.apiUtil)
    this.jwtToken = await this.apiUtil.getjwtToken()

    if (!contextOptions.storageState) {
      await this.loginPage.gotoLoginPage()
      await this.loginPage.loginToTheApplication()
      await this.landingPage.closeModalDialog()
      await this.context.storageState({ path: sessionStatePath })
      logger.info('Session state has been saved.')
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
    await this.page.screenshot({ path: path.join('screenshots', screenshotName) })
    logger.error(`Step failed: ${pickle.name}, screenshot captured as ${screenshotName}.`)

    if (!this.tracingStarted && executionInCI === 'false') {
      await this.context.tracing.start({ screenshots: true, snapshots: true })
      this.tracingStarted = true
    }
  }
})
 
After(async function ({ result, pickle }) {
  try {
    if (result.status === Status.FAILED) {
      logger.error(`Scenario Failed: ${pickle.name}, saving trace and video (if available).`)
      const video = await this.page.video()
      if (video) {
        const videoPath = await video.path()
        const targetVideoPath = path.join('videos', `${pickle.name.replace(/[^a-zA-Z0-9-_]/g, '_')}-${Date.now()}.webm`)
        fs.copyFileSync(videoPath, targetVideoPath)
      }

      if (this.tracingStarted && executionInCI === 'false') {
        const tracePath = path.join('traces', `${pickle.name.replace(/[^a-zA-Z0-9-_]/g, '_')}-${Date.now()}.zip`)
        await this.context.tracing.stop({ path: tracePath })
        logger.info(`Trace saved as ${tracePath}`)

        const client = await this.context.newCDPSession(this.page)
        await client.send('HeapProfiler.enable')
        await client.send('HeapProfiler.startSampling')
        const profile = await client.send('HeapProfiler.stopSampling')
        const heapSnapshotPath = path.join('traces', `${pickle.name.replace(/[^a-zA-Z0-9-_]/g, '_')}-${Date.now()}.heapsnapshot`)
        fs.writeFileSync(heapSnapshotPath, JSON.stringify(profile))
        logger.info(`Heap snapshot saved as ${heapSnapshotPath}`)
        await client.send('HeapProfiler.disable')
      }
    }

    await this.browser.close()
    if (global.gc) {
      global.gc()
      logger.info('Garbage collection triggered.')
    } else {
      logger.warn('Garbage collection not exposed. Start Node.js with --expose-gc to enable manual GC.')
    }
  } catch (error) {
    logger.error(`Error during After hook: ${error.message}`)
  }
})

AfterAll(async function () {
  try {
    // if (fs.existsSync(sessionStatePath)) {
    //   execSync(`rm -rf ${sessionStatePath}`)
    //   logger.info('Session storage file has been deleted successfully.')
    // }
    if (this.browser && typeof this.browser.close === 'function') {
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
