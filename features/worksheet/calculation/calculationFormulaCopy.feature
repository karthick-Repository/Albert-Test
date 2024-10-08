Feature: Tests to validate copy formula scenarioes

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 4 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * Add "Product Design" "Blank" rows in WKS
    * Add 4 blank rows to WKS

  @WKS_Mandatory @calculation_tests @INVENT-7391
  Scenario: Validate that the cell indexes are updated accordingly when users copy formulae from one cell to another for a new project
    When User clicks action icon of column "COL5"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "FC-1" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "FC-2" into the column header of the added column
    * User clicks action icon of column "COL7"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "FC-3" into the column header of the added column
    * User resizes all columns in the WKS to "70px"
    * User enters the formulae "0.00001, 0.0002, 0.0003, 0.123456789, 0.00112233446, 1.2345e-7, =SUM(D1:D6), =PRODUCT(D4:D5)-SUM(D6:D7), =SUM(D7:D8), 123456789" into the cells of the column with ID "COL4" in WKS
    * User enters the formulae "=SUM(A1:D1)+1" into the cells of the column with ID "COL8" in WKS
    * User copies the cell contents from the cell identified by row 1 and column 1 to all cells between rows 2 to 8 in column 1
    When User copies the cell contents from the column with ID "COL8" to column with ID "COL7"
    * User fetch the value of the cell identified by row "1" in column identified by ID "COL7" in WKS
    Then Validate that the value fetched from the cell is "=SUM(B1:E1)+1"
    When User fetch the value of the cell identified by row "2" in column identified by ID "COL7" in WKS
    Then Validate that the value fetched from the cell is "=SUM(B2:E2)+1"
    When User fetch the value of the cell identified by row "3" in column identified by ID "COL7" in WKS
    Then Validate that the value fetched from the cell is "=SUM(B3:E3)+1"
    When User fetch the value of the cell identified by row "4" in column identified by ID "COL7" in WKS
    Then Validate that the value fetched from the cell is "=SUM(B4:E4)+1"
    When User fetch the value of the cell identified by row "5" in column identified by ID "COL7" in WKS
    Then Validate that the value fetched from the cell is "=SUM(B5:E5)+1"
    When User fetch the value of the cell identified by row "6" in column identified by ID "COL7" in WKS
    Then Validate that the value fetched from the cell is "=SUM(B6:E6)+1"
    When User fetch the value of the cell identified by row "7" in column identified by ID "COL7" in WKS
    Then Validate that the value fetched from the cell is "=SUM(B7:E7)+1"
    When User fetch the value of the cell identified by row "8" in column identified by ID "COL7" in WKS
    Then Validate that the value fetched from the cell is "=SUM(B8:E8)+1"
    * User enters the formulae "0.00001, 0.0002, 0.0003, 0.123456789, 0.00112233446, 1.2345e-7, =SUM(D1:D6), =PRODUCT(D4:D5)-SUM(D6:D7), =SUM(D7:D8), 123456789" into the cells of the column with ID "COL4" in WKS
    * Enter the values "10, 20, 30, 40, 50, 60, 70, 80" into the column with ID "COL8" in WKS
    * Enter the values "190, 180, 170, 160, 150, 140, 130, 120" into the column with ID "COL7" in WKS
    * User enters the formulae "=SUM(E1+F3)+SUM(D7:D8), =SUM(E2+F4)-SUM(D5:D6), =SUM($E3+F2)*SIN(SUM(D4:D8)), =SUM(E4+$F$4)-TAN(D6), =SUM($E$1:$E$8)+SUM($F$1:$F$8)-SUM($D$5:D6), =SUM($E$6+F5)+SUM(D1:$D$3), =SUM(E1:G6)*SUMPRODUCT($D$6:$D$7), =SUM(PRODUCT(G1:G2)-SUM(E1:E8))-$D8" into the cells of the column with ID "COL6" in WKS
    * User copies the cell contents from the cell identified by row 1 and column 3 to row 1 and column 4
    * User copies the cell contents from the cell identified by row 2 and column 3 to row 2 and column 4
    * User copies the cell contents from the cell identified by row 3 and column 3 to row 3 and column 4
    * User copies the cell contents from the cell identified by row 4 and column 3 to row 4 and column 4
    * User copies the cell contents from the cell identified by row 5 and column 3 to row 5 and column 4
    * User copies the cell contents from the cell identified by row 6 and column 3 to row 6 and column 4
    * User copies the cell contents from the cell identified by row 7 and column 3 to row 7 and column 4
    * User copies the cell contents from the cell identified by row 8 and column 3 to row 8 and column 4
    * User waits for 1 seconds
    * User fetch the value of the cell identified by row "1" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(F1+G3)+SUM(E7:E8)"
    When User fetch the value of the cell identified by row "2" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(F2+G4)-SUM(E5:E6)"
    When User fetch the value of the cell identified by row "3" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM($E3+G2)*SIN(SUM(E4:E8))"
    When User fetch the value of the cell identified by row "4" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(F4+$F$4)-TAN(E6)"
    When User fetch the value of the cell identified by row "5" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM($E$1:$E$8)+SUM($F$1:$F$8)-SUM($D$5:E6)"
    When User fetch the value of the cell identified by row "6" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM($E$6+G5)+SUM(E1:$D$3)"
    When User fetch the value of the cell identified by row "7" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(F1:H6)*SUMPRODUCT($D$6:$D$7)"
    When User fetch the value of the cell identified by row "8" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(PRODUCT(H1:H2)-SUM(F1:F8))-$D8"
    * Validate that the cell values in the column identified by the ID "COL6" are "180.000138,179.998878,26.122869,200,1599.99888,210.00051,449.836546,32039.9478"
    * Validate that the cell values in the column identified by the ID "COL5" are "366.122869,270,-209.947604,319.67996,1489.99888,1719.99939,918.403,97613.2995"
    * Validate that the inventory total for the column with column ID "COL6" is "34299.783736"
    * Validate that the inventory total for the column with column ID "COL5" is "101741.70077"

  @WKS_Mandatory @calculation_tests @smoke_tests @INVENT-7392
  Scenario: Validate that users cannot copy paste formulae to locked product/formula or blank columns
    When User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TCPFC" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "TCPBC" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "TDBC-1" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TDFC-1" into the column header of the added column
    * User resizes all columns in the WKS to "70px"
    * User enters the formulae "=SUM(F1:F8)/SUM(F8:F7), =F1+F2*F3-F1/F5, =(F8+F7)*(F6-F5), =F2^F1, =SUM(F1:F2)*AVERAGE(F3:F8), =IF(F2>F1,F2-F1,F2+F1), =MAX(F1,G1)+MIN(F2,F1)*2, =SUM(G1:G7)" into the cells of the column with ID "COL9" in WKS
    * User enters the formulae "=SUM(F1:F8)/SUM(F8:F7), =F1+F2*F3-F1/F5, =(F8+F7)*(F6-F5), =F2^F1, =SUM(F1:F2)*AVERAGE(F3:F8), =IF(F2>F1,F2-F1,F2+F1), =MAX(F1,G1)+MIN(F2,F1)*2, =SUM(G1:G7)" into the cells of the column with ID "COL7" in WKS
    * User enters the formulae "=SUM(F1:F8)/SUM(F8:F7), =F1+F2*F3-F1/F5, =(F8+F7)*(F6-F5), =F2^F1, =SUM(F1:F2)*AVERAGE(F3:F8), =IF(F2>F1,F2-F1,F2+F1), =MAX(F1,G1)+MIN(F2,F1)*2, =SUM(G1:G7)" into the cells of the column with ID "COL4" in WKS
    * Enter the values "10, 10.11, 20.222, 30.333, 40.4444, 50.55555, 60.666666, 70.7777777" into the column with ID "COL8" in WKS
    Then Validate that the cell values in the column identified by the ID "COL9" are "2.22991087,214.197167,1329.05449,11156078400,915.002968,0.11,30,11156080800"
    * Validate that the inventory total for the column with column ID "COL9" is "11156081745.112968"
    When User clicks action icon of column "COL5"
    * User clicks on "Lock Product / Formula" in the action menu
    * User copies the cell contents from the cell identified by row 1 and column 3 to row 1 and column 5
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    * User copies the cell contents from the cell identified by row 2 and column 3 to row 2 and column 5
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    * User copies the cell contents from the cell identified by row 3 and column 3 to row 3 and column 5
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    * User copies the cell contents from the cell identified by row 4 and column 3 to row 4 and column 5
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    * User copies the cell contents from the cell identified by row 5 and column 3 to row 5 and column 5
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    * User copies the cell contents from the cell identified by row 6 and column 3 to row 6 and column 5
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    * User copies the cell contents from the cell identified by row 7 and column 3 to row 7 and column 5
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    * User copies the cell contents from the cell identified by row 8 and column 3 to row 8 and column 5
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    Then Validate that the cell values in the column identified by the ID "COL5" are ",,,,,,,"
    * Validate that the inventory total for the column with column ID "COL5" is "0"
    When User clicks action icon of column "COL7"
    * User clicks on "Lock" in the action menu
    * User copies the cell contents from the cell identified by row 1 and column 3 to row 1 and column 1
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    * User copies the cell contents from the cell identified by row 2 and column 3 to row 2 and column 1
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    * User copies the cell contents from the cell identified by row 3 and column 3 to row 3 and column 1
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    * User copies the cell contents from the cell identified by row 4 and column 3 to row 4 and column 1
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    * User copies the cell contents from the cell identified by row 5 and column 3 to row 5 and column 1
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    * User copies the cell contents from the cell identified by row 6 and column 3 to row 6 and column 1
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    * User copies the cell contents from the cell identified by row 7 and column 3 to row 7 and column 1
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    * User copies the cell contents from the cell identified by row 8 and column 3 to row 8 and column 1
    Then Validate that the message "This column is locked. Unlock to edit" is displayed
    When User clicks on Got it link
    Then Validate that the cell values in the column identified by the ID "COL7" are "2.22991087,214.197167,1329.05449,11156078400,915.002968,0.11,30,11156080800"
    * Validate that the inventory total for the column with column ID "COL7" is "11156081745.112968"
    When User clicks action icon of column "COL9"
    * User clicks on "Lock Product / Formula" in the action menu
    * User clicks action icon of column "COL4"
    * User clicks on "Lock" in the action menu
    * User bulk deletes data starting from column identified by ID "COL4"
    Then Validate that the cell values in the column identified by the ID "COL9" are "2.22991087,214.197167,1329.05449,11156078400,915.002968,0.11,30,11156080800"
    * Validate that the inventory total for the column with column ID "COL9" is "11156081745.112968"
    * Validate that the cell values in the column identified by the ID "COL4" are "2.22991087,214.197167,1329.05449,11156078400,915.002968,0.11,30,11156080800"
    * Validate that the inventory total for the column with column ID "COL4" is "11156081745.112968"
    * Validate that the cell values in the column identified by the ID "COL7" are "2.22991087,214.197167,1329.05449,11156078400,915.002968,0.11,30,11156080800"
    * Validate that the inventory total for the column with column ID "COL7" is "11156081745.112968"
