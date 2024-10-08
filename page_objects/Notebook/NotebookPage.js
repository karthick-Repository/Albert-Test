const { getEnvironmentURL } = require('../../utilities/EnvironmentHelper')
const { expect } = require('@playwright/test')
const { BasePage } = require('../Common/BasePage')
const logger = require('../../utilities/Logger')

/**
 * Represents a page object model for a Notebook Page.
 * This class provides methods to interact with and validate elements on the Notebook page.
 */
class NotebookPage extends BasePage {
  /**
   * Constructs a NotebookPage instance.
   * @param {Object} page - The Playwright page object to interact with.
   */
  constructor (page) {
    super(page)
    this.page = page
    this.envURL = getEnvironmentURL()
    this.initializeElements(page)
  }

  /**
   * Initializes all the elements on the Notebook page.
   * @param {Object} page - The Playwright page object.
   */
  initializeElements (page) {
    // Landing page elements
    this.searchNoteBooksInput = page.locator('.input-group input')
    this.notebookTableHeaders = page.locator('table th')
    this.notebookTableRows = page.locator("[role='table'] tbody tr")
    this.notebookPlusIcon = page.locator('.page-content div').last()
    this.emptyNotebookMessage = page.locator('.drawer-empty-state-text')
    this.sortByDropDown = page.locator('.sortby-dropdown')
    this.defaultSortBy = this.sortByDropDown.locator('span')
    this.sortByButton = this.sortByDropDown.locator('[role=button]')
    this.sortByListBox = page.locator("[role='listbox']")
    this.sortByListBoxOptions = this.sortByListBox.locator('span')
    this.sixDotIcon = page.locator('.ce-toolbar__settings-btn').first()
    this.movedown = page.getByText('Move down')
    this.searchInput = page.locator('.cdx-search-field__input').first()

    // Notebook-specific elements
    this.noteBookContainer = page.locator('.note-book-container').first()
    this.noteBookStatusText = this.noteBookContainer.locator(
      '.note-book-header-status-text'
    )
    this.ellipsesIconInHeader = this.noteBookContainer.locator('#divHeaderAction')
    this.noteBookCopyLink = this.noteBookContainer.getByText('Copy Link')
    this.viewVersionHistoryCopyLink = this.noteBookContainer.getByText('View Version History')
    this.noteBookNameEditor = this.noteBookContainer.locator(
      '.note-book-name-editor'
    )
    this.noteBookParagraph = this.noteBookContainer.locator('.ce-paragraph')
    this.noteBookHeading = this.noteBookContainer.locator('.ce-header')
    this.noteBookToolbarPlusIcon =
      this.noteBookContainer.locator('.ce-toolbar__plus')
    this.popOverItem = this.noteBookContainer.locator('.ce-popover__items')
    this.popOverItemTitles = this.popOverItem.locator(
      '.ce-popover-item__title'
    )
    this.numberedListInput = this.noteBookContainer.locator('.cdx-nested-list__item-content').last()
    this.textLink = page.locator('[data-item-name="paragraph"]')
    this.headingLink = page.locator('[data-item-name="header"]')
    this.numberedListLink = page.locator('[data-item-name="list"]').first()
    this.bulletedListLink = page.locator('[data-item-name="list"]').last()
    this.checkListLink = page.locator('[data-item-name="checklist"]')
    this.tableLink = page.locator('[data-item-name="table"]')
    this.fileLink = page.locator('[data-item-name="attaches"]')
    this.imageLink = page.locator('[data-item-name="image"]')
    this.chemicalDrawLink = page.locator('[data-item-name="ketcher"]')
    this.notebookCloseIcon = page.locator('.note-book-close-icon')
    this.headerPlaceHolder = page.locator('[data-placeholder="Heading"]').last()
    this.allParagraphBlocksInNTB = this.noteBookContainer.locator('[class="ce-paragraph cdx-block"]')
    this.allHeadingBlocksInNTB = this.noteBookContainer.locator('.ce-block')
    this.inlineToolBar = page.locator('.ce-inline-toolbar').first()
    this.inlineToolBar_ToolBarHandler = this.inlineToolBar.locator('.ce-inline-toolbar__dropdown')
    this.inlineToolBar_Buttons = this.inlineToolBar.locator('.ce-inline-toolbar__buttons')

    // New notebook editor locators
    this.blockSettingIcon = page.locator('#blockSettingIcon')
    this.blockSettingEllipsesIcon = this.blockSettingIcon.locator('div:nth-of-type(6)')
  }

