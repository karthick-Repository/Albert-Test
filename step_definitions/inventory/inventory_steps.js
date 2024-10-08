const { Given, When, Then, Before } = require('@cucumber/cucumber')
const logger = require('../../utilities/Logger')
const { AdjustmentTransfer } = require('../../page_objects/Adjustment_Transfer/AdjustmentTransfer')

let inventoryPage, elementHandler, inventoryCode
let inventoryName, inventoryAlias, inventoryDescription, inventoryTracking
let inventoryManufacturer = []
let editedInventoryName, editedAlias, editedDescription, rsn, rsne, productCode
let listIDH = []; let editedManufacturer = []
let expectedInventoryObject = {}
let actualInventoryObject = {}
let adjustmentTrasnfer

Before(async function () {
  inventoryPage = await this.poManager.fetchInventoryPage()
  elementHandler = await inventoryPage.webElementHandler
  adjustmentTrasnfer = new AdjustmentTransfer(this.page)
})

Then('Verify that {string} tab is selected', async function (inventoryType) {
  await inventoryPage.checkTabSelected(inventoryType)
})

Then(
  'Validate the UI elements in the inventory pop-up dialog for {string}',
  async function (invType) {
    if (invType === 'Raw Material') {
      await this.poManager
        .fetchRawMaterialModule()
        .validateRawMaterialDialogContents()
    } else if (invType === 'Consumable') {
      await this.poManager
        .fetchConsumableModule()
        .validateConsumableDialogContents()
    } else if (invType === 'Equipment') {
      await this.poManager
        .fetchEquipmentModule()
        .validateEquipmentDialogContents()
    } else {
      logger.info(
        `Please check the inventory type passed as ${invType} is invalid`
      )
    }
  }
)

When('User clicks on the {string} tab', async function (invType) {
  await this.poManager.fetchInventoryPage().selectInventoryTab(invType)
})

When(
  'User enters the details of the Raw Material inventory to be created',
  async function () {
    this.inventoryCreated = await this.poManager
      .fetchRawMaterialModule()
      .createRawMaterialInventoryWithPreFilledData()
  }
)

When(
  'User enters the details of the Consumable inventory to be created',
  async function () {
    this.inventoryCreated = await this.poManager
      .fetchConsumableModule()
      .createConsumableInventoryWithPreFilledData()
  }
)

When(
  'User enters the details of the Equipment inventory to be created',
  async function () {
    this.inventoryCreated = await this.poManager
      .fetchEquipmentModule()
      .createEquipmentInventoryWithPreFilledData()
  }
)

Then('Inventory must be created successfully', async function () {
  await this.poManager
    .fetchInventoryPage()
    .verifyInventoryNameAfterCreation(this.inventoryCreated.invName)
})

When(
  'I validate that {string} tab is selected by default',
  async function (defaultSelection) {
    await inventoryPage.checkTabSelected(defaultSelection)
  }
)

When(
  'I set {string} {string} {string}',
  async function (numberOfItems, type, component) {
    const totalNumber = Number.parseInt(numberOfItems)
    const endPoint = `api/v3/${component}?limit=1&name=inv&exactMatch=false&dupDetection=true`
    for (let i = 0; i < totalNumber; i++) {
      if (type === 'existing') {
        const getResponse = await this.apiUtil.getAPI(endPoint, await this.jwtToken)
        inventoryManufacturer = getResponse.Items.map((app) => app.name)
      } else {
        const newComponentName = `Test_Auto_${component}_`
        const random = await inventoryPage.generateRandomStrings(10)
        inventoryManufacturer.push(newComponentName + random)
      }
    }
    await inventoryPage.setMultiSelectFieldValues(await inventoryPage.manufacturer_AutoComplete,
      inventoryManufacturer, await inventoryPage.inventoryOptionsList,
      await inventoryPage.mayaInventoryFrameLocator.getByRole('button', { name: 'Add' }))
  }
)

When('I set the alias name of the Inventory', async function () {
  const random = await inventoryPage.generateRandomStrings(10)
  inventoryAlias = `Test_Auto_Alias_Name_${random}`
  await inventoryPage.webElementHandler.fillInput(await inventoryPage.alias_Input, inventoryAlias)
})

When('I set the description of the {string}', async function (component) {
  const random = await inventoryPage.generateRandomStrings(10)
  inventoryDescription = `Test_Auto_${component}_Description_${random}`
  await inventoryPage.webElementHandler.fillInput(await inventoryPage.description_TextArea, inventoryDescription)
})

When('I click on the name of the inventory in the details page', async function () {
  const nameElementInDetails = await inventoryPage.invName
  await elementHandler.click(nameElementInDetails)
})

When('I set the name of the Inventory', async function () {
  this.invName = await inventoryPage.setInventoryName(this.dataGenerator)
})

