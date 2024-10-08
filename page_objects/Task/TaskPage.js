const { expect } = require('playwright/test')
const { BasePage } = require('../Common/BasePage')
const { AllocateInventoryAndAssignLotsDialog } = require('./AllocateInventoryAndAssignLotsDialog')
const { AddPropertyQCTasksDialog } = require('./AddPropertyQCTasksDialog')
const logger = require('../../utilities/Logger')

class TaskPage extends BasePage {
  constructor (page) {
    super(page)
    this.page = page
    this.allocateInventoryDialog = new AllocateInventoryAndAssignLotsDialog(this.page)
    this.addPropertyQCTasksDialog = new AddPropertyQCTasksDialog(this.page)
    this.taskDialog_RadioBtns = page.locator()
    this.selectInventory_Input = page.locator('[id*="inventorylist_"]')
    this.searchInventory_Input = page.getByPlaceholder('Search Inventory')
    this.inventoryCheckBoxes = page.locator('[id*="dropdown_"] input')
    this.searchDataTemplate_Input = page.locator('[placeholder*="Select a Data Template"]')
    this.firstMatchingDataTemplate = page.locator('.modal-form-right-content-dropdown-view div.date')
    this.addBlock_Button = this.cancelButton = page.getByRole('button', { name: 'Add Block' })
    this.defaultValues = page.locator('.p-float-label')
    this.taskCreatePopUp = page.locator(
      "create-task-popup [role='dialog']"
    )
    this.saveCustTemplate_btn = page.getByRole('button', { name: 'Save As Template' })
    this.taskTemplateName = page.getByRole('tooltip', { name: 'Template Name * Share With' }).getByRole('textbox')
    this.aclView = page.getByText('Only selected users can view')
    this.customtemplate_btn = page.locator('.link-template')
    this.search_customtemplate=page.locator('[placeholder="Search Template"]')
    this.firstMatchingct = page.locator('.modal-form-right-content-dropdown-view div.date')
    this.taskCreatePopUpHeading =
        this.taskCreatePopUp.locator('.pn-heading')
    this.taskTabs = this.taskCreatePopUp.locator(
      "[class*='p-text-center'] div"
    )
    this.name_TextArea = page.locator("[formcontrolname='taskname']")
    this.roleListBox = '[role="listbox"]'
    this.listBox = page.locator(this.roleListBox)
    this.roles = this.listBox.locator("li[role='option']")
    this.generateRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    this.inventory_select = page.locator('.p-multiselect div')
    this.lots_AutoComplete = page.locator(
      "[id*='autocompletes_ Lots_21_0']"
    )
    this.location_AutoComplete = page.locator(
      "[id*='autocompletes_Location_58']"
    )
    this.assigned_AutoComplete = page.locator(
      "[id*='autocompletes_Assigned To']"
    )
    this.priority_AutoComplete = page.locator(
      "[id*='autocompletes_Priority']"
    )
    this.tags_AutoComplete = page.locator(
      "[id*='autocompletes_Tags_31']"
    )
    this.date_input = page.locator('#duecalendar')
    this.linked_AutoComplete = page.locator(
      "[id*='autocompletes_Linked To_59_0']"
    )
    this.notes_TextArea = page.locator('[formcontrolname="notes"]')
    this.datatemplate_AutoComplete = page.locator(
      "[id*='autocompletes_Data Template_28_0']"
    )
    this.footer_Buttons = page.locator('.group-btns button')
    this.NameTask = page.locator('#taskname')
    this.taskCreatedMessage = page.locator('app-snackbar')
    this.assignLotsLink = page.locator('.childbox-form a')
    this.assignLotsInput = page.locator('[id*="lotlist"]')
    this.searchLots = page.locator('[placeholder="Search Lots"]')
    this.parametersAdded = page.locator('.parameter-count-list')
    this.linkParameterGroup = page.getByText('Link Parameter Group')
    this.searchPGInput = page.locator('[placeholder="Search Parameter Groups"]')
    this.pgList = page.locator('.tippy-content .link-list')

    // general task
    this.taskname_Input = page.locator('[formcontrolname="taskname"]')
    this.generalradio = page.getByRole('dialog').getByText('General')
    this.batchradio = page.getByRole('dialog').getByText('Batch')
    this.propertyradio = page.getByRole('dialog').getByText('Property')
    this.taskheading = page.locator('.modal-form-right-header-heading')
    this.taskNavigationLink = page.locator('app-snackbar a u')
    this.tasknameheader = page.locator('.taskheadName')

    // linked task
    this.manuallyLinkedTaskMessage = page.getByText('Manually Linked Tasks')
    this.noManuallyLinkedTaskMessage = page.getByText('You have not linked any tasks manually yet. Click on the “Link Task” action in the top header to link tasks. ')
    this.manuallyLinkedHeader = page.locator('table th')
    this.linktask_button = page.getByRole('button', { name: ' Link Tasks ' })
    this.linktask_frame_search = page.locator('#searchtext_tasks')
  }

