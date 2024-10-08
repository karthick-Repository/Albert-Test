const { Before, When, Then } = require('@cucumber/cucumber')
const logger = require('../../utilities/Logger')

let taskPage, dtPage

Before(async function () {
  taskPage = await this.poManager.fetchTaskPage()
  dtPage = await this.poManager.fetchDataTemplatePage()
})

When('I fetch {string} inventory IDs of type {string} with lots from the system', async function (numberOfInv, typeOfInv) {
  this.actualInventoriesWithLots = await this.backEndHelper.fetchInventoriesWithLots(numberOfInv, typeOfInv, await this.jwtToken)
})

When('I set the fetched inventories in the set inventories field', async function () {
  this.inventoriesSetInTask = this.actualInventoriesWithLots.map(item => item.albertId)
  await taskPage.searchAndSetInventories(this.inventoriesSetInTask)
})

When('I fetch {string} data templates from the system', async function (numberOfDT) {
  this.dataTemplatesFetched = []
  const endPoint = `api/v3/datatemplates?limit=${numberOfDT}&orderBy=desc&exactMatch=false&search=false`
  const response = await this.apiUtil.getAPI(endPoint, await this.jwtToken)
  for (const item of response.Items) {
    this.dataTemplatesFetched.push(item.albertId)
  }
  logger.info(`Data templates fetched are : ${this.dataTemplatesFetched}`)
})

When('I set the fetched data templates in the Setup Blocks to Collect Results section', async function () {
  await taskPage.searchAndSetDataTemplates(this.dataTemplatesFetched)
})

When('I select one template under Setup Blocks to Collect Results, provide task name and click on create button',async () => {
  await taskPage.selectATemplates()
})

When('Verify {string} message visible',async (sheetNameValdationMessage) => {
  await taskPage.verifyValidationMessage(sheetNameValdationMessage)
})

Then('Verify {string} should be visible in result grid section',async (propertyTaskName) => {
  await taskPage.verifyPropertyTaskName(propertyTaskName)
})

When('Verify {string} message when clicking on save button providing more then 50 characters in work sheet input field',async (sheetNameValdationMessage) => {
  await taskPage.verifyValidationMessage(sheetNameValdationMessage)
})

When('I set the the {string} name', async function (taskName) {
  this.taskName = `Test_AUT_${taskName}` + new Date().toISOString()
  await taskPage.enterName(this.taskName)
})

When('I create the task', async function () {
  const createButton = await taskPage.footer_Buttons.first()
  await taskPage.webElementHandler.click(await createButton)
})

Then('I validate that the message {string} is displayed', async function (message) {
  this.createdTaskID = await taskPage.validateTaskCreateMessage(message)
  logger.info(`The ID of the created task is : ${this.createdTaskID}`)
})

When('I create a property task with {int} {string}, {int} data templates, {int} tags and a random note of length {int} characters', async function (invCount, invType, dtCount, tagCount, noteLength) {
  this.propertyTaskName = 'Test_AUT_Prop_Task' + new Date().toISOString()
  this.formulaeFetched = await this.backEndHelper.fetchInventoriesHavingLots(invCount, invType, await this.jwtToken)
  this.dtFetched = await this.backEndHelper.fetchDataTemplates(dtCount, await this.jwtToken)
  this.tagsFetched = await this.backEndHelper.fetchTags(tagCount, await this.jwtToken)
  this.notesGenerated = await taskPage.generateRandomStrings(noteLength)
  await taskPage.createPropertyTask(this.propertyTaskName, this.formulaeFetched, await dtPage, this.dtFetched, this.tagsFetched, this.notesGenerated)
})

When('I create a propety task with the formulas present in the worksheet with {int} datatemplates, {int} tags and a random note of length {int} characters', async function (dtCount, tagCount, noteLength) {
  this.propertyTaskName = 'Test_AUT_Prop_Task' + new Date().toISOString()
  this.formulaeFetched = this.allFormulasInWKS.map(item => item.name).sort()
  this.dtFetched = await this.backEndHelper.fetchDataTemplates(dtCount, await this.jwtToken)
  this.tagsFetched = await this.backEndHelper.fetchTags(tagCount, await this.jwtToken)
  this.notesGenerated = await taskPage.generateRandomStrings(noteLength)
  await taskPage.createPropertyTask(this.propertyTaskName, this.formulaeFetched, this.lotInformationGenerated, await dtPage, this.dtFetched, this.tagsFetched, this.notesGenerated)
})

When('I create a general task with the formulas present in the worksheet with {int} tags', async function (tagCount) {
  this.generalTaskname = 'Test_AUT_Gen_Task' + new Date().toISOString()
  this.formulaeFetched = this.allFormulasInWKS.formulaNames.sort()
  this.tagsFetched = await this.backEndHelper.fetchTags(tagCount, await this.jwtToken)
  await taskPage.addGeneralTask(this.generalTaskname, this.formulaeFetched, this.tagsFetched, await dtPage)
})

