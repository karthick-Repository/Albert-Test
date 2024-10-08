const { When, Then, Before } = require('@cucumber/cucumber')
const logger = require('../../../utilities/Logger')

let dataTemplatePage, grids

Before(async function () {
  dataTemplatePage = await this.poManager.fetchDataTemplatePage()
  grids = this.poManager.fetchGrids()
})

When('I set {string} {string} tags', async function (tagSize, tagType) {
  this.addedTags = this.addedTags || []
  if (tagType === 'random') {
    for (let i = 0; i < tagSize.length; i++) {
      const randomString = dataTemplatePage.generateRandomStrings(10)
      const tag = `Test_Auto_Tag_${randomString}`
      this.addedTags.push(tag)
    }
  } else {
    const getResponse = await this.apiUtil.getAPI(`api/v3/tags?limit=${tagSize}&startKey=Test&orderBy=desc&exactMatch=false`, await this.jwtToken)
    for (const tag of getResponse.Items) {
      this.addedTags.push(tag.name)
    }
  }
  logger.info(`The tags to be added are : ${this.addedTags}`)
  await dataTemplatePage.enterTags(this.addedTags)
})

When('I set the name of the data template', async function () {
  this.dtName =
    'Test_Auto_DT_' + (await dataTemplatePage.generateRandomStrings(5))
  await dataTemplatePage.enterName(this.dtName)
})

When(
  'I set {string} as the organization of the data template',
  async function (organization) {
    await dataTemplatePage.enterOrganizationName(organization)
  }
)

When('I set {string} as the ID of the data template', async function (id) {
  await dataTemplatePage.enterID(id)
})

Then(
  'I validate that {string} is the default owner of the data template',
  async function (owner) {
    await dataTemplatePage.verifyDefaultOwner(owner)
  }
)

When(
  'I set {string} as the description of the data template',
  async function (desc) {
    this.description = desc
    await dataTemplatePage.enterDescription(this.description)
  }
)

When('I navigate to the data template page', async function () {
  const urlToNavigateTo = (await dataTemplatePage.envURL) + 'datatemplates'
  await dataTemplatePage.gotoPage(urlToNavigateTo)
  await dataTemplatePage.waitForURL('**/datatemplates')
})

When('I fetch the  ID of the data template', async function () {
  const currentURL = await dataTemplatePage.fetchPageURL()
  this.currentDT_ID = currentURL.split('/')[5]
  logger.info(`The data template ID is : ${this.currentDT_ID}`)
})

When(
  'I search for the data template with the ID {string}',
  async function (dataTemplate) {}
)

Then(
  'I validate that {string} dialog is displayed',
  async function (dialogHeader) {
    await dataTemplatePage.validateDialogDisplayed(dialogHeader)
  }
)

When('I click on the button with the role {string}', async function () {})

Then(
  'I validate that the Add Results dialog is displayed',
  async function () {}
)

When(
  'I set {string} as the Results of the data template',
  async function (results) {
    await dataTemplatePage.addNewResult(results)
  }
)

When(
  'I set {string} as units for the results added to the data template',
  async function (units) {
    await dataTemplatePage.addUnits(units)
  }
)

When(
  'I set {string} as the example data row entries for all the results added to the data template',
  async function (exampleDataRows) {
    await dataTemplatePage.addExampleDataRows(exampleDataRows)
  }
)

Then(
  'I validate that the data template details with the results are saved',
  async function () {}
)

When('I click on the close icon', async function () {
  await dataTemplatePage.webElementHandler.click(await dataTemplatePage.closeIcon.last())
})

Then('I validate that {string} tabs are displayed in the data template details page', async function (expectedHeadingTabs) {
  const headingElements = await dataTemplatePage.pageHeading.locator('a')
  await dataTemplatePage.assertActualAndExpectedAllTexts(await headingElements, expectedHeadingTabs)
})

When('I search for the data template we created', async function () {
  await grids.searchInGrid(this.dtID)
})

Then('I validate that the data template details in the details page is correct', async function () {

})

Then(
  'I validate that the data template is displayed in the grid',
  async function () {
    const expectedDT = {
      'DT Name': this.dtName,
      'DT ID': this.currentDT_ID,
      'DT Description': this.description
      // 'DT Results': await this.webElementHandler.getAllTexts(dtResultsElement)
    }
    const actualDT = await grids.buildActualDataTemplateObject()
    await dataTemplatePage.assertObjects(actualDT, expectedDT)
  }
)

When(
  'I click on the ellipsis icon against row {int} in the grid',
  async function () {}
)

Then(
  'I validate that {string} are displayed as the menu options',
  async function () {}
)

When('I delete the data template', async function () {})

Then(
  'I validate that the deleted data template is not longer present',
  async function () {}
)

Then(
  'I validate that the table in the Edit Data Template has the headers {string}',
  async function (dataTemplateHeaders) {}
)
