Feature: Tests to validate blank rows in apps Grid as group should be displayed in duplicate sheet

  Background: User logs in, Create new Project and navigate to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS

  @WKS_Mandatory  
  Scenario: Validate blank rows in apps Grid as group should be displayed in duplicate sheet
    When I click on the product design grid section in the worksheet
    * I expand the apps grid section in the worksheet
    * I click on the plus icon of apps grid section in the worksheet
    * I click on the text "Add a Blank Row"
    * Add 5 blank rows to WKS
    * User reloads the page
    * User is in the WKS page
    * I click on the product design grid section in the worksheet
    * User "groups" the rows identified by indexes "1,2,3"
    * I click on the text "Group rows"
    * User names the row as "abcd!@#$1234"
    * I duplicate sheet number 1
    * I set a random 10 character string as the name of the sheet being duplicated
    * I "check" the checkbox number 3 in the "Product Design Grid" section
    * I click on the "Create" button to add new sheet
    * I validate that the new sheet is added in the first position
    * User waits for 3 seconds
    Then User validates that the group "abcd!@#$1234" is added to the worksheet