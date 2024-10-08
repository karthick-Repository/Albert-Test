const { expect } = require('playwright/test')
const { BasePage } = require('../Common/BasePage')
const { Grids } = require('../Common/Grids')
const logger = require('../../utilities/Logger')

class ProjectPage extends BasePage {
  constructor (page) {
    super(page)
    this.page = page
    this.grid = new Grids(this.page)
    this.defaultValues = page.locator('.p-float-label')
    this.projectCreatePopUp = page.locator(
      "create-project-popup [role='dialog']"
    )
    this.projectCreatePopUpHeading =
      this.projectCreatePopUp.locator('.pn-heading')
    this.prefixProjectCreation_Autocomplete = page.locator(
      "[id='autocompletes_Prefix in Project Creation']"
    )
    this.name_textarea = page.locator('[formcontrolname="description"]')
    this.segment_input = page.locator('[formcontrolname="segment"]')
    this.application_AutoComplete = page.locator(
      "[id*='autocompletes_Application_']"
    )
    this.application_CloseIcons = page.locator('//app-application//span[contains(@class, "p-autocomplete-token-icon")]')
    this.technology_AutoComplete = page.locator(
      "[id*='autocompletes_Technology_']"
    )
    this.technology_CloseIcons = page.locator('//app-technology//span[contains(@class, "p-autocomplete-token-icon")]')
    // eslint-disable-next-line sonarjs/no-duplicate-string
    this.listBox = page.locator("[role='listbox']")
    this.roles = this.listBox.locator("li[role='option']")
    this.generateRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    this.ADP_input = page.locator('[formcontrolname="adpNumber"]')
    this.footer_Buttons = page.locator('.p-dialog-footer button')
    this.prName = page.locator('#createdescription')
    this.customerMarketSegment_Input_DetailsPage = page.locator('[formcontrolname="segment"]')
    this.location_DetailsPage = page.locator('app-location li span')
    this.application_DetailsPage = page.locator('app-application li span.p-autocomplete-token-label')
    this.technology_DetailsPage = page.locator('app-technology li span.p-autocomplete-token-label')
    this.adpNumber_DetailsPage = page.locator('[formcontrolname="adpNumber"]')
    this.statusDropDown = page.locator('p-dropdown .p-dropdown-trigger')
  }

  async checkDialogDisplayed (projectHeader) {
    await this.page.waitForTimeout(2000)
    expect(await this.projectCreatePopUp).toHaveCount(1)
    expect(await this.projectCreatePopUpHeading.textContent()).toBe(
      projectHeader
    )
  }

  /**
   * Enters the prefix for project creation into the pop-up dialog.
   * @async
   * @param {string} [prefix] - The prefix to enter. Select any one.
   * @returns {Promise<void>}
   */
  async selectprefix (prefix) {
    await this.webElement
    await this.prefixProjectCreation_Autocomplete.click()
    await this.page.getByRole('option', { name: 'MO (External)' }).click()
  }

  /**
   * Enters the name into the pop-up dialog.
   * If no name is provided, it generates a default one.
   * @async
   * @param {string} [name] - The name to enter. Optional.
   * @returns {Promise<void>}
   */
  async enterName (name) {
    await this.webElementHandler.fillInput(await this.name_textarea, name)
  }

  /**
   * Enters a customer/market segment into the pop-up dialog.
   * @async
   * @param {string} segment - The customer segment to enter.
   * @returns {Promise<void>}
   */
  async enterSegment (segment) {
    await this.webElementHandler.fillInput(await this.segment_input, segment)
  }

  /**
   * Enters a ADP Number into the pop-up dialog.
   * @async
   * @param {int} ADP - The ADP number to enter.
   * @returns {Promise<void>}
   */
  async enterADP_Number (adp) {
    await this.webElementHandler.fillInput(await this.ADP_input, adp)
  }

  /**
   * Selects a Application from an auto-complete listbox.
   * @async
   * @returns {Promise<string>} - Returns the name of the selected application.
   */
  async enterApplication () {
    await this.webElementHandler.click()
    await this.application_AutoComplete.click()
    await this.page.waitForSelector("[role='listbox']", { timeout: 2000 })
    const roles = await this.roles.all()
    const randomIndex = Math.floor(Math.random() * roles.length)
    await roles[randomIndex].click()
    const selectedApplication =
      await this.application_AutoComplete.inputValue()
    logger.info(`The application selected is : ${selectedApplication}`)
    return selectedApplication
  }

