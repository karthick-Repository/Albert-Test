Feature: CRUD test for an inventory of type Raw Material

  @smoke_tests
  Scenario: User must be able to create a new raw material inventory
    When User waits for 2 seconds
    * I click on the "Create" button
    * I click on "Inventory" menu option
    * I set the name of the "Inventory"
    * I set "1" "existing" "companies"
    * I set the alias name of the Inventory
    * I set the description of the "Inventory"
    * I click on the "Create" button
    * User waits for 2 seconds
    * I fetch the code of the inventory I just created
    Then I validate that the "inventory" details page is displayed
    * I validate that the "raw material" inventory is "created" with the right details passed
    When I goto the "inventory" list page
    * I search for the inventory I just "created"
    Then I validate that the inventory is "created" successfully

  @smoke_tests
  Scenario: User must be able to edit the details of a raw material inventory
    Given I goto the details page of the inventory I created
    When I click on the name of the inventory in the details page
    Then I validate that "Are you sure?" dialog is displayed
    * I validate that "You would like to change the name of this Raw Material? This will change this Raw Material name globally and may cause inconsistencies with labels. If you would like to add an alternative name, please add to the description." is displayed as the dialog content
    When I click on the "Yes" button
    * I edit the name of the Inventory
    * I edit the manufacturer of the Inventory
    * I edit the alias name of the Inventory
    * I edit the description of the Inventory
    * I set "3" "existing" tags
    * I edit the RSN value
    * I edit the RSNe value
    * I set "3" "existing" "lists" with category "IDH"
    * I set the product code
    Then I validate that the "raw material" inventory is "edited" with the right details passed
    When I goto the "inventory" list page
    * I search for the inventory I just "edited"
    Then I validate that the inventory is "edited" successfully

  @smoke_tests
  Scenario: User should be able to delete raw material inventories only via backend services
    Then I delete the Inventory