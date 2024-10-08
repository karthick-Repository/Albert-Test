class BackEndHelper {
  constructor (apiUtil) {
    this.apiUtil = apiUtil
  }

  async fetchInventoriesWithLots (numberOfInventoriesToFetch, inventoryType, jwtToken) {
    const endPoint = `api/v3/inventories/search?limit=1000&category=${inventoryType}`
    const response = await this.apiUtil.getAPI(endPoint, jwtToken)
    const itemsWithInventoryAboveZero = response.Items.flatMap(item =>
      item.lots?.filter(lot => lot.inventoryOnHand > 0).map(lot => ({
        inventoryOnHand: lot.inventoryOnHand,
        albertId: item.albertId
      }))
    )
    return itemsWithInventoryAboveZero.sort(() => 0.5 - Math.random()).slice(0, numberOfInventoriesToFetch)
  }

  async fetchInventoriesHavingLots (numberOfInventoriesToFetch, inventoryType, jwtToken) {
    const endPoint = `api/v3/lots?limit=1000&parentIdCategory=${inventoryType}&exactMatch=false&beginsWith=false`
    const response = await this.apiUtil.getAPI(endPoint, jwtToken)
    const itemsWithInventoryAboveZero = response.Items.filter(item => parseFloat(item.inventoryOnHand) > 0).map(item => ({
      inventoryOnHand: item.inventoryOnHand,
      albertId: item.albertId,
      inventoryID: item.parentId.replace('INV', ''),
      lotNumber: item.lotNumber,
      barcodeId: item.barcodeId
    }))
    return itemsWithInventoryAboveZero.slice(0, numberOfInventoriesToFetch)
  }

  async fetchDataTemplates (numberOfDT, jwtToken) {
    const endPoint = `api/v3/datatemplates?limit=${numberOfDT}&orderBy=desc&exactMatch=false&search=false`
    const response = await this.apiUtil.getAPI(endPoint, jwtToken)
    return response.Items.map(item => item.albertId)
  }

  async fetchTags (numberOfTags, jwtToken) {
    const endPoint = 'api/v3/tags?limit=49&startKey=Test&orderBy=desc&exactMatch=false'
    const response = await this.apiUtil.getAPI(endPoint, jwtToken)
    return response.Items.map(item => item.name).sort(() => 0.5 - Math.random()).slice(0, numberOfTags)
  }

  async fetchAllFormulaColumnsFromWKS (projectID, jwtToken) {
    const response = await this.apiUtil.getAPI(`api/v3/worksheet/project/PRO${projectID}/columns`, jwtToken)
    const inventoryColumns = response.Columns.filter(column => column.type === 'INV')
    inventoryColumns.sort((a, b) => a.id.localeCompare(b.id) || a.name.localeCompare(b.name))
    return inventoryColumns.map(column => ({ id: column.id, name: column.name }))
  }

  async createLotsForInventories (dataGenerator, inventories, jwtToken) {
    const lotResponses = inventories.map(async inventory => {
      const payloadForPost = dataGenerator.generateLotCreateInformation(inventory)
      return this.apiUtil.postAPI('api/v3/lots', payloadForPost, jwtToken)
    })
    return Promise.all(lotResponses)
  }

  async fetchParameterGroups (numberOfPG, type = 'general', jwtToken) {
    const endPoint = `api/v3/parametergroups?limit=${numberOfPG}&type=${type}&name=Test&exactMatch=false&beginsWith=false&orderBy=desc`
    const response = await this.apiUtil.getAPI(endPoint, jwtToken)
    return response.Items.map(item => ({ name: item.name, albertID: item.albertID }))
  }

  async fetchTheDesignIdOfWorksheet (gridType, projectID, sheetID, jwtToken) {
    const response = await this.apiUtil.getAPI(`api/v3/worksheet/?type=project&id=${projectID}`, jwtToken)
    const sheet = response.Sheets.find(sheet => sheet.albertId === sheetID)
    const design = sheet?.Designs.find(design => design.designType === gridType)
    return design?.albertId ?? null
  }

  async fetchAllColumnsFromSheet (gridType, projectID, sheetID, jwtToken) {
    const designID = await this.fetchTheDesignIdOfWorksheet(gridType, projectID, sheetID, jwtToken)
    const response = await this.apiUtil.getAPI(`api/v3/worksheet/${designID}/${gridType}/grid`, jwtToken)
    return response.Items[0].Values.map(item => ({ name: item.name, id: item.id }))
  }

  reorderBasedOnDefaultColumnFetched (items) {
    if (items.length === 0) return items // Check if the array is empty

    // Get the name of the last item to be moved to the front
    const specialName = items[items.length - 1].name

    // Find the default formula entry and remove it from the array
    const specialIndex = items.findIndex(item => item.name === specialName)
    if (specialIndex > -1) {
      const [specialEntry] = items.splice(specialIndex, 1) // Remove the item
      items.unshift(specialEntry) // Add it to the beginning
    }

    return items
  }

  async fetchInventories (numberOfInventories, typeOfInv, jwtToken) {
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
    return validAlbertIds.slice(0, Math.min(numberOfInventories, validAlbertIds.length))
      .map(albertId => ({
        type: 'INV',
        id: 'INV' + albertId
      }))
  }
}

module.exports = { BackEndHelper }