  async setMultipleValuesInAutoSelect (itemToSetArray, autoSelectElement) {
    for (const item of itemToSetArray) {
      await this.page.waitForTimeout(1000)
      await this.webElementHandler.fillInputWithoutClear(
        await autoSelectElement,
        item
      )
      const firstApplicaction = await this.webElementHandler.getText(
        await this.optionsList.first()
      )
      if (firstApplicaction === item) {
        await this.webElementHandler.click(await this.optionsList.first())
      } else {
        await this.webElementHandler.scrollDownListEntirely(
          await this.optionsList
        )
        await this.page.waitForTimeout(500)
        await this.webElementHandler.click(await this.optionsList.last())
        await this.page.waitForTimeout(500)
        await this.webElementHandler.click(await this.addNew)
      }
    }
  }

  /**
   * Selects a Technology from an auto-complete listbox.
   * @async
   * @returns {Promise<string>} - Returns the name of the selected technology.
   */
  async enterTechnology () {
    await this.technology_AutoComplete.click()
    await this.page.waitForSelector("[role='listbox']", { timeout: 2000 })
    const roles = await this.roles.all()
    const randomIndex = Math.floor(Math.random() * roles.length)
    await roles[randomIndex].click()
    const selectedTechnology = await this.technology_AutoComplete.inputValue()
    logger.info(`The technology selected is : ${selectedTechnology}`)
    return selectedTechnology
  }

  /**
   * Clicks on the specified button within the footer of the pop-up dialog dialog.
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

  async validateProjectCreateMessage () {
    await this.page.waitForTimeout(1000)
    const message = 'Project Created Successfully'
    expect(await this.page.locator('.cdk-overlay-container')).toContainText(
      message
    )
  }

  async verifyProjectNameAfterCreation (prName) {
    const projectName = await this.prName.inputValue()
    logger.info(`Actual Project Name is : ${projectName}`)
    logger.info(`Expected Project Name is ${prName}`)
    expect(projectName).toBe(prName)
  }

  /**
   * Validates the contents of the Project pop-up dialog.
   * @async
   * @returns {Promise<void>}
   */
  async validateProjectDialogContents () {
    expect(await this.name_textarea).toBeEditable()
    expect(await this.name_textarea).toHaveCount(1)
    expect(await this.defaultValues.nth(1).textContent()).toBe('Name *')
    expect(await this.segment_input).toBeEditable()
    expect(await this.segment_input).toHaveCount(1)
    expect(await this.defaultValues.nth(2).textContent()).toBe(
      'Customer / Market Segment '
    )
    expect(await this.application_AutoComplete).toBeEditable()
    expect(await this.application_AutoComplete).toHaveCount(1)
    expect(await this.defaultValues.nth(3).textContent()).toBe('Application')
    expect(await this.technology_AutoComplete).toBeEditable()
    expect(await this.technology_AutoComplete).toHaveCount(1)
    expect(await this.defaultValues.nth(4).textContent()).toBe('Technology')
    expect(await this.ADP_input).toBeEditable()
    expect(await this.ADP_input).toHaveCount(1)
    expect(await this.defaultValues.last().textContent()).toBe('ADP Number')
  }

  /**
   * Creates a new Project entry using pre-filled data.
   * The function will:
   * 1. Enter a generated name or use provided one.
   * 2. Enter a Customer/ Market segment.
   * 3. Select a aplication.
   * 4. Select a technology.
   * 5. Enter a ADP number.
   * 6. Click the 'Create' button.
   *
   * @async
   * @returns {Promise<Object>} An object containing the project prefix in project creation (`pre`),
   * name (`prName`), customer/marker segment (`seg`), application (`app`), technology (`tech`) and ,
   *  ADPnumber (`ADPN0.`)
   */
  async createProjectPageWithPreFilledData () {
    const prefix = await this.selectprefix()
    const name = await this.enterName()
    const cust_seg = await this.enterSegment()
    const application = await this.enterApplication()
    const technology = await this.enterTechnology()
    const ADPnumber = await this.enterADP_Number
    return {
      pre: prefix,
      prName: name,
      seg: cust_seg,
      app: application,
      tech: technology,
      ADPN0: ADPnumber
    }
  }

  async deleteDetails (typeOfDetail) {
    const closeIconCount = typeOfDetail === 'Applications' ? await this.application_CloseIcons.count() : await this.technology_CloseIcons.count()
    for (let i = 0; i <= closeIconCount - 1; i++) {
      await this.application_AutoComplete.click()
      await this.application_AutoComplete.press('Backspace')
    }
  }
}
module.exports = { ProjectPage }
