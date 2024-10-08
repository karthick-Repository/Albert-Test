const { BasePage } = require('../Common/BasePage')

class ParameterGroupsPage extends BasePage {
  constructor (page) {
    super(page)
    this.page = page
    this.parameters_AutoComplete = page.locator('[id*="autocompletes_Parameters"]')
    this.template_AutoComplete = page.locator('[id*="autocompletes_Select"]')
    this.formulas_AutoComplete = page.locator('[id*="autocompletes_Formulas"]')
    this.equipment_AutoComplete = page.locator('[id*="autocompletes_Equipment"]')
    this.consumables_AutoComplete = page.locator('[id*="autocompletes_Consumables"]')
    this.rawMaterials_AutoComplete = page.locator('[id*="autocompletes_RawMaterials"]')
    this.type_LeftContainer = page.locator('[class="text-content ng-star-inserted"]')
    this.name_LeftContainer = page.locator('.mat-drawer-inner-container .p-field textarea').first()
    this.description_LeftContainer = page.locator('.mat-drawer-inner-container .p-field textarea').last()
    this.owners_LeftContainer = page.locator('.mat-drawer-inner-container .p-field p-autocomplete').first()
    this.owners_LeftContainer_Selected = this.owners_LeftContainer.locator('li.p-autocomplete-token')
    this.tags_LeftContainer = page.locator('.mat-drawer-inner-container .p-field p-autocomplete').last()
    this.tags_LeftContainer_Selected = this.tags_LeftContainer.locator('li.p-autocomplete-token')
  }
}

module.exports = { ParameterGroupsPage }
