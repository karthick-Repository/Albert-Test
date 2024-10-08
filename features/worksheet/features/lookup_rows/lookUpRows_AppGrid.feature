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
    * User waits for 3 seconds

  @WKS_Mandatory
  Scenario: Validate that users can add look up rows in the Apps grid of the WKS
    When User clicks on the action icon of row at index 6
    * I click on the text "Add a Lookup Row"
    * User waits for 1 seconds
    Then Validate that the message "No lookup rows were found." is displayed
    When I click on the text "Got It"
    Then I validate that "Inventory Total,Tags,PricingAverage,Predecessor,Batches,Purpose,Alias,Description" rows are displayed in the Apps grid
    When User clicks on the action icon of row at index 5
    Then User validates that "Remove Row" is not part of the menu options displayed
    * User clicks on the action icon of row at index 8
    Then User validates that "Remove Row" is not part of the menu options displayed

  @WKS_Mandatory
  Scenario: Validate that the user can add delete all the look up rows and add them back to the apps grid & also that the user cannot search for look up rows
    When I delete the look up rows at indexes "4,5,5,7"
    Then I validate that "Inventory Total,PricingAverage,Batches,Purpose" rows are displayed in the Apps grid
    When I add the look up rows "Tags,Description,Alias,Predecessor" starting from the row at index 4 in the apps grid
    Then I validate that "Inventory Total,PricingAverage,Batches,Purpose,Tags,Description,Alias,Predecessor" rows are displayed in the Apps grid
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
    When I delete the look up rows at indexes "4,5,5,7"
    * User deletes blank row at indexes "6" from WKS
    * User clicks on the focus view icon of column identified by column ID "COL5"
    * I add the look up rows "Tags,Description,Alias,Predecessor" starting from the row at index 4 in the apps grid
    Then I validate that "Inventory Total,PricingAverage,Tags,Description,Alias,Predecessor" rows are displayed in the Apps grid
    When I add 0 blank rows, 5 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * User reloads the page
    Then User is in the WKS page
    When I delete the look up rows at indexes "10,10,10,10"
    * User deletes blank row at indexes "11" from WKS
    * Enter the values "10,20,30,40,50" into the column with ID "COL5" in WKS
    * User clicks action icon of column "COL5"
    * User clicks on "Normalize" in the action menu
    * User fetches the focus count
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
    Then I validate that "Alias,Description" rows are displayed in the Apps grid

  @WKS_Mandatory
  Scenario: Validate scenarioes which have tags added in the apps grid
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
    Then I validate that "Alias,Description" rows are displayed in the Apps grid
