const { expect } = require('@playwright/test')
const { TaskPage } = require('../../../Task/TaskPage')
const { DuplicateSheetsModule } = require('./DuplicateSheetsModule.js')
const { WebElementHandler } = require('../../../../utilities/WebElementHandler')
const { AssertionHandler } = require('../../../../utilities/AssertionHandler')
const logger = require('../../../../utilities/Logger.js')

class SheetsModule {
  /**
   * Constructs an instance of the SheetsModule class.
   *
   * @param {object} page - The Playwright page object representing a page.
   */
  constructor (page) {
    this.page = page
    this.elementHandler = new WebElementHandler(this.page)
    this.assertionHandler = new AssertionHandler(this.page)
    this.taskPage = new TaskPage(this.page)
    this.duplicateSheetsModule = new DuplicateSheetsModule(this.page, this.elementHandler, this.assertionHandler)
    this.sheetsGrid = page.locator('[ref="gridBody"] .ag-header')
    // Locators for various elements within the sheets module.
    this.sheetsCreationheader = page.locator('.sheet-creation-flow-heading')
    this.sheetsFooter = page.locator('.worksheets-ag-grid-sheet-builder').last()
    this.plusIcon = page.locator('#menu')
    this.cancelButton = page.getByRole('button', { name: 'Cancel' })
    this.breadCrumb = page.locator('.view-add-icons .flex-block').last()
    this.sheetTabs = this.sheetsFooter.locator('[role="tablist"] a')
    this.plusIconOptions = page.locator('.dropdown-view-sheets-action-items').last().locator('a')
    this.copyFromSheetHeader = page.locator('app-copy-sheet-header')
    this.copyFromSheetSteps = this.copyFromSheetHeader.locator('.name')
    this.copyFromSheets_CancelIcon = this.copyFromSheetHeader.locator('.close-icon')
    this.copySheetParent = page.locator('app-copy-select-sheet')
    this.selectAProject_DropDown = this.copySheetParent.locator('input').first()
    this.selectASheet_DropDown = this.copySheetParent.locator('input').last()
    this.formHeading = page.locator('.form-heading')
    this.copyContentToPDGridParent = page.locator('[class="sheet-creation-flow-form copy-columns"]')
    this.copyContentToPDGrid_Labels = this.copyContentToPDGridParent.locator('div[class*="slate"]:nth-of-type(1)')
    this.copyContentToPDGrid_Checkboxes = this.copyContentToPDGridParent.locator('.checkbox-label input[type="checkbox"]')
    this.startFromScratch_SubPopOver = page.locator('.sub-popover')
    this.startFromScratch_SubPopOver_Input = this.startFromScratch_SubPopOver.locator('input')
    this.sheetsLinksInFooter = this.sheetsFooter.locator('.list')
    this.sheetsActionIcons = this.sheetsLinksInFooter.locator('.dropdown-icon svg')
    this.sheetsSearchInput = page.locator('[placeholder="Search"]')
    this.searchedSheets = page.locator('.searchBox a')
    this.activeSheet = page.locator('[class="list active"]')
    this.duplicateSheetNameInput = page.locator('app-duplicate-sheet .p-inputtextarea')
  }

  async isUserInSheetsPage () {
    await this.page.reload()
    await this.page.waitForURL('**/worksheet/*', { timeout: 30 * 1000 })
    await this.page.waitForLoadState('domcontentloaded')
    await this.elementHandler.waitForVisible(await this.sheetsGrid)
  }

  /**
   * Creates a specified number of sheets from scratch using provided sheet names.
   *
   * @param {number} numberOfSheets - The number of sheets to create.
   * @param {array} sheetNames - Array of names for the new sheets.
   * @param {object} saveButton - Locator for the save button.
   */
  async createSheetsFromScratch (numberOfSheets, sheetNames, saveButton) {
    for (let i = 0; i <= numberOfSheets - 1; i++) {
      await this.elementHandler.click(await this.plusIcon)
      const startFromScratch = await this.page.getByText('Create an empty sheet')
      await this.elementHandler.click(await startFromScratch)
      await this.elementHandler.fillInputWithType(await this.startFromScratch_SubPopOver_Input, sheetNames[i])
      await this.elementHandler.click(await saveButton)
      await this.page.waitForTimeout(2000) // Wait for 2 seconds for the action to complete.
    }
  }

  async clickCancel () {
    await this.elementHandler.click(await this.cancelButton)
  }

  /**
   * Clicks on a specific sheet tab based on its number.
   *
   * @param {number} sheetNumber - The 1-based index of the sheet to click on.
   */
  async clickOnSpecificSheet (sheetNumber) {
    const sheetElement = await this.sheetsLinksInFooter.nth(sheetNumber)
    await this.elementHandler.click(sheetElement)
  }