  async checkDialogDisplayed (taskHeader) {
    await this.page.waitForTimeout(2000)
    expect(await this.taskCreatePopUp).toHaveCount(1)
    expect(await this.taskCreatePopUpHeading.textContent()).toBe(
      taskHeader
    )
  }

  async checkTabSelected (tabSelected) {
    const attrToVerify = 'p-col cursor active ng-star-inserted'
    const tabs = await this.taskTabs.all()

    switch (tabSelected) {
      case 'Property':
        expect(await tabs[0].getAttribute('class')).toBe(attrToVerify)
        break
      case 'Batch':
        expect(await tabs[1].getAttribute('class')).toBe(attrToVerify)
        break
      case 'General':
        expect(await tabs[2].getAttribute('class')).toBe(attrToVerify)
        break
      default:
        logger.info('Nothing to verify here')
    }
  }

  async selectTaskTab (taskType) {
    if (taskType === 'Property') {
      await this.taskTabs.first().click()
      await this.page.waitForLoadState('domcontentloaded')
      logger.info(`Clicked on the ${taskType} tab sucessfully`)
    } else if (taskType === 'Batch') {
      await this.taskTabs.nth(1).click()
      await this.page.waitForLoadState('domcontentloaded')
      logger.info(`Clicked on the ${taskType} tab sucessfully`)
    } else if (taskType === 'General') {
      await this.taskTabs.last().click()
      await this.page.waitForLoadState('domcontentloaded')
      logger.info(`Clicked on the ${taskType} tab sucessfully`)
    } else {
      logger.info(`Please check the task type passed as ${taskType} is invalid`)
    }
  }

  /**
   * Enters a name into the Property description area.
   * If no name is provided, it generates a default one.
   * @async
   * @param {string} [name] - The name to enter. Optional.
   * @returns {Promise<void>}
   */
  async enterName (name) {
    await this.webElementHandler.fillInputWithType(await this.name_TextArea, name)
  }

  /**
   * Selects a inventory from an auto-complete listbox.
   * @async
   * @returns {Promise<string>} - Returns the name of the selected task.
   */
  async selectinventoryname () {
    await this.inventory_select.click()
    await this.page.waitForSelector(this.roleListBox, { timeout: 2000 })
    const roles = await this.roles.all()
    const randomIndex = Math.floor(Math.random() * roles.length)
    await roles[randomIndex].click()
    const selectedInventoryName =
      await this.inventory_select.inputValue()
    logger.info(`The inventory selected is : ${selectedInventoryName}`)
    return selectedInventoryName
  }

