Feature: Test to validate the basic intermediate row expansion scenarios

  Background: User logs in and navigates to WKS
    When User creates a project
    * User enables worksheet for the created project
    * I add 0 blank rows, 3 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * I add 0 blank rows, 6 inventory rows of type "Consumables" into the PD grid of all the sheets of the worksheet
    * User navigates to the WKS
    * User is in the WKS page
    * Enter the values "10,20,30,40,50,60,70,80,90,100" into the column with ID "COL5" in WKS
    * User fetches all columns using WKS service endpoint
    * I fetch the product design grid pinned column data
    * I create 1 sheets from scratch and name them as random 20 character alphanumeric strings
    * I add the formula with ID "001" as an inventory into the current sheet
    * I expand or collapse the row with aria-indexes "5,6"
    Then I validate that 1 intermediate row expansion icons are displayed
    When I "expand" the intermate row at index 1 in the product design grid
    * User enters the value "=" into the cell identified by row 1 and column 1 of the right panel in the WKS
    Then Verify that the row index is "1"
    When User enters the value "100" into the cell identified by row 1 and column 1 of the right panel in the WKS
    When I expand or collapse the row with aria-indexes "14,15"

  @WKS_Mandatory @INVENT-2562
  Scenario: Validate that there is no data loss in PD grid when user performs CFE on a column referring to a formula which has intermediate rows
    When I create 1 sheets from scratch and name them as random 20 character alphanumeric strings
    When I perform Copy From Existing on column with ID "COL5" using column containing index "002" "with values"
    Then I validate that 1 intermediate row expansion icons are displayed
    
    @WKS_Mandatory
    Scenario: Validate that intermediate rows are added in a project when user adds inventories used as a formula
      # Then I validate that data in product design grid pinned column data is preserved after adding adding intermediate row "1"
      # When I "collapse" the intermate row at index 1 in the product design grid
      * Add "Product Design" "Inventory" rows in WKS
      * User clicks on the advanced search button in the inventory seach dialog
      * User adds 5 inventories of type "RawMaterials" to the WKS from advanced search dialog
      * I "expand" the intermate row at index 1 in the product design grid
      * User waits for 1 seconds
      * User enters the value "100" into the cell identified by row 6 and column 1 of the right panel in the WKS
      Then Validate that the cell values in the column identified by the ID "COL5" after adding the intermediate row are "100,100,,,,,,2.222222222,4.444444444,6.666666667,8.888888889,11.111111111,13.333333333,15.555555556,17.777777778,20"

    @WKS_Mandatory
    Scenario: Validate that normalization works as expected after user adds intermediate rows to a worksheet
      When User enters the value "100" into the cell identified by row 1 and column 1 of the right panel in the WKS
      Then Validate that the cell values in the column identified by the ID "COL5" are "100,100,2.222222222,4.444444444,6.666666667,8.888888889,11.111111111,13.333333333,15.555555556,17.777777778"
      When User clicks action icon of column "COL5"
      * User clicks on "Normalize" in the action menu
      * I "expand" the intermate row at index 1 in the product design grid
      * Enter "9999999" into the normalize input
      * User clicks on the search input in WKS
      Then Validate that the cell values in the column identified by the ID "COL5" are "9999999,2.222222222,4.444444444,9999999,8.888888889,11.111111111,13.333333333,15.555555556,17.777777778,20"
      * Validate that the normalized inventory total of the column identified by the ID "COL5" is "9999999"
      When User clicks on "Done"
      * User clicks on "Confirm"
      Then Validate that the cell values in the column identified by the ID "COL5" are "9999999,2.222222222,4.444444444,9999999,8.888888889,11.111111111,13.333333333,15.555555556,17.777777778,20"