  /**
   * Checks for formula sequence across sheets and asserts that formula names and IDs are unique and in perfect sequence.
   *
   * @param {object} response - The response object containing sheet data.
   */
  async checkForFormulaSequenceAcrossSheets (response) {
    const actualFormulaIDs = response.Sheets.flatMap(sheet => sheet.Formulas.map(formula => formula.id))
    const actualFormulaNames = response.Sheets.flatMap(sheet => sheet.Formulas.map(formula => formula.name))
    logger.info(`The actual formula ID's in the UI are : ${actualFormulaIDs}`)
    logger.info(`The actual formula names in the UI are : ${actualFormulaNames}`)
    const areFormulaNamesUnique = actualFormulaNames.length === new Set(actualFormulaNames).size
    const areFormulaIDsUnique = actualFormulaIDs.length === new Set(actualFormulaIDs).size
    expect(areFormulaNamesUnique).toBeTruthy()
    expect(areFormulaIDsUnique).toBeTruthy()
    const sequenceChecker = this.sortFormulaNameAndIDAndCheckForSequence(actualFormulaIDs, actualFormulaNames)
    expect(sequenceChecker.idsInPerfectSequence).toBeTruthy()
    expect(sequenceChecker.namesInPerfectSequence).toBeTruthy()
  }

  /**
   * Sorts formula names and IDs and checks if they are in perfect sequence.
   *
   * @param {array} actualFormulaIDs - Array of formula IDs to check.
   * @param {array} actualFormulaNames - Array of formula names to check.
   * @returns {object} An object containing two boolean properties: idsInPerfectSequence and namesInPerfectSequence.
   */
  sortFormulaNameAndIDAndCheckForSequence (actualFormulaIDs, actualFormulaNames) {
    const sortFunction = (a, b) => {
      const numA = parseInt(a.match(/\d+/g).join(''), 10)
      const numB = parseInt(b.match(/\d+/g).join(''), 10)
      return numA - numB
    }

    const sortedIds = actualFormulaIDs.sort(sortFunction)
    logger.info(`The sorted formula ID's are : ${sortedIds}`)
    const sortedNames = actualFormulaNames.sort(sortFunction)
    logger.info(`The sorted formula Names are : ${sortedNames}`)

    const isPerfectSequence = (arr) => {
      for (let i = 1; i < arr.length; i++) {
        const prevNum = parseInt(arr[i - 1].match(/\d+/g).join(''), 10)
        const currNum = parseInt(arr[i].match(/\d+/g).join(''), 10)
        if (currNum - prevNum !== 1) {
          return false // Indicates a gap was found.
        }
      }
      return true // Indicates no gaps were found.
    }

    return {
      idsInPerfectSequence: isPerfectSequence(sortedIds),
      namesInPerfectSequence: isPerfectSequence(sortedNames)
    }
  }

  async fetchActiveInactiveFormulaeCheckboxes () {
    const inactiveInventorySet = new Set()
    const activeInventorySet = new Set()
    const inventoryInputElement = await this.taskPage.selectInventory_Input
    await this.elementHandler.click(await inventoryInputElement)
    await this.elementHandler.waitForVisible(await this.taskPage.inventoryCheckBoxes.first())
    const inventoryCheckBoxes = await this.taskPage.inventoryCheckBoxes.all()
    for (const checkbox of await inventoryCheckBoxes) {
      const isdisabled = await checkbox.getAttribute('data-disabled')
      const inventoryIDWith_ = await checkbox.getAttribute('id')
      const inventoryID = inventoryIDWith_.split('_')[0]
      if (isdisabled === 'true') {
        inactiveInventorySet.add(inventoryID)
      } else {
        activeInventorySet.add(inventoryID)
      }
    }
    return {
      activeInventories: Array.from(activeInventorySet),
      inactiveInventories: Array.from(inactiveInventorySet)
    }
  }

  async clickOnSheetsActionIcon (sheetNumber) {
    const sheetActionIcon = await this.sheetsActionIcons.nth(sheetNumber)
    await sheetActionIcon.hover()
    await this.elementHandler.click(await sheetActionIcon)
  }

  async searchForSheet (sheetName) {
    const sheetsBreadCrumbElement = await this.breadCrumb
    await this.elementHandler.click(await sheetsBreadCrumbElement)
    const sheetsSearchElement = await this.sheetsSearchInput
    await this.elementHandler.fillInputWithType(await sheetsSearchElement, sheetName)
    const searchedSheetName = await this.searchedSheets.first()
    await this.elementHandler.click(await searchedSheetName)
  }

  async fetchActiveSheet () {
    return (await this.elementHandler.getText(await this.activeSheet))
  }

  async addCombinationOfRowsToAllSheetsInWorksheet (numberOfBlankRows, numberOfInvRows, invType) {

  }
}

module.exports = { SheetsModule }