  /**
   * Selects a location from an auto-complete listbox.
   * @async
   * @returns {Promise<string>} - Returns the location of the selected task.
   */
  async selectlocation () {
    await this.location_AutoComplete.click()
    await this.page.waitForSelector(this.roleListBox, { timeout: 2000 })
    const roles = await this.roles.all()
    const randomIndex = Math.floor(Math.random() * roles.length)
    await roles[randomIndex].click()
    const Locationselected =
      await this.location_AutoComplete.inputValue()
    logger.info(`The location selected is : ${Locationselected}`)
    return Locationselected
  }

  /**
   * Selects task assigned to from an auto-complete listbox.
   * @async
   * @returns {Promise<string>} - Returns the assignment of  the selected task.
   */
  async selectassign () {
    await this.assigned_AutoComplete.click()
    await this.page.waitForSelector(this.roleListBox, { timeout: 2000 })
    const roles = await this.roles.all()
    const randomIndex = Math.floor(Math.random() * roles.length)
    await roles[randomIndex].click()
    const Assignselected =
      await this.assigned_AutoComplete.inputValue()
    logger.info(`The location selected is : ${Assignselected}`)
    return Assignselected
  }

  /**
   * Selects task priority to from an auto-complete listbox.
   * @async
   * @returns {Promise<string>} - Returns the priority of  the selected task.
   */
  async selectpriority () {
    await this.priority_AutoComplete.click()
    await this.page.waitForSelector(this.roleListBox, { timeout: 2000 })
    const roles = await this.roles.all()
    const randomIndex = Math.floor(Math.random() * roles.length)
    await roles[randomIndex].click()
    const selectedPriority =
      await this.priority_AutoComplete.inputValue()
    logger.info(`The location selected is : ${selectedPriority}`)
    return selectedPriority
  }

  /**
   * Selects task tags to from an auto-complete listbox.
   * @async
   * @returns {Promise<string>} - Returns the tag of  the selected task.
   */
  async selecttags () {
    await this.tags_AutoComplete.click()
    await this.page.waitForSelector(this.roleListBox, { timeout: 2000 })
    const roles = await this.roles.all()
    const randomIndex = Math.floor(Math.random() * roles.length)
    await roles[randomIndex].click()
    const Tagsselected =
      await this.tags_AutoComplete.inputValue()
    logger.info(`The location selected is : ${Tagsselected}`)
    return Tagsselected
  }

  /**
   * Enters a notes into the Property description area.
   * If no notes is provided, it generates a default one.
   * @async
   * @param {string} [notes] - The notes to enter. Optional.
   * @returns {Promise<void>}
   */
  async enterNotes (notes) {
    if (!notes) {
      notes = 'Default notes ' + new Date().toISOString()
    }
    await this.notes_TextArea.fill(notes)
  }

  /**
   * Selects task data-template from an auto-complete listbox.
   * @async
   * @returns {Promise<string>} - Returns the data-template of  the selected task.
   */
  async selectdatatemplate () {
    await this.datatemplate_AutoComplete.click()
    await this.page.waitForSelector(this.roleListBox, { timeout: 2000 })
    const roles = await this.roles.all()
    const randomIndex = Math.floor(Math.random() * roles.length)
    await roles[randomIndex].click()
    const Templateselected =
      await this.datatemplate_AutoComplete.inputValue()
    logger.info(`The location selected is : ${Templateselected}`)
    return Templateselected
  }

  /**
   * Clicks on the specified button within the footer of the Property task dialog.
   *
   * @async
   * @param {string} buttonType - The type of button to click on. This can be either "Save As Template" or "Cancel" or "Create".
   * @throws {Error} If the buttonType provided is neither "Save As Template"nor "Cancel" nor "Create".
   * @returns {Promise<void>}
   */
  async clickButton (buttonType) {
    if (buttonType === 'Save As Template') {
      await this.footer_Buttons.first().click()
      logger.info('User clicked on the Save As Template button')
    } else if (buttonType === 'Cancel') {
      await this.footer_Buttons.nth(1).click()
      logger.info('User clicked on the Cancel button')
    } else {
      await this.footer_Buttons.last().click()
      await this.page.waitForTimeout(1000)
      logger.info('User clicked on the Create button')
    }
  }

