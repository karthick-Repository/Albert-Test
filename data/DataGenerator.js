const { APIUtil } = require('../utilities/APIUtil')
const logger = require('../utilities/Logger')

class DataGenerator {
  constructor (apicontext) {
    this.apiUtil = new APIUtil(apicontext)
  }

  generateProjectData () {
    return {
      name: [...Array(76)]
        .map(() => (~~(Math.random() * 36)).toString(36))
        .join('')
    }
  }

  generateString (length) {
    let result = ''
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      const randomCharacter = characters[randomIndex]
      result += randomCharacter
    }

    return result
  }

  generateDecimalString (maxLength) {
    let number = '0.'
    for (let i = 2; i < maxLength; i++) {
      number += Math.floor(Math.random() * 10)
    }
    return number
  }

  generateRandomNumberString (prefix, totalLength) {
    let result = prefix
    const length = totalLength - prefix.length
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10)
    }
    return result
  }

  /*
      Method to generate random row data which can be inserted into a worksheet
      Input : numberOfRows - This indicates the total number of rows which have to be added into the worksheet
      Output: A valid json array with a set of row details which can be used to fill the worksheet
    */
  generateRowColumnWorksheetData (numberOfRows) {
    const worksheetRowArray = {
      rowData: []
    }
    for (let i = 0; i < numberOfRows; i++) {
      const randomNumber = (Math.floor(Math.random() * 9999) + 1).toString()
      const detail =
        this.formulas[Math.floor(Math.random() * this.formulas.length)]
      const row = {
        rowName: 'Test Row '.concat(randomNumber),
        detail
      }
      worksheetRowArray.rowData.push(row)
    }
    return JSON.stringify(worksheetRowArray)
  }

  /*
      Method to generate random data which can be inserted into the cell's of a worksheet
      Input : numberOfRows - This indicates the number of values which need to be generated.
                             Totally depends on the number of rows/inventories added into the worksheet
      Output: A valid json array with a set of column values which can be used to fill the worksheet
    */
  generateColumnData (numberOfRows) {
    const columnDataArray = {
      columnInfo: []
    }
    for (let i = 0; i < numberOfRows; i++) {
      const cell = {
        cellDetail:
          this.formulas[Math.floor(Math.random() * this.formulas.length)]
      }
      columnDataArray.columnInfo.push(cell)
    }
    const dataStringified = JSON.stringify(columnDataArray)
    logger.info(`Generated column data is : ${dataStringified}`)
    return dataStringified
  }

  /*
      Method to generate a random payload for location
      Input : none
      Output: A valid location creation payload
    */
  generateLocationPayLoad () {
    const countries = ['US', 'CA', 'UK', 'AU', 'JP'] // Array of countries which will be randomly used while creating a location
    const addresses = [
      'Street A',
      'Street B',
      'Street C',
      'Street D',
      'Street E'
    ] // Array of addresses which will be randomly used while creating a location

    const payload = {
      name: [...Array(76)]
        .map(() => (~~(Math.random() * 36)).toString(36))
        .join(''),

      latitude: Math.random() * (90 - -90) + -90,
      longitude: Math.random() * (180 - -180) + -180,
      address: addresses[Math.floor(Math.random() * addresses.length)],
      country: countries[Math.floor(Math.random() * countries.length)]
    }

    const stringifiedPayLoad = JSON.stringify(payload)
    logger.info(`Location payload generated : ${stringifiedPayLoad}`)
    return stringifiedPayLoad
  }

  generateProjectPayLoad () {
    let locationID
    const pref = 'MO'
    if (process.env.EXECUTION_ENVIRONMENT === 'dev') {
      locationID = process.env.TENANT === 'TEN1' ? 'LOC1375' : 'LOC2'
    } else {
      locationID = process.env.TENANT === 'TEN1' ? 'LOC102' : 'LOC717'
    }
    const payLoad = {
      description:
        'Test Automation Project ' +
        (Math.floor(Math.random() * 99999) + 1).toString(),
      Locations: [
        {
          id: locationID
        }
      ],
      prefix: pref
    }
    return JSON.stringify(payLoad)
  }

  /*
      Method to generate a random payload for lists
      Input : category - can be either "Application" or "Technology"
      Output: A valid list creation payload
    */
  generateListPayLoad (category) {
    const payLoad = {
      name:
        'Test Automation List ' +
        [...Array(30)]
          .map((i) => (~~(Math.random() * 36)).toString(36))
          .join(''),
      category
    }
    return JSON.stringify(payLoad)
  }

  generateColumnNames (columnType, numberOfColumns) {
    const columnNameArray = {
      columns: []
    }
    let colName_Pre
    if (columnType === 'Blank Column') {
      colName_Pre = 'BLNK_'
    } else {
      colName_Pre = 'FORM_'
    }
    for (let i = 0; i < numberOfColumns; i++) {
      const randomName =
        colName_Pre +
        'COL_' +
        (Math.floor(Math.random() * 9999) + 1).toString()
      const column = {
        columnName: randomName
      }
      columnNameArray.columns.push(column)
    }
    const dataStringified = JSON.stringify(columnNameArray)
    logger.info(`Generated column data is : ${dataStringified}`)
    return dataStringified
  }

  /*
      Method to generate the property task data.
      Params:
        1. locationID - The location ID which should be used in the task creation
        2. inventoryNames - An array containing the inventory names which need to be used in the task creation
        3. assignedTo- A string with a valid name which needs to used in the property task creation
        4. tags - An array containing valid tag names which need to be used in the task creation
        5. datatemplates - An array containing valid data template names which need to be used in the task creation

        The method returns valid property task data which can be consumed by in the automated tests.
    */
  generatePropertyTaskData (
    locationID,
    inventoryNames,
    assignedto,
    tags,
    datatemplates
  ) {
    const inventoriesArray = []
    const tagsArray = []
    const dataTemplatesArray = []

    for (let i = 0; i <= inventoryNames.length - 1; i++) {
      const inventories = {
        invName: inventoryNames[i]
      }
      inventoriesArray.push(inventories)
    }

    for (let x = 0; x <= tags.length - 1; x++) {
      const tagNames = {
        tgName: tags[x]
      }
      tagsArray.push(tagNames)
    }

    for (let z = 0; z <= datatemplates.length - 1; z++) {
      const dataTemps = {
        dataTempName: datatemplates[z]
      }
      dataTemplatesArray.push(dataTemps)
    }

    const priority = ['Low', 'Medium', 'High']
    const propTaskData = {
      taskName:
        'Automated Prop Task ' +
        [...Array(30)]
          .map((i) => (~~(Math.random() * 36)).toString(36))
          .join(''),
      location: locationID,
      inventories: JSON.stringify(inventoriesArray),
      assignedTo: assignedto,
      priority: priority[Math.floor(Math.random() * priority.length)],
      tags: JSON.stringify(tagsArray),
      notes:
        'Automated Notes ' +
        [...Array(30)]
          .map((i) => (~~(Math.random() * 36)).toString(36))
          .join(''),
      dataTemplate: JSON.stringify(dataTemplatesArray),
      parameterGroups: this.generateParameterGroupsData()
    }
    return JSON.stringify(propTaskData)
  }

  /*
      Method to create a hardcoded list of parameter groups which can be used in task creation
      Params : none

      Retuns the parameter groups which can be used while creating tasks.
    */
  generateParameterGroupsData () {
    return [
      {
        parameterGroup: 'Cooling',
        timeValue: '10',
        timeUnit: 'minute',
        temperature: '40',
        temperatueUnit: 'degree'
      },
      {
        parameterGroup: 'Heat',
        heatingTemperature: '30',
        heatingTemperatureUnit: 'degree',
        heatingTime: '1',
        heatingUnit: 'hour',
        unitName: 'Test Unit',
        unitUnit: 'watt (W)'
      }
    ]
  }

  generateColumnResizeData (columns) {
    const payLoad = {
      data: [
        {
          operation: 'update',
          attribute: 'columnWidth',
          colIds: columns,
          newValue: '23px'
        }
      ]
    }
    return JSON.stringify(payLoad)
  }

  async generateRandomInventoryData (
    numberOfInventories,
    inventoryType,
    jwtToken
  ) {
    const responseJson = await this.apiUtil.getAPI(
      `api/v3/inventories/search?limit=${numberOfInventories}&category=${inventoryType}`,
      jwtToken
    )
    const parsedResponse = JSON.parse(JSON.stringify(responseJson))
    const inventoryData = parsedResponse.Items.map((inventory) => ({
      name: inventory.name,
      company_name: inventory.company_name,
      albertId: inventory.albertId,
      detail: Math.floor(Math.random() * 100).toString()
    }))
    logger.info(
      `Inventory list generated is : ${JSON.stringify(inventoryData)}`
    )
    return inventoryData
  }

  generateRandomBlankRowData (numberOfRows) {
    const blankRowData = []
    for (let i = 1; i <= numberOfRows; i++) {
      const singleRowArray = [{
        type: 'BLK',
        name: 'Test_Aut_Row' + this.generateString(10)
      }]
      blankRowData.push(singleRowArray)
    }
    return blankRowData
  }

  async generateRandomInventoryRowData (numberOfInventoryRows, typeOfInv, jwtToken) {
    // Fetch inventory data
    const responseJson = await this.apiUtil.getAPI(
      `api/v3/inventories/search?limit=100&category=${typeOfInv}`,
      jwtToken
    )

    // Filter out items with valid names and map to their albertIds
    const validAlbertIds = responseJson.Items
      .filter(item => item.name && item.name.trim() !== '')
      .map(item => item.albertId)

    // Shuffle the array of validAlbertIds to randomize selection
    for (let i = validAlbertIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [validAlbertIds[i], validAlbertIds[j]] = [validAlbertIds[j], validAlbertIds[i]] // ES6 array destructuring for swap
    }

    // Select the first N validAlbertIds based on the requested number of inventory rows
    // or the number of available validAlbertIds, whichever is smaller.
    return validAlbertIds.slice(0, Math.min(numberOfInventoryRows, validAlbertIds.length))
      .map(albertId => ({
        type: 'INV',
        id: 'INV' + albertId
      }))
  }

  generateRandomFormulaColumnData (numberOfFormulaColumns) {
    return Array.from({ length: numberOfFormulaColumns }, () => ({
      type: 'INV',
      position: 'leftOf',
      referenceId: 'COL5'
    }))
  }

  generateRandomBlankColumnData (numberOfBlankColumns) {
    return Array.from({ length: numberOfBlankColumns }, () => ({
      type: 'BLK',
      name: 'TABC' + this.generateString(5),
      position: 'leftOf',
      referenceId: 'COL5'
    }))
  }

  async generateRandomTagsData (numberOfTags, jwtToken) {
    const responseJson = await this.apiUtil.getAPI(
      `api/v3/tags?limit=${numberOfTags}&startKey=Test&orderBy=desc&exactMatch=false`,
      jwtToken
    )
    return responseJson.Items.map(tag => tag.name)
  }

  generateLotCreateInformation (inventory) {
    let StorageLocationID
    if (process.env.EXECUTION_ENVIRONMENT === 'dev') {
      StorageLocationID = process.env.TENANT === 'TEN1' ? 'STL28440' : 'STL1234699'
    } else {
      StorageLocationID = process.env.TENANT === 'TEN1' ? 'STL2798' : 'STL27119'
    }
    return [{
      parentId: inventory,
      manufacturerLotNumber: this.generateString(8),
      StorageLocation: {
        id:StorageLocationID
      },
      inventoryOnHand: '10',
      initialQuantity: '10',
      cost: '5'
    }]
  }
}

module.exports = { DataGenerator }
