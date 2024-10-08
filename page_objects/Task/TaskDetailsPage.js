const { TaskPage } = require('../Task/TaskPage')

class TaskDetailsPage extends TaskPage {
  constructor (page) {
    super(page)
    this.page = page
    this.taskHeaderName = page.locator('.taskheadName')
    this.taskNameEditIcon = page.locator('[mattooltip="Edit Task name"]')
    this.ellipsisIconInHeader = page.locator('#warringPopupId')
    this.tabBar = page.locator('.tabbar')
    this.tabsInBar = this.tabBar.locator('a')
    this.parentLeftPane = page.locator('app-property-left')
    this.taskStatusDropDown = this.parentLeftPane.locator('.formula-status-dropdown span')
    this.taskStatusOptions = this.parentLeftPane.locator('.formula-status-dropdown li')
    this.inventoryUpdateLink = page.locator('#lotUpdatePopup')
    this.leftPaneLabels = this.parentLeftPane.locator('label')
    this.leftPaneInventoryLabel = this.parentLeftPane.locator('.p-grid label')
    this.leftPaneInventoryNames = this.parentLeftPane.locator('div.font-semibold')
    this.leftPaneInventoryIDs = this.parentLeftPane.locator('span.inventory-content')
    this.leftPaneInventoryLotIDs = this.parentLeftPane.locator('div.inventory-content')
    this.commonTaskDetailsLeftPane = page.locator('app-task-commonleft-details')
    this.projectDetailsInput = this.commonTaskDetailsLeftPane.locator('app-projectlist input')
    this.assignedToInput = this.commonTaskDetailsLeftPane.locator('app-users input')
    this.createdBy = this.commonTaskDetailsLeftPane.locator('div').nth(3).locator('span')
    this.priorityInput = this.commonTaskDetailsLeftPane.locator('app-autocomplete input')
    this.tagsMultipleContainer = this.commonTaskDetailsLeftPane.locator('app-tags li')
    this.dueDateInput = this.commonTaskDetailsLeftPane.locator('p-calendar input')
  }

  async isInTaskDetailsPage () {
    await this.webElementHandler.waitForVisible(await this.taskHeaderName)
  }

  async validateTaskNameInHeader (expectedTaskObject) {
    const expectedTaskName = expectedTaskObject.taskID + ': ' + expectedTaskObject.taskName
    await this.assertionHandler.assertActualAndExpectedText(await this.taskHeaderName, expectedTaskName)
  }

  async validateTabsInTaskDetailPage () {
    const expectedTabs = ['Task Details', 'Notes', 'Linked Tasks', 'History']
    await this.assertionHandler.assertActualAndExpectedAllTexts(await this.tabsInBar, expectedTabs)
  }

  async validateTaskStatus (status) {
    await this.assertionHandler.assertActualAndExpectedText(await this.taskStatusDropDown.first(), status)
  }

  async validateTaskDetailsInLeftPane (expectedTaskObject) {
    await this.validateTaskNameInHeader(expectedTaskObject)
  }

  async changeTaskStatus (statusToSet) {
    await this.webElementHandler.click(await this.taskStatusDropDown.first())
    const statusElement = await this.page.getByText(statusToSet)
    await this.webElementHandler.click(await statusElement)
  }
}

module.exports = { TaskDetailsPage }
