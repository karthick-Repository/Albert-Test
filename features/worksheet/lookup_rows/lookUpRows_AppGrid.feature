Feature: Tests to validate the look up rows feature in Apps grid

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I expand the apps grid section in the worksheet
    Then I validate that "Inventory Total,Tags,PricingAverage,Predecessor,Batches,Purpose,Result" rows are displayed in the Apps grid
    When User clicks on the action icon of row at index 4
    * I click on the text "Add a Lookup Row"
    * I click on " Description " identified as a hyperlink
    * User clicks on the action icon of row at index 5
    * I click on the text "Add a Lookup Row"
    * I click on " Alias " identified as a hyperlink
    * User reloads the page
    * User is in the WKS page

  @WKS_Mandatory
  Scenario: Validate that users can add look up rows in the Apps grid of the WKS
    When User clicks on the action icon of row at index 6
    * I click on the text "Add a Lookup Row"
    * User waits for 1 seconds
    Then Validate that the message "No lookup rows were found." is displayed
    When I click on the text "Got It"
    Then I validate that "Inventory Total,Tags,Description,Alias,PricingAverage,Predecessor,Batches,Purpose,Result" rows are displayed in the Apps grid
    When User clicks on the search input in WKS
    * User clicks on the action icon of row at index 7
    Then User validates that "Remove Row" is not part of the menu options displayed
    When User clicks on the search input in WKS
    * User clicks on the action icon of row at index 9
    Then User validates that "Remove Row" is not part of the menu options displayed
    * I delete the look up rows at indexes "4,4,4,5"
    Then I validate that "Inventory Total,PricingAverage,Batches,Purpose,Result" rows are displayed in the Apps grid
    When I add the following look up rows "Tags,Description,Alias,Predecessor" to the apps grid
    Then I validate that "Inventory Total,PricingAverage,Batches,Purpose,Result,Tags,Description,Alias,Predecessor" rows are displayed in the Apps grid
    When I search for "Tags" in the worksheet
    * User waits for 1 seconds
    Then Validate that the message "No matching formulas found. Clear filters and try again" is displayed
    When I search for "Tags" in the worksheet
    * User waits for 1 seconds
    Then Validate that the message "No matching formulas found. Clear filters and try again" is displayed
    When I search for "Pricing" in the worksheet
    * User waits for 1 seconds
    Then Validate that the message "No matching formulas found. Clear filters and try again" is displayed
    When I search for "Batches" in the worksheet
    * User waits for 1 seconds
    Then Validate that the message "No matching formulas found. Clear filters and try again" is displayed
    When I search for "Purpose" in the worksheet
    * User waits for 1 seconds
    Then Validate that the message "No matching formulas found. Clear filters and try again" is displayed
    When I search for "Predecessor" in the worksheet
    * User waits for 1 seconds
    Then Validate that the message "No matching formulas found. Clear filters and try again" is displayed
    When I search for "Alias" in the worksheet
    * User waits for 1 seconds
    Then Validate that the message "No matching formulas found. Clear filters and try again" is displayed
    When I search for "Description" in the worksheet
    * User waits for 1 seconds
    Then Validate that the message "No matching formulas found. Clear filters and try again" is displayed

  @WKS_Mandatory
  Scenario: Validate that when the user is in normalization mode or focus mode then adding /deleting new look up row should not remove the focus
    When Add "Product Design" "Blank" rows in WKS
    * Add 5 blank rows to WKS
    * User reloads the page
    * User is in the WKS page
    * Enter the values "10,20,30,40,50" into the column with ID "COL5" in WKS
    * I delete the look up rows at indexes "9,9,9,10"
    * I expand or collapse the row with aria-indexes "2"
    * User clicks on the focus view icon of column identified by column ID "COL5"
    * I add the following look up rows "Tags,Description,Alias,Predecessor" to the apps grid
    Then I validate that "Tags,Description,Alias,Predecessor" rows are displayed in the Apps grid
    When I delete the look up rows at indexes "3,3"
    Then Validate that the focus count is "1"
    When I expand or collapse the row with aria-indexes "2"
    * User clicks action icon of column "COL5"
    * User clicks on "Normalize" in the action menu
    Then Validate that the focus count is "1"

@WKS_Mandatory
Scenario: Validate facet filter search related scenarioes for look up rows
  When I click on the filter icon of column with ID "ag-Grid-AutoColumn"
  * I "uncheck" the checkbox associated with the text "(Select All)" in the non-product filter
  * I "check" the checkbox associated with the text "Tags" in the non-product filter
  * I "check" the checkbox associated with the text "Alias" in the non-product filter
  * I "check" the checkbox associated with the text "Description" in the non-product filter
  * I "check" the checkbox associated with the text "Predecessor" in the non-product filter
  * I click on the filter icon of column with ID "ag-Grid-AutoColumn"
  Then I validate that "Tags,Alias,Description,Predecessor" rows are displayed in the Apps grid
  When I delete the look up rows at indexes "1,2"
  * I click on the filter icon of column with ID "ag-Grid-AutoColumn"
  Then I validate that the checkbox associated with the text "Tags" is "checked" in the non-product filter
  * I validate that the checkbox associated with the text "Alias" is "checked" in the non-product filter
  * I validate that the checkbox associated with the text "Description" is "checked" in the non-product filter
  * I validate that the checkbox associated with the text "Predecessor" is "checked" in the non-product filter
  * I validate that "Description,Predecessor" rows are displayed in the Apps grid
