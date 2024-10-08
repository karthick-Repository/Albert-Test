Feature: Validations WKS calculations with row re-order

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * User is in the WKS page

  @WKS_Mandatory @smoke_tests
  Scenario: Validate that the formula are auto-updated when the user moves rows which are not selected in a sequence
    When Add "Product Design" "Blank" rows in WKS
    * Add 10 blank rows to WKS
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TRREOFC-1" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TRREOFC-2" into the column header of the added column
    * User clicks action icon of column "COL7"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TRREOFC-3" into the column header of the added column
    * User resizes all columns in the WKS to "70px"
    * Enter the values "10, 20, 30, 40, 50, 10.12345, 11.23456, 12.34567, 13.4567, 14.56789" into the column with ID "COL5" in WKS
    * User enters the formulae "=SUMPRODUCT(H1:H10)/COUNT(H1:H10), =SUM(G1:H1)/COUNT(H1:H5)-2, =PRODUCT(G1:G2)/SUM(H1:H2), =SUM(G1:G3)*F1,=PRODUCT(G1:G3)/SUMPRODUCT(H6:H10)/PRODUCT(G1:G3), =COUNT(H1:H10)-SUM(G2:G3), =SUMPRODUCT(E1:G1), =SUM(E2:F8)+H7/32*0.12, =SIN(H4), =TAN(H6)" into the cells of the column with ID "COL6" in WKS
    * Enter the values "1, 2, 3, 4, 5, 6, 7, 8, 9, 10" into the column with ID "COL8" in WKS
    * Enter the values "11, 12, 13, 14, 15, 16, 17, 18, 19, 20" into the column with ID "COL7" in WKS
    * User "groups" the rows identified by indexes "1,2"
    * User "groups" the rows identified by indexes "5,6"
    * User "groups" the rows identified by indexes "8,9"
    * User moves row at index 2 to index 5
    * User validates that the checkboxes of the rows identified by the indexes "1,2,5,6,8,9" are "checked"
    * User "groups" the rows identified by indexes "7"
    * User "un-groups" the rows identified by indexes "1"
    * Validate that group rows button is displayed
    * User reloads the page
    * User is in the WKS page
    Then Validate that the cell values in the column identified by the ID "COL6" are "21.172827,4.2345654,2.98859069,312.355814,0.016200033,2.77684391,33.172827,140.04213,0.74511316,0.840020833"
    * Validate that the inventory total for the column with column ID "COL6" is "0"

  @WKS_Mandatory @smoke_tests
  Scenario: Validate that the formula are auto-updated when the user moves rows in WKS with 1 default and 1 formula columns
    When Add "Product Design" "Blank" rows in WKS
    * Add 10 blank rows to WKS
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "FC-1" into the column header of the added column
    * User reloads the page
    * User is in the WKS page
    * Enter the values "10, 20, 30, 40, 50" into the column with ID "COL5" in WKS
    * User enters the value "=SUM(F1:F5)" into the cell identified by row 1 and column 1 of the right panel in the WKS
    * User moves row at index 1 to index 3
    * User fetch the value of the cell identified by row "2" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(F2:F5)"
    When User deletes blank row at index 4 from WKS
    * User fetch the value of the cell identified by row "2" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(F2:F4)"
    When User moves row at index 6 to index 2
    * User fetch the value of the cell identified by row "3" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(F3:F5)"

  @WKS_Mandatory
  Scenario: Validate that the formula are auto-updated when the user moves rows multiple times in WKS with multiple columns
    When Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 5 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * Add "Product Design" "Blank" rows in WKS
    * Add 5 blank rows to WKS
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TFC-1" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TFC-2" into the column header of the added column
    * User clicks action icon of column "COL7"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "TBC-1" into the column header of the added column
    * User clicks action icon of column "COL8"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "TBC-2" into the column header of the added column
    * User resizes all columns in the WKS to "70px"
    * Enter the values "ABC, DEF, GHI, JKL, MNO, 123PQR, 456TUV, 789XYZ, 012ABC, 345DEF" into the column with ID "COL4" in WKS
    * Enter the values "100, 200, 300, 400, 500, 600, 700, 800, 900, 1000" into the column with ID "COL9" in WKS
    * User enters the formulae "=E1*1.1, =E2*1.1, =E3*1.1, =E4*1.1, =E5*1.1, =E6*1.1, =E7*1.1, =E8*1.1, =E9*1.1, =E10*1.1" into the cells of the column with ID "COL8" in WKS
    * User enters the formulae "=F1*1.1+F10, =F2*1.1+SUM($E7:F10), =F3*1.1+SUM($E$7:F10), =F4*1.1+SUM(E9:$E2), =F5*1.1+SUM(E8:F$10), =F6*1.1+SUM(E3:$F$7), =F7*1.1*SUM(H2:I2), =F8*1.1+SUM(H9:I9), =F9*1.1+E10, =F10*1.1*SUMPRODUCT(H9:I1)" into the cells of the column with ID "COL7" in WKS
    * User enters the formulae "=G1/E1, =G2/E2, =G3/E3, =G4/E4, =G5/E5, =G6/E6, =G7/E7, =G8/E8, =G9/E9, =G10/E10" into the cells of the column with ID "COL6" in WKS
    * User enters the formulae "=H1*1.05, =H2*1.05, =H3*1.05, =H4*1.05, =H5*1.05, =H6*1.05, =H7*1.05, =H8*1.05, =H9*1.05, =H10*1.05" into the cells of the column with ID "COL5" in WKS
    * User moves row at index 11 to index 5
    Then Validate that the inventory total for the column with column ID "COL8" is "4400"
    * Validate that the inventory total for the column with column ID "COL7" is "579005.346778"
    * Validate that the inventory total for the column with column ID "COL6" is "610.931224"
    * Validate that the inventory total for the column with column ID "COL5" is "641.477785"
    When User moves row at index 1 to index 4
    * Fetch the cell values for column with ID "COL8" in WKS
    * Fetch the cell values for column with ID "COL7" in WKS
    * Fetch the cell values for column with ID "COL6" in WKS
    Then Validate that the cell values in the column identified by the ID "COL8" are "110,220,330,440,550,660,770,880,990,1100"
    * Validate that the cell values in the column identified by the ID "COL7" are "1221,7382,7503,4884,6275,5976,64088.6785,972.758278,2089,505878.91"
    * Validate that the cell values in the column identified by the ID "COL6" are "12.21,36.91,25.01,12.21,12.55,9.96,91.555255,1.21594785,2.32111111,505.87891"
    * Validate that the inventory total for the column with column ID "COL8" is "4400"
    * Validate that the inventory total for the column with column ID "COL7" is "427111.086778"
    * Validate that the inventory total for the column with column ID "COL6" is "459.176964"
    * Validate that the inventory total for the column with column ID "COL5" is "482.135812"
    When User moves row at index 5 to index 3
    Then Validate that the inventory total for the column with column ID "COL8" is "4400"
    * Validate that the inventory total for the column with column ID "COL7" is "390589.936778"
    * Validate that the inventory total for the column with column ID "COL6" is "421.955814"
    * Validate that the inventory total for the column with column ID "COL5" is "443.053605"
    When User moves row at index 1 to index 5
    When User moves row at index 1 to index 10
    * Fetch the cell values for column with ID "COL8" in WKS
    * Fetch the cell values for column with ID "COL7" in WKS
    * Fetch the cell values for column with ID "COL6" in WKS
    Then Validate that the cell values in the column identified by the ID "COL8" are "110,220,330,440,550,660,770,880,990,1100"
    * Validate that the cell values in the column identified by the ID "COL7" are "1221,7382,7503,4984,6275,4926,64088.6785,972.758278,2089,410602.905"
    * Validate that the cell values in the column identified by the ID "COL6" are "12.21,36.91,25.01,12.46,12.55,8.21,91.555255,1.21594785,2.32111111,410.602905"
    * Validate that the inventory total for the column with column ID "COL8" is "4400"
    * Validate that the inventory total for the column with column ID "COL7" is "109944.025378"
    * Validate that the inventory total for the column with column ID "COL6" is "141.95126"
    * Validate that the inventory total for the column with column ID "COL5" is "149.048823"