  /**
   * Validates that the Task creation was successful by checking the message displayed on the page.
   *
   * @async
   * @param {string} taskType - The type of Task being created.
   * @returns {Promise<void>}
   */
  async validateTaskCreateMessage (message) {
    const taskIDCreated = []
    const taskCreatedElement = await this.taskCreatedMessage.last()
    await this.page.waitForTimeout(3000)
    // await this.webElementHandler.waitForVisible(await taskCreatedElement)
    await this.assertionHandler.assertForTextContains(await taskCreatedElement, message)
    const hrefAttribute = await taskCreatedElement.locator('a').all()
    for (const href of hrefAttribute) {
      const taskID = await href.getAttribute('href')
      taskIDCreated.push(taskID.split('/')[2])
    }
    return taskIDCreated
  }

  /** NameTask is the expected name of the Task that should appear after the task is craeted */
  async verifyTaskNameAfterCreation (NameTask) {
    const TaskName = await this.NameTask.inputValue()
    logger.info(`Actual Task Name is : ${TaskName}`)
    logger.info(`Expected Task Name is ${NameTask}`)
    expect(TaskName).toBe(NameTask)
  }

  /**
   * Validates the common contents of the Task dialog.
   * @async
   * @returns {Promise<void>}
   */
  async validateCommonDialogContents () {
    expect(await this.page.getByText('Details')).toHaveCount(1)
    expect(await this.name_TextArea).toBeEditable()
    expect(await this.name_TextArea).toHaveCount(1)
    expect(await this.defaultValues.first().textContent()).toBe('Task Name *')

    expect(await this.location_AutoComplete).toBeEditable()
    expect(await this.location_AutoComplete).toHaveCount(1)
    expect(await this.defaultValues.nth(3).textContent()).toBe(
      '(D123) Duesseldorf, Germany'
    )
    expect(await this.assigned_AutoComplete).toBeEditable()
    expect(await this.assigned_AutoComplete).toHaveCount(1)
    expect(await this.defaultValues.nth(4).textContent()).toBe(
      'Assigned To'
    )
    expect(await this.priority_AutoComplete).toBeEditable()
    expect(await this.priority_AutoComplete).toHaveCount(1)
    expect(await this.defaultValues.nth(5).textContent()).toBe(
      'Low'
    )
    expect(await this.tags_AutoComplete).toBeEditable()
    expect(await this.tags_AutoComplete).toHaveCount(1)
    expect(await this.defaultValues.nth(6).textContent()).toBe(
      'Tags'
    )
    expect(await this.date_input).toBeEditable()
    expect(await this.date_input).toHaveCount(1)
    expect(await this.defaultValues.nth(7).textContent()).toBe('Due Date')
    expect(await this.linked_AutoComplete).toBeEditable()
    expect(await this.linked_AutoComplete).toHaveCount(1)
    expect(await this.defaultValues.nth(8).textContent()).toBe('Linked To')
    expect(await this.notes_TextArea).toBeEditable()
    expect(await this.notes_TextArea).toHaveCount(1)
    expect(await this.defaultValues.nth(9).textContent()).toBe('Notes ')

    expect(await this.footer_Buttons).toHaveCount(2)
    expect(await this.footer_Buttons.first().textContent()).toBe('Save As Template')
    expect(await this.footer_Buttons.nth(1).textContent()).toBe('Cancel')
    expect(await this.footer_Buttons.last().textContent()).toBe('Create')
    expect(await this.footer_Buttons.last().getAttribute('class')).toBe(
      'p-splitbutton-defaultbutton p-button p-component'
    )
  }

  async validateInventorySelected () {
    expect(await this.inventory_select).toBeEditable()
    expect(await this.inventory_select).toHaveCount(1)
    expect(await this.defaultValues.nth(1).textContent()).toBe(
      'Inventory*'
    )
  }