  async navigateToNotebook (projectID) {
    await this.page.goto(this.envURL + `projects/${projectID}/notebook`, {
      timeout: 300 * 1000
    })
    await this.isInNTBLandingPage()
  }

  async isInNTBLandingPage () {
    await this.page.waitForURL('**/notebook', {
      timeout: 300 * 1000
    })
  }

  /**
   * Validates the presence and attributes of various notebook elements.
   */
  async validateNoteBookElements () {
    await expect(this.noteBookContainer).toHaveCount(1)
    await expect(this.noteBookStatusText).toHaveCount(2)
    await expect(this.noteBookCopyLink).toHaveText('Copy Link')
    await expect(this.noteBookNameEditor).toHaveAttribute(
      'placeholder',
      'Untitled Notebook'
    )
    await expect(this.noteBookNameEditor).toBeEditable()
    await expect(this.noteBookParagraph).toHaveAttribute(
      'data-placeholder',
      'Type your content or use the + action to add elements '
    )
    await expect(this.notebookCloseIcon).toBeEnabled()
    await expect(this.notebookCloseIcon).toHaveCount(1)
  }

  /**
   * Clicks the plus icon on the landing page to create a new notebook and waits for the new notebook URL.
   */
  async clickThePlusIconInLandingPage () {
    await this.notebookPlusIcon.click()
    await this.isInNoteBookPage()
  }

  async isInNoteBookPage () {
    await this.page.waitForURL('**/*NTB*', {
      timeout: 180 * 1000
    })
  }

  /**
   * Clicks the plus icon in the notebook page to open additional options.
   */
  async clickPlusIconInNotebookPage () {
    await this.noteBookToolbarPlusIcon.click()
  }

  /**
   * Edits the notebook name with the provided text.
   * @param {string} notebookName - The new name for the notebook.
   */
  async editNotebookName (notebookName) {
    await this.noteBookNameEditor.fill(notebookName, { delay: 100 })
  }

  /**
   * Validates that the notebook table headers match the expected headers.
   * @param {Array<string>} expectedHeaders - An array of strings representing the expected headers.
   */
  async validateNotebookTableHeaders (expectedHeaders) {
    // eslint-disable-next-line no-unused-vars
    const headerElements = await this.notebookTableHeaders
    const actualHeaders = await headerElements.slice(0, -1)
    const notebookHeaders = await this.webElementHandler.getAllTexts(await actualHeaders)
    logger.info(`The actual notebook headers are : ${notebookHeaders}`)
    logger.info(`The expected notebook headers are : ${expectedHeaders}`)
    expect(notebookHeaders).toMatchObject(expectedHeaders)
  }

  /**
   * Validates that the options in the 'Sort by' dropdown match the expected options.
   * @param {Array<string>} expectedDropDownOptions - An array of strings representing the expected dropdown options.
   */
  async validateSortbyDropDownOptions (expectedDropDownOptions) {
    await this.sortByButton.click()
    const actualDropDownOptions =
      await this.sortByListBoxOptions.allTextContents()
    logger.info(
      `The drop down options fetched from UI is : ${actualDropDownOptions}`
    )
    logger.info(`The expected drop down options : ${expectedDropDownOptions}`)
    expect(actualDropDownOptions).toMatchObject(expectedDropDownOptions)
  }

  /**
   * Validates that the message displayed when the notebook list is empty matches the expected message.
   * @param {string} expectedMessage - The expected message text.
   */
  async validateEmptyNotebookMessage (expectedMessage) {
    const emptyNotebookMsg = await this.emptyNotebookMessage.textContent()
    const trimmedExpectedMessage = emptyNotebookMsg.trim()
    expect(trimmedExpectedMessage).toBe(expectedMessage)
  }

