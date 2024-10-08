Feature: CRUD test for an inventory lot creation for the  type Raw Material


  Feature: Edit Lot Details

  Scenario: User must able to edits a lot details from the create lot with Lb
    Given the user is on the "inventory Details" page
    When the user clicks on "More Options" for a specific lot
    And selects "Edit" option 
    Then an "Edit Lot" pop-up should appear
    When the user edits the "Manufacturer Lot#" to "90"
    And selects "$/lb" as the unit 
    * changes cost to "55.22"
    * clicks on the "Save" button 
    Then I validate that the price is "Updated " successfully
    And validate that converted value is displayed correctly

    Scenario: User must able to edits a lot details from the create lot with Kg
    Given the user is on the "inventory Details" page
    When the user clicks on "More Options" for a specific lot
    And selects "Edit" option 
    Then an "Edit Lot" pop-up should appear
    When the user edits the "Manufacturer Lot#" to "90"
    And selects "$/Kg" as the unit 
    * changes cost to "55.22"
    * clicks on the "Save" button 
    Then I validate that the price is "Updated " successfully
    And validate that converted value is displayed correctly

  Scenario: User edits the pricing and clicks on cancel button
     Given an “Edit Lot” pop-up is open 
     When user clicks on “Cancel” button 
     Then pop-up should close without saving any changes 

  Scenario: User should not allow to click save button when mandatory fields are empty 
      Given an “Edit Lot” pop-up is open 
      When user clears the values in mandatory fields like “Manufacturer Lot#”
      And clicks on “Save” button 
      Then error message should display indicating mandatory fields cannot be empty