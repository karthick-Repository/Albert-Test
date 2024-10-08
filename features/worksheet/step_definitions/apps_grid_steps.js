const { When, Then, Before } = require('@cucumber/cucumber')
const logger = require('../../../utilities/Logger')

let wksPage

Before(async function () {
  wksPage = await this.poManager.fetchWorksheetPage()
})

When('I add {int} tags to the cell identified by the row index {int} and column ID {string} in the apps grid', async function (numberOfTags, rowIndex, columnID) {
  this.appsGridTagsToSet = await this.backEndHelper.fetchTags(numberOfTags, await this.jwtToken)
  logger.info(`Tags to be added are : ${this.appsGridTagsToSet}`)
  await wksPage.columnsModule.addTagsToAppsGrid(rowIndex, columnID, this.appsGridTagsToSet)
})

When('I add the column containing index {string} from worksheet {int} as predecessor to the cell identified by the row index {int} and column ID {string} in the current project', async function (columnID, worksheetIndex, rowIndex, columnIndex) {
  const projectToUse = this.allProjectsMap[worksheetIndex - 1].get('projectId')
  logger.info(`Project to be used is : ${projectToUse}`)
  const formulaColumnsInWorksheet = await this.backEndHelper.fetchAllFormulaColumnsFromWKS(projectToUse, await this.jwtToken)
  const matches = formulaColumnsInWorksheet.filter(column => column.name.includes(columnID)).map(entry => entry.name)
  this.selectedPredecessor = matches.length > 0 ? matches[0] : undefined
  if (this.selectedPredecessor) {
    await wksPage.columnsModule.addPredecessorToAppsGrid(rowIndex, columnIndex, this.selectedPredecessor)
  } else {
    logger.info('No column found containing the specified index')
  }
})
