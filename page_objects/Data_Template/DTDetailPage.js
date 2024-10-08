const { DataTemplatePage } = require('./DataTemplatePage')

class DTDetailPage extends DataTemplatePage {
  constructor (page) {
    super(page)
    this.page = page
    this.name_TextArea = page.locator('#propertyName')
    this.description_TextArea = page.locator('#description')
    this.owners_AutoSuggest = page.locator('#autocompletes_Owner')
    this.owners_DefaultValue = page.locator('.p-autocomplete-token-label')
    this.tags_DefaultValue = page.locator('.p-autocomplete-multiple-container')
    this.id_DefaultValue = page
      .locator('.side-panel .p-field')
      .last()
      .locator('a')
      .last()
    this.dataColumnsTable = page.locator('#DataColumns tbody').first()
    this.notes_TextArea = page.getByPlaceholder('Add a note')
    this.notes_InputTextArea = page.getByPlaceholder('Type @ to mention and notify')
    this.fileLinkIcon = page.locator('.p-col-fixed')
  }

  /**
   * Builds an object containing various details from the data template detail page.
   * This method extracts information like Organization, ID, Name, Description, etc., from the page.
   * @return {Promise<Object>} An object containing details from the data template detail page.
   */
  async buildDTObjectInDetailsPage () {
    return {
      Organization: await this.organizationName_AutoSuggest_Input.inputValue(),
      ID: await this.id_AutoSuggest_Input.inputValue(),
      Name: await this.webElementHandler.getText(await this.name_TextArea),
      Description: await this.webElementHandler.getText(
        await this.description_TextArea
      ),
      Owner: await this.webElementHandler.getText(
        await this.owners_DefaultValue
      ),
      Tags: await this.webElementHandler.getAllTexts(
        await this.tags_DefaultValue
      )
      // ID: await this.webElementHandler.getText(await this.id_DefaultValue)
    }
  }

  /**
   * Constructs an object representing the data columns and example data rows from the data template detail page.
   * This method extracts information from a table structure.
   * @return {Promise<Object>} An object containing units and example data rows.
   */
  async buildDTResultsInDetailsPage () {
    const units = await this.webElementHandler.getAllTexts(
      await this.dataColumnsTable.locator('tr').first().locator('td')
    )
    const exampleDataRows = await this.webElementHandler.getAllTexts(
      await this.dataColumnsTable.locator('tr').last().locator('td')
    )
    return {
      Units: units,
      'Example Data Row': exampleDataRows
    }
  }

  /**
   * Enters notes into the notes text area.
   * This method focuses on the notes text area and fills it with the provided sample notes.
   *
   * @param {string} sampleNotes - The notes to be entered into the notes area.
   */
  async enterNotes (sampleNotes) {
    await this.webElementHandler.click(await this.notes_TextArea)
    await this.webElementHandler.fillInput(await this.notes_InputTextArea, sampleNotes)
  }

  /**
   * Saves the entered notes.
   * This method calls enterNotes to fill in the notes, and then clicks the save button to save the notes.
   *
   * @param {string} sampleNotes - The notes to be saved.
   */
  async saveNotes (sampleNotes) {
    await this.enterNotes(sampleNotes)
    await this.webElementHandler.click(await this.saveButton)
  }
}

module.exports = { DTDetailPage }
