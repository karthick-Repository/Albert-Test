Feature: Test to validate edit predecessor values as well as alias,description range and alias,description,Tags values in apps grid when making duplicating current sheet

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I click on the product design grid section in the worksheet
    * I expand the apps grid section in the worksheet
    * I click on the plus icon of apps grid section in the worksheet
    * I click on the text "Add a Lookup Row"
    * I click on " Alias " identified as a hyperlink
    * User waits for 2 seconds
    * I click on the plus icon of apps grid section in the worksheet
    * I click on the text "Add a Lookup Row"
    * I click on " Description " identified as a hyperlink

  # @WKS_Mandatory
  # Scenario: Validate that the alias text range should not be more then 255 characters and description text range should not be more then 1000 characters under apps grid
  #   When User just double clicks on the cell identified by row "5" in column identified by ID "COL5" in WKS
  #   * I add 2 tags in tags section
  #   * User clicks on "Done"
  #   * User enter 1001 characters in the cell identified by row "3" in column identified by ID "COL5" in WKS
  #   Then User validates that the message "should NOT be longer than 1000 characters" is displayed
  #   * User enter 256 characters in the cell identified by row "4" in column identified by ID "COL5" in WKS
  #   Then User validates that the message "length should be less than 255" is displayed


  @WKS_Mandatory
  Scenario: Validate that the default value of predecessor and after edit predecessor value in worksheet after duplicating sheet
    * User waits for 5 seconds
    Then Verify "Original" should be shown in cell corresponding to row "7" and column "COL5"
    When User just double clicks on the cell identified by row "5" in column identified by ID "COL5" in WKS
    * I add 2 tags in tags section
    * User clicks on "Done"
    * User waits for 5 seconds
    * User copy the tags value corresponding to row "5" and column "COL5"
    * User enter 100 characters in the cell identified by row "3" in column identified by ID "COL5" in WKS
    * User enter 100 characters in the cell identified by row "4" in column identified by ID "COL5" in WKS
    When User clicks action icon of column "COL5"
    * User clicks on "Expand Summary" in the action menu
    * User click on open details and update the predecessor value
    * User reloads the page
    * User is in the WKS page
    * I click on the product design grid section in the worksheet
    * User copy predecessor value in the cell identified by row "7" in column identified by ID "COL5" in WKS
    * I duplicate sheet number 1
    * I set a random 10 character string as the name of the sheet being duplicated
    * I "check" the checkbox number 3 in the "Product Design Grid" section
    * I click on the "Create" button to add new sheet
    * User waits for 5 seconds
    Then I validate that the new sheet is added in the first position
    When I click on the product design grid section in the worksheet
    * I click on the result grid section in the worksheet
    * User waits for 3 seconds
    Then Verify predecessor value in new sheet is same as old sheet shown in cell corresponding to row "7" and column "COL5"
    * Verify "" should be shown in cell corresponding to row "3" and column "COL5"
    * Verify "" should be shown in cell corresponding to row "4" and column "COL5"
    * Verify tags value in new sheet corresponding to row "5" and column "COL5"