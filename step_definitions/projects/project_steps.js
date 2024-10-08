const { When, Then, Before } = require('@cucumber/cucumber')
const { expect } = require('playwright/test')
const logger = require('../../utilities/Logger')

// let projectPage, grids;
let projectPage, componentCode
let applicationListSet = []
let technologyListSet = []

Before(async function () {
  projectPage = await this.poManager.fetchProjectPage()
})

Then(
  'Validate the UI elements in the project pop-up dialog',
  async function () {
    await this.poManager.fetchProjectPage().validateProjectDialogContents()
  }
)

When('User enters the details of the project to be created', async function () {
  this.projectCreated = await this.poManager
    .fetchProjectPage()
    .createProjectPageWithPreFilledData()
})

Then('Project must be created successfully', async function () {
  await this.poManager
    .fetchProjectPage()
    .verifyProjectNameAfterCreation(this.projectCreated.prName)
})

When(
  'I set {string} {string} {string} in the project',
  async function (totalNumber, type, field) {
    const numApps = Number(totalNumber)

    const fetchExistingItems = async (category) => {
      const endpoint = `api/v3/lists?limit=${totalNumber}&category=userDefined&listType=${category}&orderBy=asc`
      const getResponse = await this.apiUtil.getAPI(endpoint, await this.jwtToken)
      return getResponse.Items.map((app) => app.name)
    }

    const generateRandomItems = async (prefix) => {
      const randomStringPromises = Array.from({ length: numApps }, () =>
        projectPage.generateRandomStrings(10)
      )
      const randomStrings = await Promise.all(randomStringPromises)
      return randomStrings.map((str) => `${prefix}_${str}`)
    }

    if (field === 'Applications') {
      applicationListSet =
        type === 'existing'
          ? await fetchExistingItems('Application')
          : await generateRandomItems('Test_Auto_Application')
      logger.info(
        `The applications to be set in the project are : ${applicationListSet}`
      )
      await projectPage.setMultipleValuesInAutoSelect(applicationListSet, await projectPage.application_AutoComplete)
    } else {
      technologyListSet =
        type === 'existing'
          ? await fetchExistingItems('Technology')
          : await generateRandomItems('Test_Auto_Tech')
      logger.info(
        `The technologies to be set in the project are : ${technologyListSet}`
      )
      await projectPage.setMultipleValuesInAutoSelect(technologyListSet, await projectPage.technology_AutoComplete)
    }
    await projectPage.waitForDuration(1)
  }
)

When('I click on the Create button in the {string} dialog', async function (component) {
  if (component === 'project') {
    await projectPage.webElementHandler.click(await projectPage.createButtonInProjectDialog)
  } else {
    console.log('For fun')
  }
})

When('I fetch the code of the component from the page URL', async function () {
  const invURL = await projectPage.fetchPageURL()
  this.componentCode = invURL.split('?query=')[1].split('/')[0]
  logger.info(`The ID fetched is : ${this.componentCode}`)
})

When('I fetch the code of the project from the page URL', async function () {
  const invURL = await projectPage.fetchPageURL()
  this.projectCode = invURL.split('/')[6]
})

async function buildActualProjectObject () {
  await projectPage.waitForDuration(2)
  return {
    Name: await projectPage.webElementHandler.getInputValue(await projectPage.name_textarea),
    Customer_Market_Segment: await projectPage.webElementHandler.getInputValue(await projectPage.customerMarketSegment_Input_DetailsPage),
    Technology: await projectPage.webElementHandler.getAllTexts(await projectPage.technology_DetailsPage),
    Application: await projectPage.webElementHandler.getAllTexts(await projectPage.application_DetailsPage),
    ADP_Number: await projectPage.webElementHandler.getInputValue(await projectPage.adpNumber_DetailsPage)
  }
}

