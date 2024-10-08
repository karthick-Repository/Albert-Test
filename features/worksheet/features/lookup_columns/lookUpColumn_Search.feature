Feature: Tests to validate the addition of lookup columns addition and re-order

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS

  @WKS_Mandatory
  Scenario: Validate that the user can add look up columns, re-order them & check for column indexes
    When User clicks action icon of column "COL5"
    * I click on the text "Add a Lookup Column"
    * I click on " Alias " identified as a hyperlink
    * User clicks action icon of column "COL6"
    * I click on the text "Add a Lookup Column"
    * I click on " Description " identified as a hyperlink
    * User clicks action icon of column "COL7"
    * I click on the text "Add a Lookup Column"
    * I click on " Tags " identified as a hyperlink
    * User clicks action icon of column "COL8"
    * I click on the text "Add a Lookup Column"
    * I click on " RSN " identified as a hyperlink
    * User clicks action icon of column "COL9"
    * I click on the text "Add a Lookup Column"
    * I click on " RSNe " identified as a hyperlink
    * User clicks action icon of column "COL10"
    * I click on the text "Add a Lookup Column"
    * I click on " IDH " identified as a hyperlink
    * I search for "Alias" in the worksheet
    * User waits for 1 seconds
    Then Validate that the message "No matching formulas found. Clear filters and try again" is displayed
    When I search for "RSN" in the worksheet
    * User waits for 1 seconds
    Then Validate that the message "No matching formulas found. Clear filters and try again" is displayed
    When I search for "Description" in the worksheet
    * User waits for 1 seconds
    Then Validate that the message "No matching formulas found. Clear filters and try again" is displayed
    When I search for "Tags" in the worksheet
    * User waits for 1 seconds
    Then Validate that the message "No matching formulas found. Clear filters and try again" is displayed
    When I search for "RSNe" in the worksheet
    * User waits for 1 seconds
    Then Validate that the message "No matching formulas found. Clear filters and try again" is displayed
    When I search for "IDH" in the worksheet
    * User waits for 1 seconds
    Then Validate that the message "No matching formulas found. Clear filters and try again" is displayed