  async validateLotsSelected () {
    expect(await this.lots_AutoComplete).toBeEditable()
    expect(await this.lots_AutoComplete).toHaveCount(1)
    expect(await this.defaultValues.nth(2).textContent()).toBe(
      'Lots'
    )
  }

  async validateDataTemplate () {
    expect(await this.datatemplate_AutoComplete).toBeEditable()
    expect(await this.datatemplate_AutoComplete).toHaveCount(1)
    expect(await this.defaultValues.nth(10).textContent()).toBe('Data Template')
  }

  async searchAndSetInventories (inventories) {
    await this.webElementHandler.click(await this.selectInventory_Input)
    for (const inv of inventories) {
      await this.webElementHandler.fillInput(await this.searchInventory_Input, inv)
      const elementToClick = await this.page.locator(`[id*=${inv}_]`).first()
      await this.webElementHandler.click(await elementToClick)
    }
    await this.webElementHandler.click(await this.closeButton)
  }

  async searchAndSetDataTemplates (dataTemplates) {
    let totalDataTemplates = dataTemplates.length
    for (const dt of dataTemplates) {
      await this.webElementHandler.click(await this.searchDataTemplate_Input)
      await this.webElementHandler.fillInput(await this.searchDataTemplate_Input, dt)
      await this.webElementHandler.click(await this.firstMatchingDataTemplate.first())
      if (totalDataTemplates > 1) {
        await this.addBlock_Button.click()
        totalDataTemplates--
      }
    }
  }

  async searchAndSetLots (lotResponses) {
    await this.webElementHandler.click(await this.assignLotsLink)
    const assignLotElements = await this.assignLotsInput.all()
    const elementsAndResponses = assignLotElements.map((element, index) => ({
      element,
      lotResponse: lotResponses[index]
    }))
    for (const { element, lotResponse } of elementsAndResponses) {
      await this.webElementHandler.click(element)
      await this.webElementHandler.fillInputWithType(await this.searchLots, lotResponse.lotNumber)
      const checkbox = await this.page.locator('.tippy-box .checkbox').first()
      await this.webElementHandler.checkCheckbox(checkbox)
      await this.webElementHandler.click(await this.closeButton)
    }
  }

  async createPropertyTask (taskName, inventories, lots, dtPageObjectInstance, dataTemplates, tags, notes, parameterGroups) {
    await this.searchAndSetInventories(inventories)
    if (lots) {
      await this.searchAndSetLots(lots)
    }
    await this.searchAndSetDataTemplates(dataTemplates)
    await dtPageObjectInstance.enterTags(tags)
    await this.enterNotes(notes)
    await this.enterName(taskName)
    const createButton = await this.footer_Buttons.first()
    await this.webElementHandler.click(await createButton)

  }

<<<<<<< HEAD
  async saveCustomTemplate(taskName, inventories, lots, dtPageObjectInstance, dataTemplates, tags, notes) {
    await this.searchAndSetInventories(inventories)
    if (lots) {
      await this.searchAndSetLots(lots)
    }
    await this.searchAndSetDataTemplates(dataTemplates)
    await dtPageObjectInstance.enterTags(tags)
    await this.enterNotes(notes)
    await this.enterName(taskName)
    const saveCustomTemplateButton = await this.page.getByText('Save As Template')
    await this.webElementHandler.click(await saveCustomTemplateButton)
  }
  
=======
  async createGeneralTask (taskName, inventoriesFetched) {
    await this.searchAndSetInventories(inventoriesFetched)
    await this.enterName(taskName)
    const createButton = await this.footer_Buttons.first()
    await this.webElementHandler.click(await createButton)
  }

>>>>>>> b487d77913e9fb202970fa0224a263d722d1de09
  async fillValuesIntoParameterGroups () {
    const parametersAndValues = []
    const allParameterGroups = await this.parametersAdded.all()

    for (const pg of allParameterGroups) {
      const pgRows = await pg.locator('.row-form').all()
      for (const row of pgRows) {
        const numberOfCells = await row.locator('div.column').all()
        const enteredParam = numberOfCells.length === 2
          ? await this.handleTwoCellRow(numberOfCells)
          : await this.handleOtherRow(numberOfCells)

        if (enteredParam) {
          parametersAndValues.push(enteredParam)
        }
      }
    }

    return parametersAndValues
  }