  async validateEmptyNoteBookElemens () {
    expect(await this.noteBookContainer).toBeVisible()
    expect(await this.noteBookContainer).toHaveCount(1)
    expect(await this.noteBookStatusText.first()).toContainText(
      'Created by: App Store on'
    )
    expect(await this.noteBookStatusText.nth(1)).toContainText(
      'Last updated by: App Store on'
    )
    expect(await this.noteBookCopyLink).toHaveCount(1)
    expect(await this.noteBookCopyLink).toBeVisible()
    expect(await this.noteBookNameEditor).toHaveAttribute(
      'placeholder',
      'Untitled Notebook'
    )
    expect(await this.noteBookParagraph).toHaveAttribute(
      'data-placeholder',
      'Type your content or use the + action to add elements '
    )
    await this.noteBookParagraph.click()
    expect(await this.noteBookToolbarPlusIcon).toBeVisible()
    expect(await this.noteBookToolbarPlusIcon).toHaveCount(1)
    const nbPlusIcon = await this.noteBookToolbarPlusIcon
    await nbPlusIcon.waitFor({ timeout: 10 * 1000 })
    await nbPlusIcon.click()
    expect(await this.noteBooksixdotbutton).toBeVisible()
    expect(await this.noteBooksixdotbutton).toHaveCount(1)
    const nbsixdotbutton = await this.noteBooksixdotbutton
    await nbsixdotbutton.waitFor({ timeout: 10 * 1000 })
    await nbsixdotbutton.click()
    expect(await this.popOverItem).toBeVisible()
    expect(await this.popOverItem).toHaveCount(1)
    const popOverItems = await this.popOverItemTitles.allTextContents()
    const expectedpopOverItems = [
      'Text',
      'Heading 1',
      'Heading 2',
      'Heading 3',
      'Numbered List',
      'Bulleted List',
      'Checklist',
      'Table',
      'File',
      'Image',
      'Chemical Draw'
    ]
    expect(popOverItems).toMatchObject(expectedpopOverItems)
    expect(await this.notebookCloseIcon).toBeVisible()
    expect(await this.notebookCloseIcon).toHaveCount(1)
  }

  async clickCloseIcon () {
    const closeElement = await this.notebookCloseIcon
    await closeElement.waitFor({ timeout: 10 * 1000 })
    await closeElement.click()
  }

  async validateNotebookRecord (rowIndex, notebookName) {
    await this.page.waitForTimeout(500)
    const tableRowElement = await this.notebookTableRows.nth(rowIndex - 1)
    const tableContents = await tableRowElement.locator('td').allTextContents()

    // Trim the values and destructure them into meaningful variable names
    const [name, source, date] = tableContents.map((value) => value.trim())

    // Validate the notebook name and source
    expect(name).toBe(notebookName)
    expect(source).toBe('App Store')

    // Format the current date and validate
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    const formattedDate = new Date().toLocaleDateString('en-US', options)
    expect(date).toBe(formattedDate)
  }

  async enterTheNoteBook () {
    await this.webElementHandler.click(await this.noteBookParagraph.first())
  }

  async addTextBlocks (numberOfTimesToAdd, inputDataArray) {
    const paragraphInContext = await this.noteBookParagraph.last()
    for (let i = 0; i < numberOfTimesToAdd; i++) {
      await this.webElementHandler.click(await this.noteBookToolbarPlusIcon)
      await this.webElementHandler.fillInputWithType(await this.searchInput, 'Text')
      await this.webElementHandler.click(await this.textLink)
      await this.webElementHandler.fillInput(await paragraphInContext, inputDataArray[i])
      await this.webElementHandler.pressUsingKey(await paragraphInContext, 'Enter')
      await this.waitForDuration(1)
    }
    await this.webElementHandler.pressUsingKey(await paragraphInContext, 'Backspace')
  }

  async addNumberedLists (numberedItemList, numberOfPointsInEachList) {
    for (let i = 0; i < numberedItemList.length; i++) {
      await this.webElementHandler.click(await this.noteBookToolbarPlusIcon)
      await this.webElementHandler.fillInputWithType(await this.searchInput, 'Numbered List')
      await this.webElementHandler.click(await this.numberedListLink)
      await this.waitForDuration(1)
      const numberListArrayToUse = numberedItemList[i]
      for (let j = 0; j < numberOfPointsInEachList; j++) {
        await this.webElementHandler.fillInputWithoutClear(await this.numberedListInput, numberListArrayToUse[j])
        await this.webElementHandler.pressUsingKey(await this.numberedListInput, 'Enter')
      }
      await this.webElementHandler.pressUsingKey(await this.numberedListInput, 'Backspace')
      await this.waitForDuration(2)
    }
  }

  async addHeadings (headingType, headingName) {
    let elementToSelect
    await this.webElementHandler.click(await this.noteBookToolbarPlusIcon)
    await this.webElementHandler.fillInputWithType(await this.searchInput, headingType)
    const headingElementToClick = await this.headingLink.all()
    if (headingType === 'Heading 1') {
      elementToSelect = await headingElementToClick[0]
      await this.webElementHandler.click(await elementToSelect)
    } else if (headingType === 'Heading 2') {
      elementToSelect = await headingElementToClick[1]
      await this.webElementHandler.click(await elementToSelect)
    } else if (headingType === 'Heading 3') {
      elementToSelect = await headingElementToClick[2]
      await this.webElementHandler.click(await elementToSelect)
    } else {
      logger.info('Incorrecrt heading passed as a parameter')
    }
    await this.webElementHandler.fillInputWithoutClear(await this.headerPlaceHolder, headingName)
    await this.webElementHandler.pressUsingKey(await this.headerPlaceHolder, 'Enter')
  }