When('I edit the name of the Inventory', async function () {
  this.editedInventoryName = this.invName + '_Edited'
  await inventoryPage.webElementHandler.fillInput(
    await inventoryPage.invName,
    this.editedInventoryName
  )
})

When('I edit the manufacturer of the Inventory', async function () {
  const endPoint = 'api/v3/companies?limit=10&name=Test&exactMatch=false&dupDetection=true'
  const getResponse = await this.apiUtil.getAPI(endPoint, await this.jwtToken)
  const companyNames = getResponse.Items.slice(1).map((app) => app.name)
  const randomIndex = Math.floor(Math.random() * companyNames.length)
  editedManufacturer = companyNames[randomIndex]
  await inventoryPage.waitForDuration(2)
  await inventoryPage.setManufacturer(editedManufacturer)
})

When('I edit the alias name of the Inventory', async function () {
  editedAlias = inventoryAlias + '_Edited'
  await inventoryPage.webElementHandler.fillInput(await inventoryPage.alias_Input, editedAlias)
})

When('I edit the description of the Inventory', async function () {
  editedDescription = inventoryDescription + '_Edited'
  await inventoryPage.webElementHandler.fillInput(await inventoryPage.description_TextArea, editedDescription)
})

When('I edit the RSN value', async function () {
  const random = await inventoryPage.generateRandomStrings(10)
  rsn = `Test_Auto_RSN_${random}`
  await inventoryPage.webElementHandler.fillInput(await inventoryPage.rnsInput, rsn)
})

When('I edit the RSNe value', async function () {
  const random = await inventoryPage.generateRandomStrings(10)
  rsne = `Test_Auto_RSNe_${random}`
  await inventoryPage.webElementHandler.fillInput(await inventoryPage.rnseInput, rsne)
})

When('I set {string} {string} {string} with category {string}', async function (numberOfItems, type, component, category) {
  const totalNumber = Number.parseInt(numberOfItems)
  const endPoint = `api/v3/${component}?limit=${numberOfItems}&category=${category}&orderBy=desc&name=Test`
  const getResponse = await this.apiUtil.getAPI(endPoint, await this.jwtToken)
  if (type === 'existing') {
    listIDH = getResponse.Items.map((app) => app.name)
  } else {
    for (let i = 0; i < totalNumber; i++) {
      const newComponentName = `Test_Auto_${component}_`
      const random = await inventoryPage.generateRandomStrings(10)
      listIDH.push(newComponentName + random)
    }
  }
  logger.info(`IDH values to be set are : ${listIDH}`)
  await inventoryPage.setMultiSelectFieldValues(await inventoryPage.idhAutoComplete_MultiSelect, listIDH)
})

When('I set the product code', async function () {
  const random = await inventoryPage.generateRandomStrings(10)
  productCode = `Test_Auto_Product Code_${random}`
  await inventoryPage.webElementHandler.fillInput(await inventoryPage.productCode_Input, productCode)
})

When('I fetch the code of the inventory I just created', async function () {
  const invURL = await inventoryPage.fetchPageURL()
  this.inventoryCode = invURL.split('query=')[1]
})

Given('I goto the details page of the inventory I created', async function () {
  await inventoryPage.gotoPage(await inventoryPage.envURL + `alinventory/detail?query=${this.inventoryCode}`)
  await inventoryPage.waitForURL('**/inventory/*')
})

When('I set {string} as inventory tracking', async function (invTracking) {
  inventoryTracking = invTracking.toLowerCase()
  // const invTrackingToSet = inventoryTracking === 'units' ? await inventoryPage.unitsRadio : await inventoryPage.massRadio
  const invTrackingToSet = await this.page.getByText(invTracking).first()
  await elementHandler.click(await invTrackingToSet)
})

async function buildExpectedObject (typeOfInv, opType) {
  expectedInventoryObject = {
    Name: opType === 'created' ? this.inventoryName : this.editedInventoryName,
    Manufacturer: opType === 'created' ? inventoryManufacturer : [editedManufacturer],
    Alias: opType === 'created' ? inventoryAlias : editedAlias,
    Description: opType === 'created' ? inventoryDescription : editedDescription,
    Tags: null,
    Product_Code: null
  }

  if (opType === 'edited') {
    expectedInventoryObject.Tags = this.addedTags
    expectedInventoryObject.Product_Code = productCode

    if (typeOfInv === 'consumable' || typeOfInv === 'raw material') {
      expectedInventoryObject.RSN = rsn
      expectedInventoryObject.RSNe = rsne
      expectedInventoryObject.IDH = listIDH
    }

    if (typeOfInv === 'consumable' || typeOfInv === 'equipment') {
      expectedInventoryObject.Tracking = inventoryTracking
    }
  }

  return expectedInventoryObject
}

