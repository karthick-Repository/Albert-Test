Feature: Copy from existing with values only related validations

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * User is in the WKS page

  @WKS_Mandatory @calculation_tests @INVENT-3673
  Scenario: Validate that calculations with ranges do not break when user performs copy from existing with only values
    When Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 5 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TCFEFC-1" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TCFEFC-2" into the column header of the added column
    * User clicks action icon of column "COL7"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TCFEFC-3" into the column header of the added column
    * User resizes all columns in the WKS to "70px"
    * Enter the values "10, 20, 30, 40, 50" into the column with ID "COL6" in WKS
    * Enter the values "60, 70, 80, 90, 100" into the column with ID "COL5" in WKS
    * User enters the formulae "asdsdca, =SUM(H1:H2), =SUMPRODUCT(G1:H5), =SUM(D2:D3), =D4-D3-D2-SUM(E4:F4)*G4" into the cells of the column with ID "COL4" in WKS
    * User enters the formulae "=SUM(D1:E3)-E5, =PRODUCT(G1:G2), =SUM(F1:F2)-SUMPRODUCT((D1:D2)), =SQRT(SQRT(SQRT(F1+F3))), =F3-SUM(D1:D1)*F4" into the cells of the column with ID "COL7" in WKS
    Then Validate that the cell values in the column identified by the ID "COL7" are "680,200,750,2.47980199,750"
    * Validate that the inventory total for the column with column ID "COL7" is "2382.479802"
    * I perform Copy From Existing on column with ID "COL8" using column containing index "003" "involving values"
    * User is in the WKS page
    * User waits for 1 seconds
    Then Validate that the cell values in the column identified by the ID "COL8" are "680,200,750,2.47980199,750"
    * Validate that the inventory total for the column with column ID "COL8" is "2382.479802"
    * Validate that the cell values in the column identified by the ID "COL7" are "1560,200,1630,2.74140901,1630"
    * Validate that the inventory total for the column with column ID "COL7" is "5022.741409"
    * Validate that the cell values in the column identified by the ID "COL4" are "asdsdca,130,550,680,-208.84844" 
    * Validate that the inventory total for the column with column ID "COL4" is "1151.15156"
   