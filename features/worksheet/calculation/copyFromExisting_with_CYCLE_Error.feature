Feature: Copy from existing with calculations related validations

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * User is in the WKS page

  @WKS_Mandatory @calculation_tests
  Scenario: Validate that cell throw a #CYCLE! error when user tries to perform copy from existing with calculation which involved formuale which are with in-range
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
    * Enter the values "10, 20, 30, 40, 50" into the column with ID "COL6" in WKS
    * Enter the values "60, 70, 80, 90, 100" into the column with ID "COL5" in WKS
    * User enters the formulae "asdsdca, =SUM(H1:H2), =SUMPRODUCT(G1:H5), =SUM(D2:D3), =D4-D3-D2-SUM(E4:F4)*G4" into the cells of the column with ID "COL4" in WKS
    * User enters the formulae "=SUM(D1:E3)-E5, =PRODUCT(G1:G2), =SUM(F1:F2)-SUMPRODUCT((D1:D2)), =SQRT(SQRT(SQRT(F1+F3))), =F3-SUM(D1:D1)*F4" into the cells of the column with ID "COL7" in WKS
    Then Validate that the cell values in the column identified by the ID "COL7" are "680,200,750,2.47980199,750"
    * Validate that the inventory total for the column with column ID "COL7" is "2382.479802"
    When I perform Copy From Existing on column with ID "COL8" using column containing index "003" "involving calculation"
    * User is in the WKS page
    * User waits for 1 seconds
    Then Validate that the cell values in the column identified by the ID "COL8" are "#CYCLE!,#CYCLE!,#CYCLE!,#CYCLE!,#CYCLE!"
    * Validate that the inventory total for the column with column ID "COL8" is "0"
    * Validate that the cell values in the column identified by the ID "COL7" are "#CYCLE!,200,#CYCLE!,#CYCLE!,#CYCLE!"
    * Validate that the inventory total for the column with column ID "COL7" is "200"
    * Validate that the cell values in the column identified by the ID "COL4" are "asdsdca,130,550,680,#CYCLE!"
    * Validate that the inventory total for the column with column ID "COL4" is "1360"
