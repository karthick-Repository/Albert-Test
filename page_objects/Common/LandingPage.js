/* eslint-disable camelcase */
const { expect } = require('@playwright/test')
const { BasePage } = require('../Common/BasePage')
const { LoginPage } = require('./LoginPage')
const logger = require('../../utilities/Logger')

class LandingPage extends BasePage {
  constructor (page) {
    super(page)
    this.page = page
    this.loginPage = new LoginPage(this.page)
    this.landingPageURL =
      process.env.EXECUTION_ENVIRONMENT === 'dev'
        ? 'https://dev.albertinventdev.com/#/home'
        : 'https://staging.albertinventdev.com/#/home'
    this.modalDialogOkButton = page.locator(
      "[ng-click='refreshCurrentPage()']"
    )
    this.head1 = page.locator('.head1')
    this.head2 = page.locator('.head2')
    this.vLinks = page.locator('.icon-active')
    this.createButton = page.getByRole('button', { name: 'Create' })
    this.notificationIcon = page.locator('#notificationbadge')
    this.locationIcon = page.locator("[name='selectedLocationId']")
    this.appsIcon = page.locator('.transeffcts li:nth-child(2)').first()
    this.appsDropDown = page.locator('.apps-dropdown')
    this.supportIcon = page.locator('.transeffcts li:nth-child(3)').nth(2)
    this.userNameIcon = page.locator('.username-circle').last()
    this.changeAccountMenuOptions = page.locator('.dropdown-menu-list').last().locator('li')
    this.userNameOptions = page.locator('#changeAccount li')
    this.modalDialog = page.locator('.modal-body button')
  }

  async gotoLandingPage () {
    await this.page.goto(this.landingPageURL)
  }

  async closeModalDialog () {
    await this.page.waitForLoadState('domcontentloaded')
    const modalDialog = await this.modalDialog
    await modalDialog.waitFor({ state: 'visible', timeout: 180 * 1000 })
    await modalDialog.click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async validateHeader1 () {
    expect(await this.head1).toHaveCount(1)
  }

  async validateHeader2 () {
    expect(await this.head2.textContent()).toContain(
      'Welcome back to Albert. Click on the module headers above to start innovating.'
    )
  }

  async validateVLinks () {
    const expected_vLinks = [
      'Projects',
      'Tasks',
      ' Inventory',
      'Parameter Groups',
      'Data Templates',
      'My Reports '
    ]
    const actual_vLinks = await this.vLinks.allTextContents()
    expect(actual_vLinks).toEqual(expected_vLinks)
  }

  async validateCreateButton () {
    expect(await this.createButton).toBeVisible()
    expect(await this.createButton).toHaveCount(1)
  }

  async validateIcons () {
    expect(await this.notificationIcon).toBeVisible()
    expect(await this.notificationIcon).toHaveCount(1)
    // expect(await this.locationIcon).toBeVisible();
    // expect(await this.locationIcon).toHaveCount(1);
    expect(await this.appsIcon).toBeVisible()
    expect(await this.appsIcon).toHaveCount(1)
    // expect(await this.supportIcon).toBeVisible();
    // expect(await this.supportIcon).toHaveCount(1);
    expect(await this.userNameIcon).toBeVisible()
    expect(await this.userNameIcon).toHaveCount(1)
  }

  async validateApps () {
    await this.page.waitForTimeout(1000)
    await this.webElementHandler.click(await this.appsIcon)
    const apps = await this.webElementHandler.getAllTexts(await this.appsDropDown.locator('ul li'))
    const actual_Apps = apps.map((item) => item.trim())
    logger.info(`The apps as fetched are : ${actual_Apps}`)
    const expected_Apps = [
      'Manage Task Templates', 'Manage People and Roles', 'ASTM', 'Barcode Labels', 'Barcode Scan', 'Albert Brain', 'Albert Sync', 'Unravel']
    expect(actual_Apps).toMatchObject(expected_Apps)
    await this.appsIcon.click()
  }

  async validateUserName () {
    await this.webElementHandler.click(await this.userNameIcon)
    const userNameOptions = await this.webElementHandler.getAllTexts(await this.userNameOptions)
    const actual_UserNameOptions = userNameOptions.map((item) => item.trim())
    logger.info(
      `The user name options as fetched are : ${actual_UserNameOptions}`
    )
    const expected_UserNameOptions = [
      'Change Account',
      'Change Location',
      'Visit the Help Center',
      'Visit Learning Lab',
      'View Release Notes',
      'Submit a Support Ticket',
      'Share a Feature Idea',
      'Logout'
    ]
    expect(actual_UserNameOptions).toEqual(expected_UserNameOptions)
    await this.userNameIcon.click()
  }

  async validateLandingPageUIElements () {
    // Commenting this assertion as it is timezone specific
    await this.validateHeader1()
    await this.validateHeader2()
    await this.validateVLinks()
    await this.validateCreateButton()
    await this.validateIcons()
    // await this.validateApps();
    await this.validateUserName()
    return true
  }

  async selectTheTenant () {
    try {
      const tenant = process.env.TENANT
      await this.webElementHandler.click(await this.userNameIcon)
      await this.webElementHandler.click(await this.page.getByText('Change Account'))
      if (tenant === 'TEN4') {
        const threeDSTen = await this.page.getByText('3d Systems')
        await this.webElementHandler.click(await threeDSTen)
        await this.waitForURL('**/userAuthentication')
        await this.loginPage.enterPasscode()
        await this.loginPage.clickNextArrow()
        await this.waitForDuration(0.5)
      }
      // const tenantId = tenant.replace('TEN', '')
      // const optionIndex = parseInt(tenantId, 10)

      // if (!isNaN(optionIndex)) {
      //   const tenantToClick = await this.changeAccountMenuOptions.nth(optionIndex)
      //   const isActive = await this.isActiveTenant(tenantToClick)

      //   if (!isActive) {
      //     await this.webElementHandler.click(tenantToClick)
      //     await this.page.reload()
      //     await this.waitForURL('**/userAuthentication')
      //     await this.loginPage.enterPasscode()
      //     await this.loginPage.clickNextArrow()
      //     await this.waitForDuration(0.5)
      //   } else {
      //     logger.info(`${tenant} already set as the active tenant`)
      //     await this.webElementHandler.click(await this.userNameIcon)
      //   }
      // } else {
      //   logger.info('Invalid Tenant set')
      // }
    } catch (error) {
      console.error('Error in selectTheTenant: ', error)
    }
  }

  async isActiveTenant (optionElement) {
    const svgCount = await optionElement.locator('svg').count()
    return svgCount === 0 ? 0 : 1
  }
}

module.exports = { LandingPage }
