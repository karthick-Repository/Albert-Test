Feature: Tests to validate  apps grid scenarios which involve duplicating current sheet

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I expand the apps grid section in the worksheet
    Then I validate that "Inventory Total,Tags,PricingAverage,Predecessor,Batches,Purpose,Result" rows are displayed in the Apps grid
    When User clicks on the action icon of row at index 4
    * I click on the text "Add a Lookup Row"
    * I click on " Description " identified as a hyperlink
    * User waits for 2 seconds
    * User clicks on the action icon of row at index 6
    * I click on the text "Add a Lookup Row"
    * I click on " Alias " identified as a hyperlink
    * I expand or collapse the row with aria-index "2"

  @WKS_Mandatory
  Scenario: Validate that the cell character limits in Purpose, Alias and Description cells of the apps grid
    When User enters a random string of length 1001 into the cell identified by row 4 and column 1 of the right panel in the WKS
    Then User validates that the message "should NOT be longer than 1000 characters" is displayed
    When I close the snack bar container
    * I expand or collapse the row with aria-index "2"
    * User enters a random string of length 260 into the cell identified by row 6 and column 1 of the right panel in the WKS
    Then User validates that the message "length should be less than 255" is displayed
    When I close the snack bar container
    * User enters a random string of length 1001 into the cell identified by row 9 and column 1 of the right panel in the WKS
    Then User validates that the message "value should not more than 1000 character" is displayed
    When I close the snack bar container
    * User enters a random string of length 1001 into the cell identified by row 10 and column 1 of the right panel in the WKS
    Then User validates that the message "value should not more than 1000 character" is displayed

  # @WKS_Mandatory
  # Scenario: validate that all apps grid rows in the parent sheet is displayed in the duplicated sheet
  #   When I duplicate sheet number 1
  #   * I set a random 50 character string as the name of the sheet being duplicated
  #   * I "check" the checkbox number 3 in the "Product Design Grid" section
  #   * I click on the "Create" button
  #   * I expand or collapse the row with aria-index "2"
  #   * I expand or collapse the row with aria-index "3"
  #   Then I validate that "Tags,Description,PricingAverage,Alias,Predecessor,Batches,Purpose,Result" rows are displayed in the Apps grid
  # @WKS_Mandatory
  # Scenario: Validate that User is able to enter the maximun and minimum characters For the alias and description in the apps grid.
  #   * I expand the apps grid section in the worksheet
  #   # * User clicks on the action icon of row at index 6
  #   * I click on the text "Add a Lookup Row"
  #   * I click on " Alias " identified as a hyperlink
  #   * I set a random 250 character string as the name of the Alias
  #   # When User clicks on the action icon of row at index 4
  #   # * I click on the text "Add a Lookup Row"
  #   # * I click on " Description " identified as a hyperlink
  #   # * I set a random 1000 character string as the name of the Description
