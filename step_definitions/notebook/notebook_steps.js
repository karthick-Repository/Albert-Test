const { Before, Given, When, Then } = require('@cucumber/cucumber')
const { FileUploadHandler } = require('../../utilities/FileUploadHandler')

let ntbPage, wksPage, fileHandler

Before(async function () {
  ntbPage = await this.poManager.fetchNotebookPage()
  wksPage = await this.poManager.fetchWorksheetPage()
  fileHandler = new FileUploadHandler(this.page)
})

When('The user moves block {int} {string} by {int} positions', async function (blockToMove, direction, numberOfPositions) {
  await ntbPage.moveBlocksUpOrDown(direction, blockToMove, numberOfPositions, this.currentTextBlocks)
})
When('The user moves {string} {int} {string} by {int} positions', async function (typeOfBlock, blockToMove, direction, numberOfPositions) {
  this.currentTextBlocks = await ntbPage.moveBlocks(typeOfBlock, blockToMove, direction, numberOfPositions, this.currentTextBlocks)
})

When('The user moves the header {int} {string} by {int} positions', async function (headerToMove, direction, numberOfPositions) {
  await ntbPage.moveBlocksUpOrDown(direction, headerToMove, numberOfPositions, this.currentTextBlocks)
})

When('The user deletes block {int}', async function (blockToDelete) {
  if (!this.currentTextBlocks) {
    throw new Error('Initial text blocks are not defined')
  }
  await ntbPage.deleteBlock(blockToDelete, this.currentTextBlocks)
})

Then('The user validates that the data is saved in the notebook', async function () {
  if (!this.currentTextBlocks) {
    throw new Error('Initial text blocks are not defined.')
  }
  await ntbPage.validateNotebookData(this.currentTextBlocks)
})

When('The user merges the text blocks {string} in the notebook', async function (textBlocksToMerge) {
  this.currentTextBlocks = await ntbPage.mergeTextBlocks(textBlocksToMerge, this.currentTextBlocks)
})

Then('The user validates that the text blocks {string} are now merged into one block', async function (actualMergedBlocks) {
  await ntbPage.validateDataAfterBlockMerge(actualMergedBlocks, this.currentTextBlocks)
})

When('The user splits the text block {int} into equal parts', async function (indexToSplit) {
  this.currentTextBlocks = await ntbPage.splitTextBlocksAndUpdateExistingBlocks(this.currentTextBlocks, indexToSplit)
})

When('The user copies the contents of block {int} to block {int}', async function (blockTpCopyFrom, blockToCopyTo) {
  this.currentTextBlocks = await ntbPage.copyBlocks(this.currentTextBlocks, blockTpCopyFrom, blockToCopyTo)
})

When('The user duplicates the current notebook', async function () {
  await ntbPage.duplicateNotebook(1, 'Test')
})

Then('The user validates that the copied notebook is saved with the prefix {string}', async function (notebookPrefix) {
  await ntbPage.validateDuplicatedNotebookName(notebookPrefix, this.originalNotebookName)
})

When('The user copies the contents of the file {string} in the {string} format into the notebook', async function (fileName, fileFormat) {
  this.contentReadFromFile = await fileHandler.readContentsOfTheFile(fileName, fileFormat)
  await ntbPage.copyPasteContentsFromExternalFile(this.contentReadFromFile)
})

Then('The user validates that the pasted data is saved in the notebook', async function () {
  await ntbPage.assertionHandler.assertActualAndExpectedText(await ntbPage.blockParagraph, this.contentReadFromFile)
})

When('The user adds {int} random strings of lengths {string} as headers {string} to the notebook', async function (numberOfHeadersToAdd, lengthsOfHeaders, typesOfHeaders) {
  this.currentTextBlocks = await ntbPage.addHeadersToNotebook(numberOfHeadersToAdd, lengthsOfHeaders, typesOfHeaders)
})

Then('The user validates that the headers are saved in the notebook', async function () {
  await ntbPage.validateHeaderDataInNotebook(this.currentTextBlocks)
})

Then('The user validates that the headers in the notebook are in the order {string}', async function (orderOfHeaders) {
  await ntbPage.validateHeaderOrder(orderOfHeaders)
})

