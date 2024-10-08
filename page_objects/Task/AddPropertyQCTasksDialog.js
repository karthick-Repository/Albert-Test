const { Dialog } = require('../Common/Dialog')

class AddPropertyQCTasksDialog extends Dialog {
  constructor (page) {
    super(page)
    this.page = page
    this.parentGrid = page.locator('app-qc-task-result-grid')
    this.dialogHeaders = this.parentGrid.locator('.igx-grid__th-title')
    this.dialogGridHasNoData = this.parentGrid.locator('.igx-grid__tbody span')
  }

  async validatePresenceOfAddPropertyQCTaskDialog () {
    await this.assertionHandler.assertForVisibility(await this.parentGrid)
  }

  async validateAddPropertyQCTaskDialogHeaders (targetColumn) {
    const expectedHeaders = ['Task Name']
    expectedHeaders.push(targetColumn + ' ' + 'Target')
    await this.waitForDuration(3)
    const actualHeadersFromUI = await this.webElementHandler.getAllTexts(await this.dialogHeaders)
    await this.assertionHandler.assertObjects(actualHeadersFromUI, expectedHeaders)
  }

  async validateGridHasNoDataMessage () {
    await this.assertionHandler.assertForVisibility(await this.dialogGridHasNoData)
  }
}

module.exports = { AddPropertyQCTasksDialog }
