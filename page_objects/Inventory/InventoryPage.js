const { expect } = require('playwright/test')
const { BasePage } = require('../Common/BasePage')
const { Grids } = require('../Common/Grids')
const logger = require('../../utilities/Logger')

class InventoryPage extends BasePage {
  constructor (page) {
    super(page)
    this.page = page
    this.grid = new Grids(this.page)
    this.sdsFileUpload_Input = page.locator('#fileUpload')
    this.defaultValues = page.locator('.p-float-label')
    this.inventoryCreatePopUp = page.locator(
      "inventory-create-popup [role='dialog']"
    )
    this.inventoryCreatePopUpHeading =
      this.inventoryCreatePopUp.locator('.pn-heading')
    this.inventoryTabs = this.inventoryCreatePopUp.locator(
      "[class*='p-text-center'] div"
    )
    this.manufacturer_AutoComplete = page.locator(
      "[id*='autocompletes_Manufacturer_']"
    )
    this.alias_Input = page.locator('#alias')
    this.listBox = page.locator("[role='listbox']")
    this.roles = this.listBox.locator("li[role='option']")
    this.description_TextArea = page.locator("[formcontrolname='description']")
    this.footer_Buttons = page.locator('.p-dialog-footer button')
    this.generateRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    this.inventoryTrackingUnits = page.locator('.p-field-radiobutton')
    this.inventoryTrackingUnitsRadioBtn =
      this.inventoryTrackingUnits.locator('.p-radiobutton')
    this.inventoryTrackingUnitsRadioLabels =
      this.inventoryTrackingUnits.locator('label')
    this.invName = page.locator('#inventoryName')
    this.rnsInput = page.locator('#rsnNumber')
    this.rnseInput = page.locator('#rsneNumber')
    this.idhAutoComplete_MultiSelect = page.locator('[id*="autocompletes_IDH_"]')
    this.productCode_Input = page.locator('#productCode')
    this.tagsValuesSet = page.locator('[label="Tags"] ul span.p-autocomplete-token-label')
    this.idhValuesSet = page.locator('[labl="IDH"] ul span.p-autocomplete-token-label')
    this.inventoryTrackingSet = page.locator('p-radiobutton div.p-radiobutton-checked input')
    this.unitsRadio = page.locator('.p-radiobutton').first()
    this.massRadio = page.locator('.p-radiobutton').last()
  }

  /**
   * Uploads an SDS file.
   * @async
   * @returns {Promise<void>}
   */
  async uploadSDS () {
    await this.sdsFileUpload_Input.setInputFiles(
      // eslint-disable-next-line no-undef
      path.join('features/inventory/sds_files/', 'automation_sample_sds.pdf')
    )
  }

  async checkTabSelected (tabSelected) {
    const attrToVerify = 'p-col cursor active ng-star-inserted'
    const tabs = await this.inventoryTabs.all()

    switch (tabSelected) {
      case 'Raw Material':
        expect(await tabs[0].getAttribute('class')).toBe(attrToVerify)
        break
      case 'Consumable':
        expect(await tabs[1].getAttribute('class')).toBe(attrToVerify)
        break
      case 'Equipment':
        expect(await tabs[2].getAttribute('class')).toBe(attrToVerify)
        break
      default:
        logger.info('Nothing to verify here')
    }
  }

  async checkDialogDisplayed (inventoryHeader) {
    await this.page.waitForTimeout(2000)
    expect(await this.inventoryCreatePopUp).toHaveCount(1)
    expect(await this.inventoryCreatePopUpHeading.textContent()).toBe(
      inventoryHeader
    )
  }

  async selectInventoryTab (invType) {
    if (invType === 'Raw Material') {
      await this.inventoryTabs.first().click()
      await this.page.waitForLoadState('domcontentloaded')
      logger.info(`Clicked on the ${invType} tab sucessfully`)
    } else if (invType === 'Consumable') {
      await this.inventoryTabs.nth(1).click()
      await this.page.waitForLoadState('domcontentloaded')
      logger.info(`Clicked on the ${invType} tab sucessfully`)
    } else if (invType === 'Equipment') {
      await this.inventoryTabs.last().click()
      await this.page.waitForLoadState('domcont entloaded')
      logger.info(`Clicked on the ${invType} tab sucessfully`)
    } else {
      logger.info(
        `Please check the inventory type passed as ${invType} is invalid`
      )
    }
  }

  /**
   * Enters a name into the Raw Material name input.
   * @async
   * @param {string} name - The name to enter.
   * @returns {Promise<void>}
   */
  async enterName (name) {
    if (!name) {
      name = 'Test Automation Inventory ' + this.generateRandomNumber(1, 99999)
    }
    logger.info(`Entered raw material inventory name : ${name}`)
    await this.name_Input.type(name, { delay: 50 })
    return name
  }

  /**
   * Enters a description into the Raw Material description area.
   * If no description is provided, it generates a default one.
   * @async
   * @param {string} [description] - The description to enter. Optional.
   * @returns {Promise<void>}
   */
  async enterDescription (description) {
    if (!description) {
      description = 'Default Description ' + new Date().toISOString()
    }
    await this.description_TextArea.fill(description)
    logger.info(`Entered the description: ${description}`)
  }