When('User navigates to the notebook', async function () {
  const projectID = await this.initialResponseMap.get('projectId')
  const payLoad = {
    parentId: `PRO${projectID}`,
    name: 'Untitled Notebook'
  }
  const postResponse = await this.apiUtil.postAPI(`api/v3/notebooks?parentId=PRO${projectID}`, payLoad, await this.jwtToken)
  await ntbPage.navigateToNotebook(projectID, postResponse.albertId)
})

When('User is in the notebook page', async function () {
  await ntbPage.isInNoteBookPage()
})

When('The user enters text blocks with lengths {string} to the notebook', async function (textBlockLengths) {
  this.currentTextBlocks = await ntbPage.enterTextBlocks(textBlockLengths)
})

When('The user edits the text blocks {string} with new text blocks having strings with lengths {string} in the notebook', async function (textBlocksToEdit, newTextBlockLengths) {
  this.currentTextBlocks = await ntbPage.editBlocks(textBlocksToEdit, newTextBlockLengths, this.currentTextBlocks, await ntbPage.blockParagraph)
})

When('The user edits the headers {string} with new headers having strings with lengths {string} in the notebook', async function (textBlocksToEdit, newTextBlockLengths) {
  this.currentTextBlocks = await ntbPage.editBlocks(textBlocksToEdit, newTextBlockLengths, this.currentTextBlocks, await ntbPage.allHeadersInNotebook)
})

When('The user sets a random string of length {int} as the name of the notebook', async function (notebookNameLength) {
  this.originalNotebookName = await ntbPage.generateRandomStrings(notebookNameLength)
  await ntbPage.setNotebookName(this.originalNotebookName)
})

Then('The user validates that the name of the notebook matches with the name in the notebook side panel', async function () {
  await ntbPage.validateActiveNotebookName(this.originalNotebookName)
})

Then(
  'User validates that the table in the page has the headers {string}',
  async function (expected) {
    const expectedHeaders = expected.split(',')
    await this.poManager.fetchNotebookPage().validateNotebookTableHeaders(expectedHeaders)
  }
)

Then(
  'User validates that the message {string} in the landing page of the notebook',
  async function (expectedMessage) {
    await this.poManager.fetchNotebookPage().validateEmptyNotebookMessage(expectedMessage)
  }
)

Then(
  'User validates that the sort by drop down displays the following options {string}',
  async function (expectedValues) {
    const expectedSortByOptions = expectedValues.split(',')
    await this.poManager.fetchNotebookPage().validateSortbyDropDownOptions(expectedSortByOptions)
  }
)

When('User clicks on the plus icon in the landing page of notebook', async function () {
  await this.poManager.fetchNotebookPage().clickThePlusIconInLandingPage()
})

Then('User validates the contents of the empty notebook', async function () {
  await this.poManager.fetchNotebookPage().validateEmptyNoteBookElemens()
})

When('User clicks on the close icon', async function () {
  await this.poManager.fetchNotebookPage().clickCloseIcon()
})

Then('User is in the landing page of notebook', async function () {
  await this.poManager.fetchNotebookPage().isInNTBLandingPage()
})

Then('User validates that the record at position {string} of the table is {string}', async function (rowPosition, notebookName) {
  await this.poManager.fetchNotebookPage().validateNotebookRecord(rowPosition, notebookName)
})

When('I click on the plus icon in the notebook editor', async function () {
  const plusIconElement = await ntbPage.noteBookToolbarPlusIcon
  await ntbPage.webElementHandler.click(plusIconElement)
})

Then('I validate that {string} menu options are displayed in the notebook editor', async function (expectedMenuOptions) {
  const menuOptions = await ntbPage.popOverItemTitles
  await ntbPage.webElementHandler.assertActualAndExpectedAllTexts(menuOptions, expectedMenuOptions)
})

When('I generate {int} paragraphs of {string} length to the notebook', async function (numberOfParagraphs, paragraphLength) {
  await ntbPage.generateRandomParagraphs(numberOfParagraphs, paragraphLength)
})

When('I add {int} text blocks with random strings of length {int} to the notebook', async function (numberOfBlocks, lengthOfText) {
  this.inputTextDataToNTB = await ntbPage.generateRandomStringsAsArray(lengthOfText, numberOfBlocks)
  await ntbPage.enterTheNoteBook()
  await ntbPage.addTextBlocks(numberOfBlocks, this.inputTextDataToNTB)
})