async function buildActualObject (typeOfInv, opType) {
  const actualInventoryObject = {
    Name: await inventoryPage.webElementHandler.getInputValue(await inventoryPage.inventoryNameInDetails),
    Manufacturer: [await inventoryPage.webElementHandler.getInputValue(await inventoryPage.manufacturer_AutoComplete)],
    Alias: await inventoryPage.webElementHandler.getInputValue(await inventoryPage.alias_Input),
    Description: await inventoryPage.webElementHandler.getInputValue(await inventoryPage.description_TextArea),
    Tags: opType === 'edited' ? await inventoryPage.webElementHandler.getAllTexts(await inventoryPage.tagsValuesSet) : null,
    Product_Code: opType === 'edited' ? await inventoryPage.webElementHandler.getInputValue(await inventoryPage.productCode_Input) : null
  }

  if (opType === 'edited') {
    if (typeOfInv === 'consumable' || typeOfInv === 'raw material') {
      actualInventoryObject.RSN = await inventoryPage.webElementHandler.getInputValue(await inventoryPage.rnsInput)
      actualInventoryObject.RSNe = await inventoryPage.webElementHandler.getInputValue(await inventoryPage.rnseInput)
      actualInventoryObject.IDH = await inventoryPage.webElementHandler.getAllTexts(await inventoryPage.idhValuesSet)
    }
    if (typeOfInv === 'consumable' || typeOfInv === 'equipment') {
      actualInventoryObject.Tracking = await inventoryPage.webElementHandler.getAttributeValue(await inventoryPage.inventoryTrackingSet, 'value')
    }
  }

  return actualInventoryObject
}

Then('I validate that the {string} inventory is {string} with the right details passed', async function (typeOfInv, opType) {
  expectedInventoryObject = await buildExpectedObject(typeOfInv, opType)
  if (opType === 'edited') {
    expectedInventoryObject.Tags = this.addedTags
  }
  actualInventoryObject = await buildActualObject(typeOfInv, opType)
  logger.info(`Actual Object is : ${JSON.stringify(actualInventoryObject)}`)
  logger.info(`Expected Object is : ${JSON.stringify(expectedInventoryObject)}`)
  await inventoryPage.assertObjects(actualInventoryObject, expectedInventoryObject)
})

When('I search for the inventory I just {string}', async function (opType) {
  const searchTerm = opType === 'created' ? this.inventoryName : this.editedInventoryName
  await inventoryPage.grid.searchInGrid(searchTerm)
})

Then('I validate that the inventory is {string} successfully', async function (opType) {
  this.actualInventoryFromSearchGrid = await inventoryPage.grid.buildActualInventoryObject()
  if (opType === 'edited') {
    Object.keys(expectedInventoryObject).slice(-6).forEach(key => {
      delete expectedInventoryObject[key]
    })
  } else {
    Object.keys(expectedInventoryObject).slice(-2).forEach(key => {
      delete expectedInventoryObject[key]
    })
  }
  expectedInventoryObject.Code = inventoryCode
  logger.info(`Actual Object ${opType} is : ${JSON.stringify(this.actualInventoryFromSearchGrid)}`)
  logger.info(`Expected Object ${opType} is : ${JSON.stringify(expectedInventoryObject)}`)
  if (opType === 'deleted') {
    await inventoryPage.assertObjectsFalsy(this.actualInventoryFromSearchGrid, expectedInventoryObject)
  } else {
    await inventoryPage.assertObjects(this.actualInventoryFromSearchGrid, expectedInventoryObject)
  }
})

When('I delete the Inventory', async function () {
  const endPoint = 'api/v3/inventories/INV' + inventoryCode
  await this.apiUtil.deleteAPI(endPoint, await this.jwtToken)
})

When('I create lot data for the formula columns in the WKS', async function () {
  const lotCreateResponse = await this.backEndHelper.createLotsForInventories(this.dataGenerator, this.allFormulasInWKS, await this.jwtToken)
  this.lotInformationGenerated = lotCreateResponse.flat()
  this.lotInformationGenerated.sort((a, b) => a.parentName.localeCompare(b.parentName))
})

When('User click on open details and added two new price with value {string} and {string} also add distinct location one Vendor name from dropdown at index {string}', async function (value1, value2, index) {
  await inventoryPage.addPrice(value1, value2, index)
})

When('User click on open details and update the predecessor value', async () => {
  await inventoryPage.updatePredecessorValue()
})

When('I click on the create button in the inventory dialog', async function () {
  await inventoryPage.webElementHandler.click(await inventoryPage.inventoryCreateButton)
  await inventoryPage.waitForDuration(2)
})


When('I click on {string} to create adjustment inventory',async (adjustment) => {
  await adjustmentTrasnfer.clickOnAdjustment()
})

When('I click on Lot Dropdown',async () => {
  await adjustmentTrasnfer.clickOnLot()
})
