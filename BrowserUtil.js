const playwright = require('@playwright/test')
const logger = require('../utilities/Logger')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const CHROME = 'chrome'
const FIREFOX = 'firefox'
const WEBKIT = 'webkit'
const EDGE = 'edge'

// Load device configurations from JSON
let deviceConfigurations = {}
try {
  deviceConfigurations = JSON.parse(fs.readFileSync(path.join(__dirname, '../utilities/configurationFiles/deviceConfigurations.json'), 'utf8'))
} catch (error) {
  logger.error('Failed to load device configurations:', error.message)
  process.exit(1)
}

// Environment variables
const isCI = process.env.IS_CI === 'true'
const desiredBrowser = process.env.BROWSER_TO_USE || CHROME
const deviceToEmulate = process.env.DEVICE_TO_EMULATE || '' // Default is empty (desktop mode)
const headless = isCI || process.env.HEADLESS_VIEWPORT === 'true'

// Debugging logs for environment variables
logger.info(`Running in CI: ${isCI}`)
logger.info(`Browser to use: ${desiredBrowser}`)
logger.info(`Device to emulate: ${deviceToEmulate}`)

/**
 * Launches the specified browser with the given configuration.
 *
 * @param {string} desiredBrowser - The browser to launch (e.g., 'chrome', 'firefox', 'webkit', 'edge').
 * @returns {Promise<import('playwright').Browser>} A promise that resolves to the launched browser instance.
 */
async function launchBrowser (desiredBrowser) {
  const commonArgs = [
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-first-run',
    '--no-zygote',
    '--disable-accelerated-2d-canvas',
    '--disable-web-security',
    '--single-process',
    '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding',
    '--mute-audio',
    '--disable-backgrounding-occluded-windows'
  ]

  const maximized = '--start-maximized'
  const args = isCI ? [] : commonArgs

  console.log(`Launching browser: ${desiredBrowser} with headless: ${headless}`)
  console.log(`Arguments: ${args.join(' ')}`)

  switch (desiredBrowser) {
    case CHROME:
      return await playwright.chromium.launch({
        channel: 'chrome',
        args: headless ? args : [...args, maximized],
        headless
      })
    case FIREFOX:
      return await playwright.firefox.launch({
        args: headless ? [...args, '--privileged-startup'] : [...args, maximized],
        headless
      })
    case WEBKIT:
      return await playwright.webkit.launch({
        args: headless ? args : [...args, maximized],
        headless
      })
    case EDGE:
      return await playwright.chromium.launch({
        channel: 'msedge',
        args: headless ? args : [...args, maximized],
        headless
      })
    default:
      console.warn(`Unknown browser: ${desiredBrowser}. Using default launcher (Chrome)`)
      return await playwright.chromium.launch({
        channel: 'chrome',
        args: headless ? args : [...args, maximized],
        headless
      })
  }
}

/**
 * Creates a new browser context with the specified options and permissions, including device emulation if provided.
 * @param {import('playwright').Browser} browser - The browser instance to create a context for.
 * @param {object} contextOptions - The context options to use.
 * @returns {Promise<import('playwright').BrowserContext>} A promise that resolves to the created browser context.
 */
async function createBrowserContext (browser, contextOptions) {
  const permissions = getPermissions(desiredBrowser)

  let context

  if (deviceToEmulate && deviceConfigurations[deviceToEmulate]) {
    const deviceConfig = deviceConfigurations[deviceToEmulate]
    logger.info(`Emulating device: ${deviceToEmulate}`)
    context = await browser.newContext({
      ...deviceConfig,
      ...contextOptions,
      permissions,
      ignoreHTTPSErrors: true,
      recordVideo: { dir: path.join(__dirname, '../../out/videos'), size: deviceConfig.viewport },
      colorScheme: 'light',
      isMobile: deviceConfig.isMobile,
      hasTouch: deviceConfig.hasTouch,
      slowMo: 200
    })
  } else {
    logger.info('Using default desktop viewport settings')
    context = await browser.newContext({
      ...contextOptions,
      viewport: headless ? { width: 1920, height: 1080 } : null,
      permissions,
      isMobile: false,
      ignoreHTTPSErrors: true,
      recordVideo: { dir: path.join(__dirname, '../../out/videos'), size: { width: 1920, height: 1080 } },
      colorScheme: 'light',
      slowMo: 200
    })
  }

  context.on('page', (page) => {
    page.on('pageerror', (error) => logger.error(`Page error: ${error.message}`))
    page.on('response', (response) => {
      if (!response.ok()) {
        logger.warn(`Failed response: ${response.url()} - ${response.status()}`)
      }
    })
  })

  return context
}

/**
 * Returns the required permissions for the specified browser.
 * @param {string} desiredBrowser - The browser to get permissions for (e.g., 'chrome', 'edge', 'webkit').
 * @returns {string[]} An array of permissions for the specified browser.
 */
function getPermissions (desiredBrowser) {
  const permissions = ['geolocation']
  switch (desiredBrowser) {
    case CHROME:
    case EDGE:
      permissions.push('clipboard-write', 'clipboard-read', 'notifications', 'background-sync', 'accessibility-events')
      break
    case WEBKIT:
      permissions.push('clipboard-read')
      break
    default:
      console.warn(`Unknown browser: ${desiredBrowser}. Using default permissions (none)`)
  }
  return permissions
}

/**
   * Stabilizes network conditions by handling request failures and retries.
   *
   * @param {import('playwright').Page} page - The page instance to set up network stabilization on.
   */
async function stabilizeNetworkConditions (page) {
  await page.route('**/*', async (route, request) => {
    try {
      await route.continue()
    } catch (error) {
      console.warn(`Request failed: ${request.url()} - ${error.message}`)
      await retryRoute(route, request, 3) // Retry the request up to 3 times
    }
  })
}

/**
   * Retries a failed request up to a specified number of times.
   *
   * @param {import('playwright').Route} route - The route object.
   * @param {import('playwright').Request} request - The request object.
   * @param {number} retries - The number of times to retry the request.
   */
async function retryRoute (route, request, retries) {
  for (let i = 0; i < retries; i++) {
    try {
      await route.continue()
      return // Exit if the request is successful
    } catch (error) {
      console.warn(`Retry ${i + 1} failed for: ${request.url()} - ${error.message}`)
    }
  }
  console.error(`All retries failed for: ${request.url()}`)
}

module.exports = {
  launchBrowser,
  createBrowserContext,
  getPermissions,
  stabilizeNetworkConditions
}