When('I add a string of length {int} as a heading block of type {string} to the notebook', async function (headingLength, headingType) {
  this.headingNameDataToNTB = await ntbPage.generateRandomStrings(headingLength)
  await ntbPage.enterTheNoteBook()
  await ntbPage.addHeadings(headingType, this.headingNameDataToNTB)
})

When('I add a string of length {int} as headings of type {string} each to the notebook', async function (headingTextLength, headingTypes) {
  const headingTypesToBeAdded = headingTypes.split(',')
  const numberOfStringsToGenerate = headingTypesToBeAdded.length
  this.inputTextHeadingsGenerated = await ntbPage.generateRandomStringsAsArray(headingTextLength, numberOfStringsToGenerate)
  await ntbPage.enterTheNoteBook()
  for (let i = 0; i < numberOfStringsToGenerate; i++) {
    await ntbPage.addHeadings(headingTypesToBeAdded[i], this.inputTextHeadingsGenerated[i])
  }
})

When('I {string} block number {int}', async function (operationToPerform, blockNumberToMove) {
  await ntbPage.sixDotOperations(blockNumberToMove, operationToPerform)
})

Then('I validate that the text blocks are added to the notebook', async function () {
  const allParagraphBlocksInNTB = await ntbPage.allParagraphBlocksInNTB
  await ntbPage.assertionHandler.assertActualAndExpectedAllTexts(await allParagraphBlocksInNTB, this.inputTextDataToNTB)
})

Then('I validate that the heading blocks are added to the notebook', async function () {
  const allHeadingBlocksInNTB = await ntbPage.allHeadingBlocksInNTB
  await ntbPage.assertionHandler.assertActualAndExpectedAllTexts(await allHeadingBlocksInNTB, this.inputTextHeadingsGenerated)
})

Then('I validate the updated text blocks in the notebook after deleting the block at number {int}', async function (blockNumber) {
  const allParagraphBlocksInNTB = await ntbPage.allParagraphBlocksInNTB
  const updatedTextBlocks = this.inputTextDataToNTB.slice(0, -1)
  await ntbPage.assertionHandler.assertActualAndExpectedAllTexts(await allParagraphBlocksInNTB, updatedTextBlocks)
})

When('I generate {int} paragraphs of {string} length to the notebook', async function (numberOfParagraphs, paragraphLength) {
  await ntbPage.generateRandomParagraphs(numberOfParagraphs, paragraphLength)
})

When('I add {int} paragraphs with {string} words each into the notebook', async function (numberOfParagraphs, paragraphLength) {
  await ntbPage.enterTheNoteBook()
  this.paragraphDataToBeAddedToNTB = await this.backEndHelper.generateRandomParagraphsFromMetaphorsum(numberOfParagraphs, paragraphLength)
  await ntbPage.addTextBlocks(numberOfParagraphs, this.paragraphDataToBeAddedToNTB)
})

When('I copy the contents of text block number {int} into text block number {int}', async function (fromTextBlock, toTextBlock) {
  await ntbPage.copyTextContentsBetweenBlocks(this.inputTextDataToNTB[fromTextBlock - 1], toTextBlock)
})

Then('I validate that the contents of text block number {int} and {int} are identical', async function (fromTextBlock, toTextBlock) {
  const allParagrahBlocksInNotebook = await ntbPage.allParagraphBlocksInNTB.all()
  await ntbPage.assertionHandler.assertActualAndExpectedText(await allParagrahBlocksInNotebook[toTextBlock - 1], this.inputTextDataToNTB[fromTextBlock - 1])
})

When('I delete the contents of text block number {int}', async function (textBlockNumberToDelete) {
  await ntbPage.deleteContentsOfParagraphBlock(textBlockNumberToDelete)
})

Then('I validate that the place-holder text {string} is displayed in text block number {int}', async function (placeHolderText, textBlockNumber) {
  const allParagraphBlocksInNotebook = await ntbPage.allParagraphBlocksInNTB.all()
  const actualTextBlockElement = await allParagraphBlocksInNotebook[textBlockNumber - 1]
  await ntbPage.webElementHandler.click(await actualTextBlockElement)
  await ntbPage.assertionHandler.assertForAttributeValues(await actualTextBlockElement, 'data-placeholder', placeHolderText)
})

