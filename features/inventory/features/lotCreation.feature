Feature: CRUD test for an inventory lot creation for the  type Raw Material

  Background: User logs into the application & clicks on create Project
    Given User logs into the application
    When User closes the modal dialog

    @smoke_tests
  Scenario: User must be able to create a new lot for the rawmaterials inventory with unit "g"
    Given I goto the details page of the inventory I created
    When I click on the add lot button in the detailstails page
    Then I validate that Add new lot pop-up  is displayed
    * I validate the albert id should be prefilled the inventory id of the created inventory
    * I set the unit as "g"
    * I enters the quantity "150" in the quantity field
    * I set the manufacturer of the Inventory
    * I validate the default location of the user should be pre filled in the location field
    * I set "1" "existing" "Storeage location"
    * I set the unit of cost as "$/Kg"
    * I enters the quantity "150" in the Cost field
    * I set the "packsize" for the lot
    * I click on the "Create" button
    * User waits for 2 seconds.

    @smoke_tests
    Scenario: User must be able to create a new lot for the rawmaterials inventory with unit "kg"
      Given I goto the details page of the inventory I created
      When I click on the add lot button in the detailstails page
      Then I validate that Add new lot pop-up  is displayed
      * I validate the albert id should be prefilled the inventory id of the created inventory
      * I set the unit as "Kg"
      * I enters the quantity "100" in the quantity field
      * I set the manufacturer of the Inventory
      * I validate the default location of the user should be pre filled in the location field
      * I set "1" "existing" "Storeage location"
      * I set the unit of cost as "$/Kg"
      * I enters the quantity "250" in the Cost field
      * I set the "packsize" for the lot
      * I click on the "Create" button
      * User waits for 2 seconds.

      @smoke_tests
      Scenario: User must be able to create a new lot for the rawmaterials inventory with unit "lb"
      Given I goto the edit page of the inventory I created
      When The user clicks on "Add Lot" button
      Then user is on the "Add New Lot" page
      When The user sets the unit as "lb"
      * The user enters the quantity
      * The user adds manufacturer information
      * The user selects storage location
      * The user changes the unit as "lb" for cost field
      * The user enters cost value
      Then uase clicks on the create button
      * new lot is created
      And lot label should be automatically downloaded for the new lot
      And User validates that pound value is correctly converted to kg value in lots grid.

      