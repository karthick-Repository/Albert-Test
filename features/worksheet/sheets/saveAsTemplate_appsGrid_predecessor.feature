Feature: Test to validate alias,description,Tags values in apps grid when making duplicating current sheet

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I click on the product design grid section in the worksheet
    * I expand the apps grid section in the worksheet
    * I click on the plus icon of apps grid section in the worksheet
    * I click on the text "Add a Lookup Row"
    * I click on " Description " identified as a hyperlink
    * I click on the plus icon of apps grid section in the worksheet
    * I click on the text "Add a Lookup Row"
    * I click on " Alias " identified as a hyperlink

  @WKS_Mandatory
  Scenario: Validate that the default value of predecessor and after edit predecessor value in worksheet  after create worksheet from save as template
    * User waits for 3 seconds
    Then Verify "Original" should be shown in cell corresponding to row "7" and column "COL5"
    When User just double clicks on the cell identified by row "5" in column identified by ID "COL5" in WKS
    * I add 2 tags in tags section
    * User clicks on "Done"
    * User waits for 3 seconds
    * User copy the tags value corresponding to row "5" and column "COL5"
    * User enter 10 characters in the cell identified by row "3" in column identified by ID "COL5" in WKS
    * User enter 10 characters in the cell identified by row "4" in column identified by ID "COL5" in WKS
    When User clicks action icon of column "COL5"
    * User clicks on "Expand Summary" in the action menu
    * User click on open details and update the predecessor value
    * User reloads the page
    * User is in the WKS page
    * User waits for 2 seconds
    * I click on the product design grid section in the worksheet
    * Verify predecessor value is differ then original value "Original" shown in cell corresponding to row "7" and column "COL5"
    * I click on the action icon of sheet 1
    * I click on "Save As Template"
    * I set a random 10 character string as the name of the sheet being duplicated
    * I "check" the checkbox number 3 in the "Product Design Grid" section
    * I click on the "Create" button to add new sheet
    * I click on the plus icon in the footer of the worksheet
    * I click on "Create sheet from a template"
    * I click on "Created by me"
    * I select a sheet template
    * I click on the "Create" button to add new sheet
    * User waits for 2 seconds
    Then I validate that the new sheet is added in the first position
    When I click on the product design grid section in the worksheet
    * User waits for 5 seconds
    * I click on the result grid section in the worksheet
    * I click on the plus icon in the footer of the worksheet
    * I click on "Create sheet from a template"
    * User waits for 2 seconds
    * I click on "Created by me"
    * User waits for 2 seconds
    * I Delete the created template
    Then Verify predecessor value in new sheet is same as old sheet shown in cell corresponding to row "7" and column "COL5"
    * Verify "" should be shown in cell corresponding to row "3" and column "COL5"
    * Verify "" should be shown in cell corresponding to row "4" and column "COL5"
    * Verify tags value in new sheet corresponding to row "5" and column "COL5"