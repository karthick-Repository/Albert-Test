const { BasePage } = require('../Common/BasePage')
const { expect } = require('@playwright/test')
const logger = require('../../utilities/Logger')

class UsersPage extends BasePage {
  constructor (page) {
    super(page)
    this.page = page
    this.moreLink = page.getByRole('link', { name: 'More' })
    this.peopleLink = page.getByRole('link', { name: 'People' })
    this.pageHeader = page.getByText('Manage Users, Teams and Roles')
    this.userTableHeaders = page.locator('#tableHeader th')
    this.searchUsers = page.getByLabel('State')
    this.filterIcon = page.locator('#ug-toggle-facets').getByRole('img')
    this.defaultFilterSelected = page
      .locator('a')
      .filter({ hasText: 'Status: Has Site Access' })
    this.defaultFilterSelectedCloseIcon = page
      .locator('a')
      .filter({ hasText: 'Status: Has Site Access' })
      .locator('svg')
    this.sortByDropdown = page.getByRole('button', { name: '' })
    this.defaultSortByDropdown = page.locator('.p-d-flex .sorttext')
    this.sortByOptions = page.locator('.p-dropdown-items-wrapper li')
    this.plusIcon = page.locator('#ph-task-grid path').nth(3)
    this.createNewUserDialogHeader = page
      .getByRole('dialog')
      .getByText('Create New User')
    this.createUserDialog_UserName = page.getByLabel('User Name *')
    this.createUserDialog_Email = page.getByLabel('Email *')
    this.createUserDialog_SBU = page.getByLabel('SBU')
    this.dropDownOptionToSelect = page.locator(
      '#p-highlighted-option .wordbreak-clip'
    )
    this.createUserDialog_Role_Autocomplete = page.locator(
      "[id*='autocompletes_Role_']"
    )
    this.createUserDialog_Class_Autocomplete = page.locator(
      '#autocompletes_Class'
    )
    this.createUserDialog_Location_Autocomplete = page.locator(
      "[id*='autocompletes_Default']"
    )
    this.createUserDialog_Teams_Autocomplete = page.locator(
      '#autocompletes_Teams'
    )
    this.tableBody = page.locator('.p-datatable-tbody')
    this.dialog_Cancel_Button = page.getByRole('button', { name: 'Cancel' })
    this.dialog_Save_Button = page.locator('.p-dialog-footer button').last()
  }

  async gotoUsersPage () {
    const usersPageURL = this.envURL + 'people/users?Status=active&sortBy=createdAt_desc'
    await this.gotoPage(usersPageURL)
    // await this.webElementHandler.click(this.moreLink);
    // await this.webElementHandler.click(this.peopleLink);
    await this.page.waitForURL('**/people/users**')
  }

  async isInUsersPage () {
    await this.page.waitForURL('**/people/users**')
    expect(
      await this.webElementHandler.waitForVisible(this.pageHeader)
    ).toBeTruthy()
  }

  async validateDefaultFilter (defaultFilterValue) {
    const expectedTextValue = await this.webElementHandler.getText(
      this.defaultFilterSelected
    )
    expect(expectedTextValue).toBe(defaultFilterValue)
  }

  async validateDefaultHeaders (expectedHeaders) {
    const actualTableHeaders = await this.webElementHandler.getAllTexts()
    expect(expectedHeaders).toMatchObject(actualTableHeaders)
  }

  async createUser (userObject) {
    await this.clickOnElement(await this.plusIcon)
    await this.webElementHandler.fillInput(
      this.createUserDialog_UserName,
      userObject.userName
    )
    await this.webElementHandler.fillInput(
      this.createUserDialog_Email,
      userObject.email
    )
    await this.webElementHandler.fillInput(
      this.createUserDialog_SBU,
      userObject.sbu
    )
    await this.page.waitForTimeout(1000)
    await this.webElementHandler.autoCompleteSelect(
      this.createUserDialog_Role_Autocomplete,
      userObject.userRole,
      await this.dropDownOptionToSelect
    )
    await this.webElementHandler.autoCompleteSelect(
      this.createUserDialog_Class_Autocomplete,
      userObject.userClass,
      await this.dropDownOptionToSelect
    )
    await this.webElementHandler.autoCompleteSelect(
      this.createUserDialog_Location_Autocomplete,
      userObject.location,
      await this.dropDownOptionToSelect
    )
    await this.clickOnElement(this.dialog_Save_Button)
  }

  async searchForUser (searchText) {
    await this.webElementHandler.fillInput(await this.searchUsers, searchText)
    await this.webElementHandler.pressUsingKey(await this.searchUsers, 'Enter')
  }

  async buildActualUserObject (rowToBuild, expectedStatus) {
    await this.page.waitForTimeout(1 * 1000)
    const gridRowToBuild = this.tableBody
      .locator('tr')
      .nth(rowToBuild)
      .locator('div')
    const buildObject = await this.webElementHandler.getAllTexts(
      gridRowToBuild
    )
    const builtUser = {
      name: buildObject[4].trim() || '',
      email: buildObject[5].trim() || '',
      role: '',
      status: expectedStatus || '',
      location: '',
      lastLogin: buildObject[10] || ''
    }
    if (buildObject.length > 4) {
      builtUser.role = buildObject[6].trim() || ''
      builtUser.location = buildObject[8].trim() || ''
    }
    logger.info(
      `The actual user details as read from the UI are : ${JSON.stringify(
        builtUser
      )}`
    )
    return builtUser
  }
}

module.exports = { UsersPage }