When('I create a propety task using the formulas present in the worksheet with {int} datatemplates, {int} parameter groups of type {}, {int} tags and a random note of length {int} characters', async function (dtCount, pgCount, pgType, tagCount, noteLength) {
  this.propertyTaskName = 'Test_AUT_Prop_Task' + new Date().toISOString()
  this.formulaeFetched = this.allFormulasInWKS.formulaNames.sort()
  this.dtFetched = await this.backEndHelper.fetchDataTemplates(dtCount, await this.jwtToken)
  this.dtFetched = await this.backEndHelper.fetchDataTemplates(dtCount, await this.jwtToken)
  this.tagsFetched = await this.backEndHelper.fetchTags(tagCount, await this.jwtToken)
  this.notesGenerated = await taskPage.generateRandomStrings(noteLength)
  this.pgFetched = await this.backEndHelper.fetchParameterGroups(pgCount, pgType, await this.jwtToken)
  await taskPage.createPropertyTask(this.propertyTaskName, this.formulaeFetched, this.lotInformationGenerated, await dtPage, this.dtFetched, this.tagsFetched, this.notesGenerated)
})

When('I navigate to the details page of the task created', async function () {
  const urlToNavigateTo = await taskPage.envURL + `tasks/${this.createdTaskID}`
  await taskPage.gotoPage(urlToNavigateTo)
})

When('I add {int} {string} parameter groups to the task', async function (numberOfPG, typeOfPG) {
  this.parameterGroups = await this.backEndHelper.fetchParameterGroups(numberOfPG, typeOfPG, await this.jwtToken)
  logger.info(`parameter groups are : ${JSON.stringify(this.parameterGroups)}`)
  this.parameterValuesSet = await taskPage.addPGAndSetValues(this.parameterGroups)
  logger.info(`parameter values are : ${JSON.stringify(this.parameterValuesSet)}`)
})

// testing linked task

When('I click on {string} radio icon', async function (textToClick) {
  const stringToClick = await this.page.getByRole('dialog').getByText(textToClick)
  await taskPage.webElementHandler.click(await stringToClick)
})

When('I create a general task with the formulas present in the worksheet', async function () {
  this.generalTaskname = 'Test_AUT_Gen_Task' + new Date().toISOString()
  this.formulaeFetched = this.allFormulasInWKS.map(item => item.name).sort()
  await taskPage.createGeneralTask(this.generalTaskname, this.formulaeFetched)
})

Then('I validate that the {string} section is showing in the landing page of the Linked Tasks page', async function (messageValidate) {
  const manuallyLinkedTaskLocator = await taskPage.manuallyLinkedTaskMessage
  await taskPage.assertActualAndExpectedAllTexts(manuallyLinkedTaskLocator, messageValidate)
  await taskPage.waitForDuration(1)
}
)

Then('I validate the message {string} is displayed when no task linked under manually_linked_tasks section', async function (messageValidate) {
  const noManuallyLinkedTaskLocator = await taskPage.noManuallyLinkedTaskMessage
  await taskPage.assertActualAndExpectedAllTexts(noManuallyLinkedTaskLocator, messageValidate)
  await taskPage.waitForDuration(1)
}
)

Then('I validate that the following table headers are displayed {string} in the linked task page', async function (expectedHeaders) {
  await taskPage.assertionHandler.assertActualAndExpectedAllTexts(await taskPage.manuallyLinkedHeader, expectedHeaders)
})

When('I create a inventory property task with {int} datatemplates, {int} tags and a random note of length {int} characters', async function (dtCount, tagCount, noteLength) {
  this.propertyTaskName = 'Test_AUTO_Prop_Task' + new Date().toISOString()
  this.dtFetched = await this.backEndHelper.fetchDataTemplates(dtCount, this.jwtToken)
  this.tagsFetched = await this.backEndHelper.fetchTags(tagCount, this.jwtToken)
  this.notesGenerated = await taskPage.generateRandomStrings(noteLength)
  await taskPage.createInventoryPropertyTask(this.propertyTaskName, this.allInventoriesId,this.lotInformationGenerated, await dtPage, this.dtFetched, this.tagsFetched, this.notesGenerated)
})

When('I validate {string} message for more than 1000 character in qc result', async function (qcErrormesage) {
  let qcResultValueMax = await taskPage.generateRandomStrings(1001)
  let qcResultError = this.page.locator('[class="p-error ng-star-inserted"]')
  await taskPage.webElementHandler.fillInput(await taskPage.qcResult_TextArea, qcResultValueMax)
  await taskPage.assertionHandler.assertActualAndExpectedText(await qcResultError, qcErrormesage)
})

When('I set the qc result value', async function () {
  this.qcResultValue = await taskPage.generateRandomStrings(10)
  await taskPage.webElementHandler.fillInput(await taskPage.qcResult_TextArea, this.qcResultValue)
})

Then('I validate the QC Result value in task page', async function () {
  let qcResultLink = this.page.locator('[class="mat-tooltip-trigger p-text-truncate p-mr-2"]')
  await taskPage.assertionHandler.assertActualAndExpectedText(await qcResultLink, this.qcResultValue)
})

When('I set the fetched lots in the task left panel', async function () {
  await taskPage.webElementHandler.click(await this.page.getByText('Update'))
  await taskPage.searchAndSetLots(this.lotInformationGenerated)
})