  async sixDotOperations (blockToUse, operation) {
    await this.webElementHandler.click(await this.allParagraphBlocksInNTB.nth(blockToUse - 1))
    await this.sixDotIcon.click()
    const opToClickOn = await this.page.getByText(operation)
    await this.webElementHandler.click(await opToClickOn)
    if (operation === 'Delete') {
      await this.webElementHandler.click(await this.page.getByText('Click to delete'))
    }
  }

  async copyTextContentsBetweenBlocks (fromBlockText, toBlockNumber) {
    const allTextBlocks = await this.allParagraphBlocksInNTB.all()
    await this.webElementHandler.pressUsingKey(await allTextBlocks[toBlockNumber - 1], 'Control+A+Delete')
    await this.webElementHandler.fillInput(await allTextBlocks[toBlockNumber - 1], fromBlockText)
  }

  async deleteContentsOfParagraphBlock (textBlockToDelete) {
    const allTextBlocks = await this.allParagraphBlocksInNTB.all()
    await this.webElementHandler.pressUsingKey(await allTextBlocks[textBlockToDelete - 1], 'Control+A+Delete')
  }

  async validateHeaderType (headingBlockNumber, headingType) {
    let styleVal
    const elementToValidate = await this.noteBookHeading.nth(headingBlockNumber - 1)
    const tagName = await elementToValidate.evaluate(node => node.tagName.toLowerCase())
    if (headingType === 'h1') {
      styleVal = 'font-size: 24px;'
    } else if (headingType === 'h2') {
      styleVal = 'font-size: 20px;'
    } else {
      styleVal = 'font-size: 16px;'
    }
    await this.assertionHandler.assertForAttributeValues(await elementToValidate, 'style', styleVal)
    await this.assertionHandler.assertWithToBe(tagName, headingType)
  }

  async selectAllAndConvertToContent (blockSelector, blockNumberToConvert, convertToType) {
    const blocks = await blockSelector.all()
    const blockToModify = await blocks[blockNumberToConvert - 1]
    await this.webElementHandler.click(await blockToModify)
    await this.waitForDuration(1)
    await blockToModify.press('Meta+a')
    await this.webElementHandler.click(await this.inlineToolBar_ToolBarHandler)
    const transformationOption = await this.page.getByText(convertToType).last()
    await this.webElementHandler.click(transformationOption)
  }

  async convertTextContent (textBlockToBeConverted, textContentTo) {
    await this.selectAllAndConvertToContent(await this.allParagraphBlocksInNTB, textBlockToBeConverted, textContentTo)
  }

  async convertHeadingContent (headingToBeConverted, textContentTo) {
    await this.selectAllAndConvertToContent(await this.noteBookHeading, headingToBeConverted, textContentTo)
  }

  async addHeadingBlocks (headingType, headingNamesToUse, useHotKeys = false) {
    await this.enterTheNoteBook()
    const headingSymbols = {
      'Heading 1': '#+Space',
      'Heading 2': '##+Space',
      'Heading 3': '###+Space'
    }
    const symbol = headingSymbols[headingType]
    if (useHotKeys && symbol) {
      const paragraphElement = await this.noteBookParagraph.first()
      for (const headingName of headingNamesToUse) {
        await this.webElementHandler.pressUsingKey(paragraphElement, symbol)
        await this.webElementHandler.fillInput(await this.headerPlaceHolder, headingName)
        await this.webElementHandler.pressUsingKey(await this.headerPlaceHolder, 'Enter')
      }
      await this.webElementHandler.pressUsingKey(await this.headerPlaceHolder, 'Escape')
    }
  }

  async addBulletedListItems (numberOfBlocks, numberOfItemsInEachBlock, lengthOfEachItem, useHotKeys = false) {

  }

  async addNumberedListItems (numberOfBlocks, numberOfItemsInEachBlock, lengthOfEachItem, useHotKeys = false) {

  }

  async addChecklists (numberOfBlocks, numberOfItemsInEachBlock, lengthOfEachItem, useHotKeys = false) {

  }
}

module.exports = { NotebookPage }
