const { setWorldConstructor } = require('@cucumber/cucumber')
const { DataGenerator } = require('../../data/DataGenerator')

class CustomWorld {
  constructor ({ parameters }) {
    this.parameters = parameters
    this.responseMap = new Map()
    this.expected = []
    this.defaultValues = []
    this.trimmedValues = []
    this.dataGenerator = new DataGenerator()
    this.rowsAdded = []
    this.columnsInWKS = ''
    this.allResponseMaps = []
    this.inventoryCode = ''
    this.editedComponentName = ''
    this.addedTags = []
    this.rowsAddedToWKS = []
    this.initialResponseMap = new Map()
  }
}

setWorldConstructor(CustomWorld)
