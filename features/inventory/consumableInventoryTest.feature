Feature: CRUD test for an inventory of type Consumable

  @smoke_tests
  Scenario: User must be able to create, edit & delete a new consumable inventory
    When User waits for 2 seconds
    * I click on the "Create" button
    * I click on "Inventory" menu option
    * I click on "Consumable"
    * I set the name of the "Inventory"
    * I set "1" "existing" "companies"
    * I set the alias name of the Inventory
    * I set "Units" as inventory tracking
    * I set the description of the "Inventory"
    * I click on the "Create" button to add new sheet
    * User waits for 2 seconds
    * I fetch the code of the inventory I just created
    Then I validate that the "inventory" details page is displayed
    # * I validate that the "consumable" inventory is "created" with the right details passed
    # When I goto the "inventory" list page
    # * I search for the inventory I just "created"
    # Then I validate that the inventory is "created" successfully
    # When I goto the details page of the inventory I created
    # * I click on the name of the inventory in the details page
    # Then I validate that "Are you sure?" dialog is displayed
    # * I validate that "You would like to change the name of this Consumable? This will change this Consumable name globally and may cause inconsistencies with labels. If you would like to add an alternative name, please add to the description." is displayed as the dialog content
    # When I click on the "Yes" button
    # * I edit the name of the Inventory
    # * I edit the manufacturer of the Inventory
    # * I edit the alias name of the Inventory
    # * I edit the description of the Inventory
    # * I set "3" "existing" tags
    # * I edit the RSN value
    # * I edit the RSNe value
    # * I set "3" "existing" "lists" with category "IDH"
    # * I set "Mass" as inventory tracking
    # * I set the product code
    # Then I validate that the "consumable" inventory is "edited" with the right details passed
    # When I goto the "inventory" list page
    # * I search for the inventory I just "edited"
    # Then I validate that the inventory is "edited" successfully
    Then I delete the Inventory
