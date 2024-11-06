class BackEndHelper {
  constructor (apiUtil) {
    this.apiUtil = apiUtil
  }

  /**
   * Fetches inventories with lots having inventory above zero.
   * @param {number} numberOfInventoriesToFetch - Number of inventories to fetch.
   * @param {string} inventoryType - Type of inventory.
   * @param {string} jwtToken - JWT token for authentication.
   * @returns {Promise<Array>} Array of inventories with lots having inventory above zero.
   */
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

  /**
   * Fetches inventories having lots with inventory above zero.
   * @param {number} numberOfInventoriesToFetch - Number of inventories to fetch.
   * @param {string} inventoryType - Type of inventory.
   * @param {string} jwtToken - JWT token for authentication.
   * @returns {Promise<Array>} Array of inventories having lots with inventory above zero.
   */
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

  /**
   * Fetches data templates.
   * @param {number} numberOfDT - Number of data templates to fetch.
   * @param {string} jwtToken - JWT token for authentication.
   * @returns {Promise<Array>} Array of data template IDs.
   */
  async fetchDataTemplates (numberOfDT, jwtToken) {
    const endPoint = `api/v3/datatemplates?limit=${numberOfDT}&orderBy=desc&exactMatch=false&search=false`
    const response = await this.apiUtil.getAPI(endPoint, jwtToken)
    return response.Items.map(item => item.albertId)
  }

  /**
   * Fetches tags.
   * @param {number} numberOfTags - Number of tags to fetch.
   * @param {string} jwtToken - JWT token for authentication.
   * @returns {Promise<Array>} Array of tag names.
   */
  async fetchTags (numberOfTags, jwtToken) {
    const endPoint = 'api/v3/tags?limit=49&startKey=Test&orderBy=desc&exactMatch=false'
    const response = await this.apiUtil.getAPI(endPoint, jwtToken)
    return response.Items.map(item => item.name).sort(() => 0.5 - Math.random()).slice(0, numberOfTags)
  }

  /**
   * Fetches all formula columns from a worksheet.
   * @param {string} projectID - Project ID.
   * @param {string} jwtToken - JWT token for authentication.
   * @returns {Promise<Array>} Array of formula columns.
   */
  async fetchAllFormulaColumnsFromWKS (projectID, jwtToken) {
    const response = await this.apiUtil.getAPI(`api/v3/worksheet/project/PRO${projectID}/columns`, jwtToken)
    const inventoryColumns = response.Columns.filter(column => column.type === 'INV')
    inventoryColumns.sort((a, b) => a.id.localeCompare(b.id) || a.name.localeCompare(b.name))
    return inventoryColumns.map(column => ({ id: column.id, name: column.name }))
  }

  /**
   * Creates lots for inventories.
   * @param {Object} dataGenerator - Data generator instance.
   * @param {Array} inventories - Array of inventories.
   * @param {string} jwtToken - JWT token for authentication.
   * @returns {Promise<Array>} Array of lot creation responses.
   */
  async createLotsForInventories (dataGenerator, inventories, jwtToken) {
    const lotResponses = inventories.map(async inventory => {
      const payloadForPost = dataGenerator.generateLotCreateInformation(inventory)
      return this.apiUtil.postAPI('api/v3/lots', payloadForPost, jwtToken)
    })
    return Promise.all(lotResponses)
  }

  /**
   * Fetches parameter groups.
   * @param {number} numberOfPG - Number of parameter groups to fetch.
   * @param {string} [type='general'] - Type of parameter groups.
   * @param {string} jwtToken - JWT token for authentication.
   * @returns {Promise<Array>} Array of parameter groups.
   */
  async fetchParameterGroups (numberOfPG, type = 'general', jwtToken) {
    const endPoint = `api/v3/parametergroups?limit=${numberOfPG}&type=${type}&name=Test&exactMatch=false&beginsWith=false&orderBy=desc`
    const response = await this.apiUtil.getAPI(endPoint, jwtToken)
    return response.Items.map(item => ({ name: item.name, albertID: item.albertID }))
  }


 /**
   * Creates lots for number of inventories.
   * @param {Object} dataGenerator - Data generator instance.
   * @param {Array} inventories - Array of inventories.
   * @param {int} onHandValue - onHand value for lot.
   * @param {string} jwtToken - JWT token for authentication.
   * @returns {Promise<Array>} Array of lot creation responses.
   */
  async createInventoriesLot (dataGenerator, inventories,onHandValue, jwtToken) {
    const lotResponses = []
    for (let i = 0; i < inventories.length; i++) {
      const payloadForPost = dataGenerator.generateLotCreateInformation(inventories[i],onHandValue)
      const response = await this.apiUtil.postAPI('api/v3/lots', payloadForPost, jwtToken)
      lotResponses.push(response)
    }
    return lotResponses
  }
  /**
   * Fetches the design ID of a worksheet.
   * @param {string} gridType - Grid type.
   * @param {string} projectID - Project ID.
   * @param {string} sheetID - Sheet ID.
   * @param {string} jwtToken - JWT token for authentication.
   * @returns {Promise<string|null>} Design ID or null if not found.
   */
  async fetchTheDesignIdOfWorksheet (gridType, projectID, sheetID, jwtToken) {
    const response = await this.apiUtil.getAPI(`api/v3/worksheet/?type=project&id=${projectID}`, jwtToken)
    const sheet = response.Sheets.find(sheet => sheet.albertId === sheetID)
    const design = sheet?.Designs.find(design => design.designType === gridType)
    return design?.albertId ?? null
  }

  /**
   * Fetches all columns from a sheet.
   * @param {string} gridType - Grid type.
   * @param {string} projectID - Project ID.
   * @param {string} sheetID - Sheet ID.
   * @param {string} jwtToken - JWT token for authentication.
   * @returns {Promise<Array>} Array of columns from the sheet.
   */
  async fetchAllColumnsFromSheet (gridType, projectID, sheetID, jwtToken) {
    const designID = await this.fetchTheDesignIdOfWorksheet(gridType, projectID, sheetID, jwtToken)
    const response = await this.apiUtil.getAPI(`api/v3/worksheet/${designID}/${gridType}/grid`, jwtToken)
    return response.Items[0].Values.map(item => ({ name: item.name, id: item.id }))
  }

  /**
   * Reorders items based on the default column fetched.
   * @param {Array} items - Array of items.
   * @returns {Array} Reordered array of items.
   */
  reorderBasedOnDefaultColumnFetched (items) {
    if (items.length === 0) return items

    const specialName = items[items.length - 1].name

    const specialIndex = items.findIndex(item => item.name === specialName)
    if (specialIndex > -1) {
      const [specialEntry] = items.splice(specialIndex, 1)
      items.unshift(specialEntry)
    }

    return items
  }

  /**
   * Fetches inventories.
   * @param {number} numberOfInventories - Number of inventories to fetch.
   * @param {string} typeOfInv - Type of inventory.
   * @param {string} jwtToken - JWT token for authentication.
   * @returns {Promise<Array>} Array of inventory IDs.
   */
  async fetchInventories (numberOfInventories, typeOfInv, jwtToken) {
    const responseJson = await this.apiUtil.getAPI(`api/v3/inventories/search?limit=100&category=${typeOfInv}`, jwtToken)

    const validAlbertIds = responseJson.Items
      .filter(item => item.name && item.name.trim() !== '')
      .map(item => item.albertId)

    for (let i = validAlbertIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[validAlbertIds[i], validAlbertIds[j]] = [validAlbertIds[j], validAlbertIds[i]]
    }

    return validAlbertIds.slice(0, Math.min(numberOfInventories, validAlbertIds.length)).map(albertId => ({
      type: 'INV',
      id: 'INV' + albertId
    }))
  }
}

module.exports = { BackEndHelper }
