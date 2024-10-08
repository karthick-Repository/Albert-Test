Feature: CRUD test for a parameter group of type Property

  @smoke_tests
  Scenario: User must be able to create a property parameter group
    When User waits for 2 seconds
    * I click on the "Create" button
    * I click on "Parameter Group" menu option
    * I set the name of the "Property PG"
    * I validate that "App Store" is the default owner
    * I set "3" "existing" tags
    * I set the description of the "Parameter Group"
    * I set "Template, Formulas, Equipment, Consumables, Raw Materials" as parameters
    # * I click on the "Create" button to add new sheet
    # * User waits for 2 seconds
    # * I fetch the code of the inventory I just created
    # Then I validate that the "inventory" details page is displayed
    # * I validate that the "consumable" inventory is "created" with the right details passed
    # When I goto the "inventory" list page
    # * I search for the inventory I just "created"
    # Then I validate that the inventory is "created" successfully
