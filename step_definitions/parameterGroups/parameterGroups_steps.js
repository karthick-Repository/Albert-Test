const { When, Then, Before } = require('@cucumber/cucumber')
const logger = require('../../utilities/Logger')

let pgPage, paramGroupCode, expectedPG

Before(async function () {
  pgPage = await this.poManager.fetchParameterGroupsPage()
})

When('I set {string} as parameters', async function (parameters) {
  const parameterElement = await pgPage.parameters_AutoComplete
  await pgPage.fillAutoSelectValues(await parameterElement, parameters)
})

When('I set the {string} value in the {string} field', async function (numberOfParms, parameterType) {
  this.parametersSet = []
  let endpoint, autoSelectLocator
  if (parameterType === 'template') {
    endpoint = `api/v3/${parameterType}?limit=${numberOfParms}`
  } else if (['Formulas', 'Equipment', 'Consumables', 'RawMaterials'].includes(parameterType)) {
    endpoint = `api/v3/inventories?limit=${numberOfParms}&category=${parameterType}`
  } else {
    throw new Error('Invalid parameter group type')
  }
  const responseBody = await this.apiUtil.getAPI(endpoint, await this.jwtToken)
  const param = await responseBody.Items.map(item => item.name)[0]
  this.parametersSet.push(param)
  switch (parameterType) {
    case 'template':
      autoSelectLocator = await pgPage.template_AutoComplete
      break
    case 'Formulas':
      autoSelectLocator = await pgPage.formulas_AutoComplete
      break
    case 'Equipment':
      autoSelectLocator = await pgPage.equipment_AutoComplete
      break
    case 'Consumables':
      autoSelectLocator = await pgPage.consumables_AutoComplete
      break
    case 'RawMaterials':
      autoSelectLocator = await pgPage.rawMaterials_AutoComplete
      break
  }
  await pgPage.webElementHandler.fillInputWithoutClear(await autoSelectLocator, param)
  await pgPage.webElementHandler.click(await pgPage.optionsList.first())
})

async function buildExpectedObject (typeOfParameterGroup, opType) {
  expectedPG = {
    Type: typeOfParameterGroup,
    Name: opType === 'created' ? this.inventoryName : this.editedInventoryName,
    Description: opType === 'created' ? this.inventoryDescription : this.editedDescription,
    Tags: this.addedTags
  }
  this.expectedParameterGroup = expectedPG
  return expectedPG
}

async function buildActualObject (typeOfPG, opType) {
  return {
    Type: await pgPage.webElementHandler.getText(await pgPage.type_LeftContainer),
    Name: await pgPage.webElementHandler.getInputValue(await pgPage.name_LeftContainer),
    Description: await pgPage.webElementHandler.getInputValue(await pgPage.description_LeftContainer),
    Tags: await pgPage.webElementHandler.getAllTexts(await pgPage.tags_LeftContainer_Selected)
  }
}

Then('I validate that the {string} parameter group is {string} with the right details passed', async function (typeOfPG, opType) {
  const expectedObject = await buildExpectedObject(typeOfPG, opType)
  const actualObject = await buildActualObject(typeOfPG, opType)
  logger.info(`Actual Object is : ${JSON.stringify(actualObject)}`)
  logger.info(`Expected Object is : ${JSON.stringify(expectedObject)}`)
  await pgPage.assertObjects(actualObject, expectedObject)
})

When('I fetch the code of the parameter group from the URL', async function () {
  const pgURL = await pgPage.fetchPageURL()
  const pgCodeFromURL = await pgURL.split('/')[5]
  paramGroupCode = pgCodeFromURL.charAt(0) + 'R' + pgCodeFromURL.slice(1)
  this.pgCode = paramGroupCode
})

When('I delete the parameter group', async function () {
  const endPoint = `api/v3/parametergroups/${paramGroupCode}`
  await this.apiUtil.deleteAPI(endPoint, await this.jwtToken)
})