  async handleTwoCellRow (cells) {
    const [firstCell, lastCell] = cells
    await this.webElementHandler.click(lastCell)
    const totalOptions = await this.dropdownOptions.count()

    if (totalOptions > 1) {
      const randomIndex = Math.floor(Math.random() * (totalOptions - 1)) + 1
      await this.dropdownOptions.nth(randomIndex).click()
    } else {
      logger.info('Not enough options to select from after excluding the first one.')
    }

    return {
      paramName: await this.webElementHandler.getText(firstCell),
      paramValueSet: await this.webElementHandler.getInputValue(lastCell)
    }
  }

  async handleOtherRow (cells) {
    const parameterName = await this.webElementHandler.getText(cells[0])
    let paramValueSet, paramUnit

    // Enter a random value in the value field if it exists
    if (cells.length > 1) {
      const randValue = (Math.random() * 9 + 1).toFixed(2) // Generates a random number between 1.00 and 9.99
      await this.webElementHandler.fillInput(await cells[1].locator('input'), randValue)
      paramValueSet = randValue
    }

    // If there's a unit or dropdown to be selected, handle that
    if (cells.length > 2) {
      const lastCell = cells[cells.length - 1]
      await this.webElementHandler.click(await lastCell)
      await this.waitForDuration(3)
      // await this.webElementHandler.waitForVisible(await this.listBox)
      const totalOptions = await this.dropdownOptions.all()
      const totalOptionsLength = totalOptions.length

      if (totalOptionsLength > 0) { // Adjust this check to allow selection from all options
        const randomIndex = Math.floor(Math.random() * totalOptionsLength) // Adjusted to include all options
        const dropDownOptionToClick = await this.dropdownOptions.nth(randomIndex)
        await this.webElementHandler.click(await dropDownOptionToClick)
        paramUnit = await this.webElementHandler.getText(await dropDownOptionToClick)
      } else {
        logger.info('No parameter unit options available to select from.')
      }
    }

    // Construct and return the parameter object
    const enteredParam = { paramName: parameterName, paramValueSet }
    if (paramUnit) {
      enteredParam.paramUnit = paramUnit // Add the unit if it was set
    }

    return enteredParam
  }

  async addParameterGroups (parameterGroups) {
    for (const group of parameterGroups) {
      await this.webElementHandler.click(await this.linkParameterGroup)
      await this.webElementHandler.fillInput(await this.searchPGInput, group.name)
      await this.waitForDuration(1)
      await this.webElementHandler.click(await this.pgList.first())
    }
  }

  async addPGAndSetValues (parameterGroups) {
    await this.addParameterGroups(parameterGroups)
    return await this.fillValuesIntoParameterGroups()
  }

  async searchAndSetcustemplates (dataTemplates) {
    for (const dt of dataTemplates) {
      await this.webElementHandler.click(await this.search_customtemplate)
      await this.webElementHandler.fillInput(await this.search_customtemplate, dt)
      await this.webElementHandler.click(await this.firstMatchingct.first())
      // await this.webElementHandler.click(await elementToClick)
    }

    await this.webElementHandler.click(await this.closeButton)
  }

  async addGeneralTask (taskName, inventoriesFetched, tags, dtPageObjectInstance) {
    await this.searchAndSetInventories(inventoriesFetched)
    await dtPageObjectInstance.enterTags(tags)
    await this.enterName(taskName)
    const createButton = await this.footer_Buttons.first()
    await this.webElementHandler.click(await createButton)
  }
}

module.exports = { TaskPage }
