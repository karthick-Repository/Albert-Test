Feature: WKS Row grouping related validations

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * User is in the WKS page
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 5 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * Add "Product Design" "Blank" rows in WKS
    * Add 5 blank rows to WKS
    * User reloads the page
    * User is in the WKS page

  @WKS_Mandatory @smoke_tests
  Scenario: When user select few rows for grouping and then try to add a new row in between then rows should get deselected
    When User "groups" the rows identified by indexes "1,2,3"
    * User clicks on the action icon of row at index 2
    * User clicks on "Add a Blank Row" in the action menu
    * User names the row as "Row Checkbox Status"
    * User clicks on the search input in WKS
    * User reloads the page
    * User is in the WKS page
    Then User validates that the checkboxes of the rows identified by the indexes "1,2,3" are "un-checked"
    When User "groups" the rows identified by indexes "4,5,6,7"
    * User clicks on the group rows button
    Then User validates that "4 Selected" is visible
    When User names the row as "ARG-1"
    Then User validates that the group "ARG-1" is added to the worksheet
    When User reloads the page
    * User is in the WKS page
    * User "groups" the rows identified by indexes "1,2,3,4"
    * User clicks on the group rows button
    Then User validates that "8 Selected" is visible
    When User names the row as "ARG-2"
    Then User validates that the group "ARG-2" is added to the worksheet
    When User reloads the page
    * User is in the WKS page
    * User clicks on the action icon of row at index 1
    * User clicks on "Add a Blank Row" in the action menu
    * User names the row as "Row Outside Group"
    * User clicks on the search input in WKS
    * User reloads the page
    * User is in the WKS page
    Then User verifies that the row "Row Outside Group" is added at index 10 to the product design grid of the worksheet
    When User moves row at index 1 to index 11
    * User reloads the page
    * User is in the WKS page
    Then User verifies that the row "Row Outside Group" is added at index 1 to the product design grid of the worksheet
    * User "groups" the rows identified by indexes "2,11,12"
    * User deselects all rows by clicking on the cancel icon
    Then User validates that the checkboxes of the rows identified by the indexes "2,11,12" are "un-checked"
    When User "groups" the rows identified by indexes "2"
    Then User validates that "9 Selected" is visible
