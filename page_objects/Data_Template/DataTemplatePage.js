const { BasePage } = require('../Common/BasePage')
const { expect } = require('@playwright/test')

class DataTemplatePage extends BasePage {
  constructor (page) {
    super(page)
    this.page = page
    this.organizationName_AutoSuggest_Input = page.locator(
      '[id*="autocompletes_Organization"]'
    )
    this.id_AutoSuggest_Input = page.locator('[id*="autocompletes_ID_"]')
    this.owner_AutoSuggest_Input = page.locator('[id*="autocompletes_Owner"]')
    this.tags_AutoSuggest_Input = page.locator('[id*="autocompletes_Tags"]')
    this.tagsDropDown = page.locator("[label='Tags'] ul input")
    this.addTagDialog_Header = page.getByRole('heading', {
      name: 'Are you sure?'
    })
    this.addTagDialog_Paragraph = page.locator('.p-dialog-content p')
    this.addTagDialog_Add_Button = page.getByRole('button', { name: 'Add' })
    this.descriptionTextArea = page.locator('textarea')
    this.addResults_Button = page.getByRole('button', {
      name: 'Add New Result'
    })
    this.add_Button = page.getByRole('button', { name: 'Add' })
    this.addNewResult_Button = page.getByRole('button', {
      name: 'Add New Result'
    })
    this.addResults_AutoSuggest_Input = page.locator(
      '[id*="autocompletes_Results_"]'
    )
    this.addUnits_AutoSuggest_Input = page.locator(
      '[id*="autocompletes_Unit_"]'
    )
    this.addUnitsCells = page.locator('#addUnits')
    this.nameInDetailsPage = page.locator('#propertyName')
    this.descriptionInDetailsPage = page.locator('#description')
  }

  async enterName (name) {
    const nameElement = await this.nameInput
    await this.webElementHandler.fillInput(await nameElement, name)
  }

  async enterOrganizationName (orgName) {
    const organizationElement = await this.organizationName_AutoSuggest_Input
    await this.webElementHandler.fillInput(await organizationElement, orgName)
    const orgToSelect = await this.page
      .locator('#p-highlighted-option')
      .getByText(orgName)
    await this.webElementHandler.click(orgToSelect)
  }

  async enterID (idToEnter) {
    const idElement = await this.id_AutoSuggest_Input
    await this.webElementHandler.fillInput(await idElement, idToEnter)
    const idToSelect = await this.page.getByText(idToEnter)
    await this.webElementHandler.click(idToSelect)
  }

  async enterDescription (description) {
    const descriptionElement = await this.descriptionTextArea
    await this.webElementHandler.fillInput(
      await descriptionElement,
      description
    )
  }

  async enterTags (tagsList) {
    for (let i = 0; i < tagsList.length; i++) {
      await this.page.waitForTimeout(500)
      await this.webElementHandler.fillInputWithoutClear(
        await this.tagsDropDown,
        tagsList[i]
      )

      const firstListedTag = await this.webElementHandler.getText(
        await this.optionsList.first()
      )

      if (firstListedTag === tagsList[i]) {
        // Click on the first tag if it matches
        await this.webElementHandler.click(await this.optionsList.first())
      } else {
        // Scroll down the list and add a new tag if it doesn't match
        await this.webElementHandler.scrollDownListEntirely(
          await this.optionsList
        )
        await this.page.waitForTimeout(500)
        await this.webElementHandler.click(await this.optionsList.last())
        await this.page.waitForTimeout(500)
        await this.webElementHandler.click(await this.add_Button)
      }
    }
  }

  async validateEditDataTemplateDialog (dialogHeader, dtNameCreated) {
    await this.validateDialogDisplayed(dialogHeader)
    expect(
      await this.webElementHandler.waitForVisible(
        await this.add_new_result_Button
      )
    ).toBeTruthy()
    expect(await this.page.getByText(dtNameCreated)).toHaveCount(1)
    expect(
      await this.webElementHandler.waitForVisible(await this.cancelButton)
    ).toBeTruthy()
    expect(
      await this.webElementHandler.waitForVisible(await this.saveButton)
    ).toBeTruthy()
    const funcBar = await this.dialog.locator("[class*='-viewformula']")
    expect(await funcBar).toHaveCount(1)
    expect(await funcBar.locator('input')).toHaveText('')
  }

  async addNewResult (resultsToAdd) {
    const results = resultsToAdd.split(',').map((item) => item.trim())
    await this.webElementHandler.click(await this.addNewResult_Button)
    for (const result of results) {
      await this.page.waitForTimeout(500)
      await this.webElementHandler.fillInputWithoutClear(
        await this.addResults_AutoSuggest_Input,
        result
      )
      const itemElement = await this.page.getByText(result).first()
      const itemText = await this.webElementHandler.getText(await itemElement)
      if (itemText.trim() === result) {
        await this.webElementHandler.click(await itemElement)
      } else {
        await this.webElementHandler.scrollDownListEntirely(
          await this.optionsList
        )
        await this.page.waitForTimeout(500)
        await this.webElementHandler.click(await this.addNew)
        await this.page.waitForTimeout(500)
      }
    }
    await this.webElementHandler.click(await this.saveButton.last())
  }

  async addUnits (units) {
    await this.page.waitForTimeout(2000)
    const unitsArray = units.split(',')
    const allUnitCells = await this.addUnitsCells.all()
    const addUnitsInput = await this.addUnits_AutoSuggest_Input
    const saveButtonElement = await this.saveButton.last()
    for (let i = 0; i < unitsArray.length; i++) {
      const unitCellToClick = await allUnitCells[i]
      const unitToFill = unitsArray[i]
      await this.page.waitForTimeout(500)
      await this.webElementHandler.click(await unitCellToClick)
      await this.webElementHandler.click(await addUnitsInput)
      await this.webElementHandler.fillInputWithoutClear(
        await addUnitsInput,
        unitToFill
      )
      const actualElementToClick = await this.page.getByText(unitToFill).first()
      const unitTextFetchedFromUI = await this.webElementHandler.getText(
        await actualElementToClick
      )
      if (unitTextFetchedFromUI.includes(unitToFill)) {
        await this.webElementHandler.click(await actualElementToClick)
      } else {
        await this.webElementHandler.scrollDownListEntirely(
          await this.optionsList
        )
        await this.page.waitForTimeout(500)
        await this.webElementHandler.click(await this.addNew)
        await this.page.waitForTimeout(500)
        await this.webElementHandler.click(await this.add_Button.last())
      }
      await this.webElementHandler.click(await saveButtonElement)
    }
  }

  async validateUnitsDialog (dialogHeader) {
    await this.validateDialogDisplayed(dialogHeader)
    expect(
      await this.webElementHandler.waitForVisible(
        await this.cancelButton.last()
      )
    ).toBeTruthy()
    expect(
      await this.webElementHandler.waitForVisible(await this.closeButton.last())
    ).toBeTruthy()
  }

  async addExampleDataRows (dataRows) {
    const dataRowsArray = dataRows.split(',')
    const exampleDataRow = await this.dialog
      .locator('tbody')
      .first()
      .locator('tr:nth-of-type(2)')
    const allExampleDataRowCells = await exampleDataRow.locator('td').all()
    const editableExampleDataRowCells = allExampleDataRowCells.slice(1)
    for (let i = 0; i < dataRowsArray.length; i++) {
      await this.webElementHandler.doubleClick(
        await editableExampleDataRowCells[i]
      )
      await this.webElementHandler.fillInput(
        await this.page.locator('textarea').last(),
        dataRowsArray[i]
      )
    }
  }
}

module.exports = { DataTemplatePage }
