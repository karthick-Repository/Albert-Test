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
    # * I expand or collapse the row with aria-indexes "2"

  @WKS_Mandatory  @failing_bec_of_pd_grid_state_mamnagement
  Scenario: Validate that the cell character limits in Purpose, Alias and Description cells of the apps grid
    * User waits for 5 seconds
    When I click on the product design grid section in the worksheet
    * User waits for 5 seconds
    When User enters a random string of length 1001 into the cell identified by row 4 and column 1 of the right panel in the WKS
    Then User validates that the message "should NOT be longer than 1000 characters" is displayed
    When I close the snack bar container
    * User waits for 5 seconds
    * User enters a random string of length 260 into the cell identified by row 6 and column 1 of the right panel in the WKS
    Then User validates that the message "length should be less than 255" is displayed
    When I close the snack bar container
    * User enters a random string of length 1001 into the cell identified by row 10 and column 1 of the right panel in the WKS
    Then User validates that the message "value should not more than 1000 character" is displayed
    When I close the snack bar container
    * User enters a random string of length 1001 into the cell identified by row 9 and column 1 of the right panel in the WKS
    Then User validates that the message "value should not more than 1000 character" is displayed
    When I duplicate sheet number 1
    * I set a random 50 character string as the name of the sheet being duplicated
    * I "check" the checkbox number 3 in the "Product Design Grid" section
    * I click on the "Create" button to add new sheet
    * User waits for 2 seconds
    Then I validate that the new sheet is added in the first position
    * User waits for 5 seconds
    Then I validate that "Inventory Total,Tags,Description,PricingAverage,Alias,Predecessor,Batches,Purpose,Result" rows are displayed in the Apps grid
