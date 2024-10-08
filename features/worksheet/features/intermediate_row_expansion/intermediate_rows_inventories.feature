Feature: Test to validate the basic intermediate row expansion scenarios

  Background: User logs in and navigates to WKS
    When User creates a project
    * User enables worksheet for the created project
    * User navigates to the WKS
    * User is in the WKS page
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 5 inventories of type "Formulas" to the WKS from advanced search dialog
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TRIRE-1" into the column header of the added column
    * User reloads the page

  @WKS_Mandatory
  Scenario: Validate that intermediate rows are added in a project when user adds inventories used as a formula
    When User is in the WKS page
    Then I validate that 5 intermediate row expansion icons are displayed
    When I "expand" the intermate row at index 1 in the product design grid
    Then I validate that the message "Loading results. This may take upto 10 seconds" is displayed after expanding the intermediate row
    When User enters the value "=" into the cell identified by row 1 and column 1 of the right panel in the WKS
    Then Verify that the row index is "1,2,3,4,5"
    * Verify that the column index is "A,B,C,D,E,F"
    When I "collapse" the intermate row at index 1 in the product design grid
    When I "expand" all the intermediate rows in the product design grid
    * User enters the value "=" into the cell identified by row 1 and column 1 of the right panel in the WKS
    Then Verify that the row index is "1,2,3,4,5"
    * Verify that the column index is "A,B,C,D,E,F"