Then('I validate that the project is {string} with the right details passed', async function (opType) {
  const expectedProject = {
    Name: opType === 'created' ? this.projectName : this.editedProjectName,
    Customer_Market_Segment: opType === 'created' ? this.segmentName : this.editedSegmentName,
    Application: applicationListSet,
    Technology: technologyListSet,
    ADP_Number: opType === 'created' ? this.adp_Number : this.editedAdp_Number
  }
  const actualProject = await buildActualProjectObject(opType)
  logger.info(`Actual Object is : ${JSON.stringify(actualProject)}`)
  logger.info(`Expected Object is : ${JSON.stringify(expectedProject)}`)
  await projectPage.assertObjects(actualProject, expectedProject)
})

When('I search for the project I {string}', async function (opType) {
  const searchTerm = opType === 'created' ? this.projectName : this.editedProjectName
  await projectPage.grid.searchInGrid(searchTerm)
})

Then('I validate that the {string} project details in the grid for are correct', async function (opType) {
  const actualProjectFromGrid = await projectPage.grid.buildActualProjectObject()
  const expectedProjectFromGrid = {
    Name: opType === 'created' ? this.projectName : this.editedProjectName,
    Code: this.componentCode,
    Status: this.status,
    Customer_Market_Segment: opType === 'created' ? this.segmentName : this.editedSegmentName,
    Application: applicationListSet,
    Technology: technologyListSet
  }
  logger.info(`Actual Object is : ${JSON.stringify(actualProjectFromGrid)}`)
  logger.info(`Expected Object is : ${JSON.stringify(expectedProjectFromGrid)}`)
  await projectPage.assertObjects(actualProjectFromGrid, expectedProjectFromGrid)
})

When('I set the status to {string}', async function (status) {
  this.status = status
  const statusDropDown = await projectPage.statusDropDown
  await projectPage.webElementHandler.selectDropDown(await statusDropDown, status)
  await projectPage.waitForDuration(2)
})

When('I goto the details page of the project I created', async function () {
  const urlToNavigateTo = await projectPage.envURL + `alproject/home?query=${this.componentCode}`
  await projectPage.gotoPage(urlToNavigateTo)
})

When('I {string} the name of the project', async function (opType) {
  if (opType === 'set') {
    this.projectName =
      'Test_Auto_Project_' + (await projectPage.generateRandomStrings(10))
    await projectPage.enterName(this.projectName)
  } else {
    this.editedProjectName =
      'Test_Edited_Auto_Project_' + (await projectPage.generateRandomStrings(10))
    await projectPage.waitForDuration(1)
    await projectPage.enterName(this.editedProjectName)
  }
})

When('I {string} the Customer or Market Segment', async function (opType) {
  const projectName = await projectPage.generateRandomStrings(10);
  const prefix = opType === 'set' ? 'Test_Auto_Seg_' : 'Test_Edited_Auto_Seg_';
  const segmentName = prefix + projectName;
  
  if (opType === 'set') {
    this.segmentName = segmentName;
  } else {
    this.editedSegmentName = segmentName;
  }

  await projectPage.enterSegment(segmentName);
});

When('I {string} the ADP Number to {string}', async function (opType, adpNumber) {
  if (opType === 'set') {
    this.adp_Number = adpNumber
    await projectPage.enterADP_Number(this.adp_Number)
  } else {
    this.editedAdp_Number = 'Edited_' + adpNumber
    await projectPage.enterADP_Number(this.editedAdp_Number)
  }
})

When('I add the note {string}', async function (note) {
  this.notesToAdd = note
  const noteElement = await projectPage.note_TextArea
  await projectPage.webElementHandler.fillInput(await noteElement, note)
})

When('I validate that the note is saved', async function () {
  const noteElements = await projectPage.allNotes
  const notes = await projectPage.webElementHandler.getAllTexts(noteElements)
  expect(notes).toContain(this.notesToAdd)
})

When('I delete the project', async function () {
  await this.apiUtil.deleteAPI(`api/v3/projects/PRO${this.componentCode}`, await this.jwtToken)
})

When('I delete the {string} set in the project', async function (dropDownType) {
  await projectPage.deleteDetails(dropDownType)
  await projectPage.waitForDuration(2)
})
