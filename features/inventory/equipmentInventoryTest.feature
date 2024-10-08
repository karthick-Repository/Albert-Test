Feature: CRUD test for an inventory of type Equipment

  @smoke_tests
  Scenario: User must be able to create a new equipment inventory
    When User waits for 2 seconds
    * I click on the "Create" button
    * I click on "Inventory" menu option
    * I click on "Equipment"
    * I set the name of the "Inventory"
    * I set "1" "existing" "companies"
    * I set the alias name of the Inventory
    * I set "Units" as inventory tracking
    * I set the description of the "Inventory"
    * I click on the "Create" button to add new sheet
    * User waits for 2 seconds
    * I fetch the code of the inventory I just created
    * I validate that the "equipment" inventory is "created" with the right details passed
    When I goto the "inventory" list page
    * I search for the inventory I just "created"
    Then I validate that the inventory is "created" successfully

  @smoke_tests
  Scenario: User must be able to edit the details of a equipment inventory
    Given I goto the details page of the inventory I created
    When I click on the name of the inventory in the details page
    Then I validate that "Are you sure?" dialog is displayed
    * I validate that "You would like to change the name of this Equipment? This will change this Equipment name globally and may cause inconsistencies with labels. If you would like to add an alternative name, please add to the description." is displayed as the dialog content
    When I click on the "Yes" button
    * I edit the name of the Inventory
    * I edit the manufacturer of the Inventory
    * I edit the alias name of the Inventory
    * I edit the description of the Inventory
    * I set "3" "existing" tags
    * I set "Units" as inventory tracking
    * I set the product code
    Then I validate that the "equipment" inventory is "edited" with the right details passed
    When I goto the "inventory" list page
    * I search for the inventory I just "edited"
    Then I validate that the inventory is "edited" successfully

  @smoke_tests
  Scenario: User should be able to delete equipment inventories only via backend services
    When I delete the Inventory