When('I enter a random string on length {int} characters into text block number {int}', async function (lengthOfText, textBlockNumber) {
  const allParagraphBlocksInNotebook = await ntbPage.allParagraphBlocksInNTB.all()
  this.updatedTextBlockContent = ntbPage.generateRandomStrings(lengthOfText)
  const actualTextBlockElement = await allParagraphBlocksInNotebook[textBlockNumber - 1]
  await ntbPage.webElementHandler.fillInputWithType(await actualTextBlockElement, this.updatedTextBlockContent)
})

Then('I validate that the contents of text block number {int} are saved successfully', async function (textBlockNumber) {
  const allParagraphBlocksInNotebook = await ntbPage.allParagraphBlocksInNTB.all()
  await ntbPage.assertionHandler.assertActualAndExpectedText(await allParagraphBlocksInNotebook[textBlockNumber - 1], this.updatedTextBlockContent)
})

When('I convert text block number {int} into {string}', async function (textBlockNumber, componentType) {
  await ntbPage.convertTextContent(textBlockNumber, componentType)
})

When('I convert heading number {int} into {string}', async function (headingNumber, componentType) {
  await ntbPage.convertHeadingContent(headingNumber, componentType)
})

When('I add {int} numbered list blocks, with each block having {int} random strings of length {int} to the notebook', async function (numberOfNumberedListBlocks, numberOfItemsInList, lengthOfString) {
  this.numberedListInputToNTB = []
  for (let i = 0; i < numberOfNumberedListBlocks; i++) {
    this.numberedListInputToNTB.push(await ntbPage.generateRandomStringsAsArray(lengthOfString, numberOfItemsInList))
  }
  await ntbPage.enterTheNoteBook()
  await ntbPage.addNumberedLists(this.numberedListInputToNTB, numberOfItemsInList)
})

Then('I validate that heading block number {int} is of type {string}', async function (headingBlockNumber, headingType) {
  await ntbPage.validateHeaderType(headingBlockNumber, headingType)
})

When('I add {int} {string} blocks of length {int} to the notebook {string}', async function (numberOfBlocks, typeOfBlock, headingLength, usingHotkeys) {
  this.headingNamesInput = await ntbPage.generateRandomStringsAsArray(headingLength, numberOfBlocks)
  usingHotkeys === 'using hotkeys' ? await ntbPage.addHeadingBlocks(typeOfBlock, this.headingNamesInput, true) : await ntbPage.addHeadingBlocks(typeOfBlock, this.headingNamesInput)
})

When('I add {int} list blocks of type {string} each containing {int} random strings of length {int} into the notebook', async function (numberOfListBlocks, typeOfListBlock, itemsInList, lengthOfEachItem) {
  if (this.listsAddedToNoteBook === null) {
    this.listsAddedToNoteBook = []
  }
  this.listsAddedToNoteBook = await ntbPage.listModule.addListBlocks(typeOfListBlock, itemsInList, lengthOfEachItem, numberOfListBlocks, this.dataGenerator, this.listsAddedToNoteBook
  )
})

When('I proceed to add the next set of blocks in the notebook', async function () {
  await ntbPage.webElementHandler.pressKeyMultipleTimes(await ntbPage.listModule.listInputElement.last(), 'Enter', 2)
})

Then('I validate that the added list blocks are saved in the notebook', async function () {
  await ntbPage.listModule.validateListBlocksInNotebook(this.listsAddedToNoteBook)
})

Then('I validate that the added checked list blocks are saved in the notebook', async function () {
  await ntbPage.listModule.validateListBlocksInNotebook(this.listsAddedToNoteBook, 'checkedList')
})

When('I edit list block {int} to block type {string} with {int} new random strings of length {int} each', async function (listBlockToEdit, blockType, numberOfItemsToAddInList, editedLengthOfEachNewItem) {
  await ntbPage.listModule.editListBlocks(blockType, listBlockToEdit, this.listsAddedToNoteBook, editedLengthOfEachNewItem, numberOfItemsToAddInList, await ntbPage.sixDotIcon, this.dataGenerator)
})
