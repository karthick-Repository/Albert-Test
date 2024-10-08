Feature: Validate row and column indexes by adding blank/inventory rows

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * User is in the WKS page

  @WKS_Mandatory @index_tests
  Scenario: Validate that indexes do not break when user adds row & columns in bulk, in focus mode, in filtered mode & in the case of copy to new
    Given User is in the WKS page
    When Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 10 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "FC-1" into the column header of the added column
    * User enters the value "=" into the cell identified by row 2 and column 1 of the right panel in the WKS
    Then Verify that the row index is not broken in WKS
    * Verify that the column index is "A,B,C,D,F,E"
    When User clicks on the focus view icon of column identified by column ID "COL6"
    * User fetches the focus count
    Then Validate that the focus count is "1"
    When Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 10 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * Add "Product Design" "Blank" rows in WKS
    * Add 10 blank rows to WKS
    * User enters the value "=" into the cell identified by row 15 and column 1 of the right panel in the WKS
    Then Verify that the row index is "11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10"
    * Verify that the column index is "A,B,C,D,F,E"
    When User clicks action icon of column "COL6"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "FC-2" into the column header of the added column
    * User clicks the filter icon
    * User applies filter for columns containing text "001"
    * User enters the value "=" into the cell identified by row 4 and column 1 of the right panel in the WKS
    Then Verify that the row index is "11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,21,22,23,24,25,26,27,28,29,30"
    * Verify that the column index is "A,B,C,D,G"
    When User clicks the filter icon
    * User applies filter for columns containing text "002"
    * User enters the value "=" into the cell identified by row 4 and column 1 of the right panel in the WKS
    Then Verify that the row index is "11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,21,22,23,24,25,26,27,28,29,30"
    * Verify that the column index is "A,B,C,D,G,F"
    When User clicks action icon of column "COL5"
    * User clicks on "Copy To New" in the action menu
    * User clicks on copy to new
    * User enters "10" into the copy to new input field
    * User clicks on the Done button in Copy to new dialog
    Then Verify that the row index is "11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,21,22,23,24,25,26,27,28,29,30"
    * Verify that the column index is not broken in WKS
