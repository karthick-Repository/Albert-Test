Feature: Copy from existing with calculations related validations

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * User is in the WKS page

 @WKS_Mandatory @calculation_tests
  Scenario: Validate copy from existing with locked columns
    When Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 5 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TCEFC-1" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TCEFC-2" into the column header of the added column
    * User clicks action icon of column "COL7"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TCEFC-3" into the column header of the added column
    * User resizes all columns in the WKS to "70px"
    * Enter the values "10, 20, 30, 40, 50" into the column with ID "COL5" in WKS
    * Enter the values "60, 70, 80, 90, 100" into the column with ID "COL6" in WKS
    * User enters the formulae "=SUM(G1:H1), =SUM(G2:H2), =SUM(G3:H3), =SUM(G4:H4), =SUM(G5:H5)" into the cells of the column with ID "COL7" in WKS
    * User locks the column identified by column ID "COL7"
    * I perform Copy From Existing on column with ID "COL8" using column containing index "003" "involving calculation"
    Then Validate that the cell values in the column identified by the ID "COL8" are "130,160,190,220,250"
    * Validate that the inventory total for the column with column ID "COL8" is "950"