  /**
   * Selects a manufacturer from an auto-complete listbox.
   * @async
   * @returns {Promise<string>} - Returns the name of the selected manufacturer.
   */
  async enterManufacturer () {
    await this.manufacturer_AutoComplete.click()
    await this.page.waitForSelector("[role='listbox']", { timeout: 2000 })
    const roles = await this.roles.all()
    const randomIndex = Math.floor(Math.random() * roles.length)
    await roles[randomIndex].click()
    const selectedManufacturer =
      await this.manufacturer_AutoComplete.inputValue()
    logger.info(`The manufacturer selected is : ${selectedManufacturer}`)
    return selectedManufacturer
  }

  /**
   * Clicks on the specified radio button within the Consumable Inventory dialog.
   *
   * @async
   * @param {string} buttonType - The type of radiobutton to click on. This can be either "Mass" or "Units".
   * @throws {Error} If the buttonType provided is neither "Mass" nor "Units".
   * @returns {Promise<void>}
   */
  async selectInventoryUnit (radiobuttonType) {
    if (radiobuttonType === 'Mass') {
      await this.inventoryTrackingUnitsRadioBtn.first().click()
      logger.info('User selected Mass radio button')
    } else {
      await this.inventoryTrackingUnitsRadioBtn.last().click()
      logger.info('User selected Units radio button')
    }
  }

  /**
   * Clicks on the specified button within the footer of the Raw Material Inventory dialog.
   *
   * @async
   * @param {string} buttonType - The type of button to click on. This can be either "Cancel" or "Create".
   * @throws {Error} If the buttonType provided is neither "Cancel" nor "Create".
   * @returns {Promise<void>}
   */
  async clickButton (buttonType) {
    if (buttonType === 'Cancel') {
      await this.footer_Buttons.first().click()
      logger.info('User clicked on the Cancel button')
    } else {
      await this.footer_Buttons.last().click()
      await this.page.waitForTimeout(1000)
      logger.info('User clicked on the Create button')
    }
  }

  /**
   * Validates that the Inventory creation was successful by checking the message displayed on the page.
   *
   * @async
   * @param {string} inventoryType - The type of inventory being created.
   * @returns {Promise<void>}
   */
  async validateInventoryCreateMessage (inventoryType) {
    await this.page.waitForTimeout(1000)
    const message = inventoryType + ' Created Successfully'
    expect(await this.page.locator('.cdk-overlay-container')).toContainText(
      message
    )
  }

  async verifyInventoryNameAfterCreation (invName) {
    const inventoryName = await this.invName.inputValue()
    logger.info(`Actual Inventory Name is : ${inventoryName}`)
    logger.info(`Expected Inventory Name is ${invName}`)
    expect(inventoryName).toBe(invName)
  }

  /**
   * Validates the contents of the Raw Material dialog.
   * @async
   * @returns {Promise<void>}
   */
  async validateCommonDialogContents () {
    expect(await this.page.getByText('Details')).toHaveCount(1)
    expect(await this.name_Input).toBeEditable()
    expect(await this.name_Input).toHaveCount(1)
    expect(await this.defaultValues.first().textContent()).toBe('Name *')
    expect(await this.manufacturer_AutoComplete).toBeEditable()
    expect(await this.manufacturer_AutoComplete).toHaveCount(1)
    expect(await this.defaultValues.nth(1).textContent()).toBe(
      'Manufacturer *'
    )
    expect(await this.description_TextArea).toBeEditable()
    expect(await this.description_TextArea).toHaveCount(1)
    expect(await this.defaultValues.nth(2).textContent()).toBe('Description ')
    expect(await this.footer_Buttons).toHaveCount(2)
    expect(await this.footer_Buttons.first().textContent()).toBe('Cancel')
    expect(await this.footer_Buttons.last().textContent()).toBe('Create')
    expect(await this.footer_Buttons.last().getAttribute('class')).toBe(
      'p-button p-component p-disabled p-ripple'
    )
  }

  async validateRadioButtons () {
    expect(await this.inventoryTrackingUnitsRadioBtn.first()).toBeEditable()
    expect(await this.inventoryTrackingUnitsRadioBtn.last()).toBeEditable()
    expect(await this.inventoryTrackingUnitsRadioBtn).toHaveCount(2)
    expect(
      await this.inventoryTrackingUnitsRadioLabels.allTextContents()
    ).toMatchObject(['Mass', 'Units'])
  }

  async validateSDSUpload () {
    expect(await this.page.getByText('SDS Upload')).toHaveCount(1)
    expect(await this.sdsFileUpload_Input).toBeEditable()
    expect(await this.sdsFileUpload_Input).toHaveCount(1)
    expect(await this.defaultValues.last().textContent()).toBe('Upload SDS')
  }

  async setManufacturer (company) {
    await this.page.waitForTimeout(500)
    await this.webElementHandler.fillInputWithoutClear(
      await this.manufacturer_AutoComplete,
      company
    )

    const firstListedOption = await this.webElementHandler.getText(
      await this.optionsList.first()
    )
    await this.page.waitForTimeout(500)
    if (firstListedOption === company) {
      await this.webElementHandler.click(await this.optionsList.first())
    } else {
      await this.webElementHandler.scrollDownListEntirely(
        await this.optionsList
      )
      await this.page.waitForTimeout(500)
      await this.webElementHandler.click(await this.optionsList.last())
      await this.page.waitForTimeout(500)
      await this.webElementHandler.click(await this.addNew)
      await this.webElementHandler.click(await this.addButton)
    }
  }
}

module.exports = { InventoryPage }
