Feature: Column lock/unlock related test scenarioes

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * User is in the WKS page
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TEFCN-1" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TEFCN-2" into the column header of the added column
    * User clicks action icon of column "COL7"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TEFCN-3" into the column header of the added column
    * User clicks action icon of column "COL8"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "TEFCN-4" into the column header of the added column
    * I add 0 blank rows, 5 inventory rows of type "Consumables" into the PD grid of all the sheets of the worksheet 
    * User resizes all columns in the WKS to "70px"

  @WKS_Mandatory @smoke_tests
  Scenario: Validate that the values are rightly displayed when user performs a copy paste from one column to another column in worksheet
    Given User is in the WKS page
    When User enters the formulae "=SUM(F1:F4),=SUMPRODUCT(F1:G3)*0.0000001,=SUM(H1:H2)-H1,=SUM(E4:H4),=SUM(F1:F2)" into the cells of the column with ID "COL5" in WKS
    * Enter the values "10, 20, 30, 40, 50" into the column with ID "COL6" in WKS
    * Enter the values "60, 70, 80, 90, 100" into the column with ID "COL7" in WKS
    Then Validate that the cell values in the column identified by the ID "COL5" are "0,0.000021,20,130,0"
    * Validate that the inventory total for the column with column ID "COL5" is "150.000021"
    When User copies the cell contents from the column with ID "COL5" to column with ID "COL8"
    * User copies the cell contents from the column with ID "COL5" to column with ID "COL9"
    Then Validate that the cell values in the column identified by the ID "COL8" are "0,0,0,0,0"
    * Validate that the inventory total for the column with column ID "COL8" is "0"
    * Validate that the cell values in the column identified by the ID "COL9" are "0,0,0,0,0"
    * Validate that the inventory total for the column with column ID "COL9" is "0"
    When Enter the values "110, 120, 130, 140, 150" into the column with ID "COL7" in WKS
    Then Validate that the cell values in the column identified by the ID "COL5" are "0,0.000036,20,180,0"
    * Validate that the inventory total for the column with column ID "COL5" is "200.000036"
    * Validate that the cell values in the column identified by the ID "COL5" are "0,0.000036,20,180,0"
    * Validate that the inventory total for the column with column ID "COL5" is "200.000036"
    * User copies the cell contents from the column with ID "COL7" to column with ID "COL8"
    * User copies the cell contents from the column with ID "COL7" to column with ID "COL9"
    Then Validate that the cell values in the column identified by the ID "COL8" are "110,120,130,140,150"
    * Validate that the inventory total for the column with column ID "COL8" is "650"
    * Validate that the cell values in the column identified by the ID "COL9" are "110,120,130,140,150"
    * Validate that the inventory total for the column with column ID "COL9" is "650"

  @WKS_Mandatory @smoke_tests
  Scenario: Validate smoke test scenarios for lock/un-lock formula and blank columns
    Given User is in the WKS page
    When User enters the formulae "=SUM(F1:F4),=SUMPRODUCT(F1:G3)*0.0000001,=SUM(H1:H2)-H1,=SUM(E4:H4),=SUM(F1:F2)" into the cells of the column with ID "COL5" in WKS
    * Enter the values "10, 20, 30, 40, 50" into the column with ID "COL6" in WKS
    * Enter the values "60, 70, 80, 90, 100" into the column with ID "COL7" in WKS
    * User waits for 2 seconds
    Then Validate that the cell values in the column identified by the ID "COL5" are "0,0.000021,20,130,0"
    * Validate that the inventory total for the column with column ID "COL5" is "150.000021"
    When User locks the column identified by column ID "COL5"
    Then User validates that the column identified by column ID "COL5" is locked
    When User copies the cell contents from the column with ID "COL5" to column with ID "COL8"
    * User copies the cell contents from the column with ID "COL5" to column with ID "COL9"
    Then Validate that the cell values in the column identified by the ID "COL8" are "0,0,0,0,0"
    * Validate that the inventory total for the column with column ID "COL8" is "0"
    * Validate that the cell values in the column identified by the ID "COL9" are "0,0,0,0,0"
    * Validate that the inventory total for the column with column ID "COL9" is "0"
    When Enter the values "110, 120, 130, 140, 150" into the column with ID "COL7" in WKS
    Then Validate that the cell values in the column identified by the ID "COL5" are "0,0.000036,20,180,0"
    * Validate that the inventory total for the column with column ID "COL5" is "200.000036"
    When User unlocks the column identified by column ID "COL5"
    Then Validate that the cell values in the column identified by the ID "COL5" are "0,0.000036,20,180,0"
    * Validate that the inventory total for the column with column ID "COL5" is "200.000036"
    When User clicks action icon of column "COL9"
    Then Validate the menu options displayed when user clicks on the action icon of a blank column
    When User locks the column identified by column ID "COL7"
    * User copies the cell contents from the column with ID "COL7" to column with ID "COL8"
    * User copies the cell contents from the column with ID "COL7" to column with ID "COL9"
    Then Validate that the cell values in the column identified by the ID "COL8" are "110,120,130,140,150"
    * Validate that the inventory total for the column with column ID "COL8" is "650"
    * Validate that the cell values in the column identified by the ID "COL9" are "110,120,130,140,150"
    * Validate that the inventory total for the column with column ID "COL9" is "650"
    When User locks the column identified by column ID "COL8"
    Then User validates that the column identified by column ID "COL8" is locked
    When User locks the column identified by column ID "COL9"
    Then User validates that the blank column identified by column ID "COL9" is locked
    When Enter the values "10, 20.0001, 30!, _40, abcdef!@#" into the column with ID "COL4" in WKS
    * User locks the column identified by column ID "COL4"
    Then User validates that the blank column identified by column ID "COL4" is locked
    When User enters the formulae "=SUM(E1:E4),=SUMPRODUCT(E1:E3)*0.0000001,=SUM(E1:E2)-E1,=SUM(E3:E4),=SUM(E3:E5)" into the cells of the column with ID "COL5" in WKS
    * User locks the column identified by column ID "COL5"
    * User deletes the column identified by column ID "COL9"
    Then Validate that the cell values in the column identified by the ID "COL5" are "#ERROR!,#ERROR!,#ERROR!,#ERROR!,#ERROR!"
    * Validate that the inventory total for the column with column ID "COL5" is "0"
    When User unlocks the column identified by column ID "COL5"
    Then Validate that the cell values in the column identified by the ID "COL5" are "#REF!,#REF!,#REF!,#REF!,#REF!"
    * Validate that the inventory total for the column with column ID "COL5" is "0"
    When User fetch the value of the cell identified by row "1" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(#REF!1:#REF!4)"
    When User fetch the value of the cell identified by row "2" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUMPRODUCT(#REF!1:#REF!3)*0.0000001"
    When User fetch the value of the cell identified by row "3" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(#REF!1:#REF!2)-#REF!1"
    When User fetch the value of the cell identified by row "4" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(#REF!3:#REF!4)"
    When User fetch the value of the cell identified by row "5" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(#REF!3:#REF!5)"

  @WKS_Mandatory @calculation_tests
  Scenario: Validate that calculations do not break when user moves locked column around in the worksheet & deletes a blank column referenced in the formulae of the locked column
    Given User is in the WKS page
    When Enter the values "60, 70, 80, 90, 100" into the column with ID "COL5" in WKS
    * Enter the values "10, 20, 30, 40, 50" into the column with ID "COL7" in WKS
    * User enters the formulae "=SUM($G1:G3)+SUM(I1:$I3)+SUM($F1:F2),=SUMPRODUCT(G$1:G$3)+SUM(F2:$F3),=SUMPRODUCT($G$1:$G$5)-SUM(I1:I2)+SUM($F3:$F$4),=SUMPRODUCT(G1:G4)*2-SUM(H2:H3)+SUM($F$4:$F$5),=SUM(G1:G5)/SUM(I$1:$I$5)+SUM(F$1+$F$5)" into the cells of the column with ID "COL6" in WKS
    Then Validate that the cell values in the column identified by the ID "COL6" are "270,60,20,120,0.375"
    * Validate that the inventory total for the column with column ID "COL6" is "470.375"
    When User locks the column identified by column ID "COL6"
    * User enters the formulae "=SUM($E1:E2)*2,=SUMPRODUCT(E2:$E$3)+$F1,=SUM(F1:$F$2)/SUM($E1:$E2),=SUM(30+70)-25,=SUM(F1:$F4)-SUM(E1:E5)" into the cells of the column with ID "COL8" in WKS
    Then Validate that the cell values in the column identified by the ID "COL6" are "270,#DIV/0!,#DIV/0!,#DIV/0!,#DIV/0!"
    * Validate that the inventory total for the column with column ID "COL6" is "270"
    When Enter the values "1, 2, 3, 4, 5" into the column with ID "COL9" in WKS
    * User moves column with identified by column ID "COL6" to "COL8"
    Then Validate that the cell values in the column identified by the ID "COL6" are "287,76.6666667,100.666667,180.333333,89.0416667"
    * Validate that the inventory total for the column with column ID "COL6" is "733.708333"
    When User moves column with identified by column ID "COL6" to "COL4"
    Then Validate that the cell values in the column identified by the ID "COL6" are "287,76.6666667,100.666667,180.333333,89.0416667"
    * Validate that the inventory total for the column with column ID "COL6" is "733.708333"
    When User unlocks the column identified by column ID "COL6"
    Then Validate that the cell values in the column identified by the ID "COL6" are "287,76.6666667,100.666667,180.333333,89.0416667"
    * Validate that the inventory total for the column with column ID "COL6" is "733.708333"
    When User locks the column identified by column ID "COL6"
    * User deletes the column identified by column ID "COL9"
    Then Validate that the cell values in the column identified by the ID "COL6" are "#ERROR!,#ERROR!,#ERROR!,#ERROR!,#ERROR!"
    * Validate that the inventory total for the column with column ID "COL6" is "0"
    When User unlocks the column identified by column ID "COL6"
    Then Validate that the cell values in the column identified by the ID "COL6" are "#ERROR!,#ERROR!,#ERROR!,#ERROR!,#ERROR!"
    * Validate that the inventory total for the column with column ID "COL6" is "0"

  @WKS_Mandatory @calculation_tests
  Scenario: Validate that calculations do not break when uses formulae which refer to the cells of the locked column
    Given User is in the WKS page
    * Add "Product Design" "Blank" rows in WKS
    * Add 3 blank rows to WKS
    * User reloads the page
    * User is in the WKS page
    * Enter the values "90, 100, 110, 120, 130, 140, 150, 160" into the column with ID "COL5" in WKS
    * Enter the values "10, 20, 30, 40, 50, 60, 70, 80" into the column with ID "COL7" in WKS
    * User enters the formulae "=SUM($G1:G3)+SUM(I1:$I3)+SUM($F1:F2),=SUMPRODUCT(G$1:G$3)+SUM(F2:$F3),=SUMPRODUCT($G$1:$G$5)-SUM(I1:I2)+SUM($F3:$F$4),=SUMPRODUCT(G1:G4)*2-SUM(H2:H3)+SUM($F$4:$F$5),=SUM(G1:G5)/SUM(I$1:$I$5)+SUM(F$1+$F$5),=SUM(G1:I1),=PRODUCT(G5:I5),=H7/SUM(G1:I7)" into the cells of the column with ID "COL6" in WKS
    Then Validate that the cell values in the column identified by the ID "COL6" are "360,60,-40,180,0.272727273,460,1772.72727,0.453035337"
    * Validate that the inventory total for the column with column ID "COL6" is "2413.453033"
    When User locks the column identified by column ID "COL6"
    * User enters the formulae "=SUM($E1:E2)*2, =SUMPRODUCT(E2:$E$3)+$F1, =SUM(F1:$F$2)/SUM($E1:$E2), =SUM(30+70)-25, =SUM(F1:$F4)-SUM(E1:E5), =SUM(H1:H8)-H5, =SUM(H1:H8), =SUMPRODUCT(F1:F2)" into the cells of the column with ID "COL8" in WKS
    Then Validate that the cell values in the column identified by the ID "COL8" are "0,0,#DIV/0!,75,#DIV/0!,#DIV/0!,#DIV/0!,0"
    * Validate that the inventory total for the column with column ID "COL8" is "75"
    When Enter the values "1,2,3,4,5,6,7,8" into the column with ID "COL9" in WKS
    Then Validate that the cell values in the column identified by the ID "COL8" are "6,11,5.66666667,75,82.6666667,579318.723,579407.662,17"
    * Validate that the inventory total for the column with column ID "COL8" is "1158901.051667"

  @WKS_Mandatory @calculation_tests
  Scenario: Validate that calculations do not break when uses moves around those rows in WKS which are referenced in the locked formula column
    Given User is in the WKS page
    When Add "Product Design" "Blank" rows in WKS
    * Add 3 blank rows to WKS
    * User reloads the page
    * User is in the WKS page
    * Enter the values "90, 100, 110, 120, 130, 140, 150, 160" into the column with ID "COL5" in WKS
    * Enter the values "10, 20, 30, 40, 50, 60, 70, 80" into the column with ID "COL7" in WKS
    * User enters the formulae "=SUM($G1:G3)+SUM(I1:$I3)+SUM($F1:F2)+SUM(E1:F2),=SUMPRODUCT(G$1:G$3)+SUM(F2:$F3)+SUM(E2:F3),=SUMPRODUCT($G$1:$G$5)-SUM(I1:I2)+SUM($F3:$F$4)+SUM(E3:F4),=SUMPRODUCT(G1:G4)*2-SUM(H2:H3)+SUM($F$4:$F$5)+SUM(E4:F5),=SUM(G1:G5)/SUM(I$1:$I$5)+SUM(F$1+$F$5)+SUM(E5:F6),=SUM(G1:I1)+SUM(E6:F7),=PRODUCT(G5:I5)+SUM(E7:F8),=H7/SUM(G1:I7)+SUM(E1:F1)" into the cells of the column with ID "COL6" in WKS
    Then Validate that the cell values in the column identified by the ID "COL6" are "360,60,-40,180,0.272727273,460,1772.72727,0.453035337"
    * Validate that the inventory total for the column with column ID "COL6" is "2413.453033"
    When User locks the column identified by column ID "COL6"
    * User enters the formulae "=SUM(E1:E3)+G1,=SUM(E2:E4)+G2,=SUM(E3:E3)+G3,=SUM(E4:E6)+G4,=SUM(E5:E7)+G5,=SUM(E6:E8)+G6,=SUM(F5:F6)+G7,=SUM(F6:F6)+G8" into the cells of the column with ID "COL8" in WKS
    Then Validate that the cell values in the column identified by the ID "COL8" are "10,20,30,40,50,60,180,140"
    * Validate that the inventory total for the column with column ID "COL8" is "470"
    When Enter the values "1,2,3,4,5,6,7,8" into the column with ID "COL9" in WKS
    Then Validate that the cell values in the column identified by the ID "COL8" are "16,29,33,55,68,81,219,161"
    * Validate that the inventory total for the column with column ID "COL8" is "584"
    When User moves row at index 1 to index 7
    Then Validate that the cell values in the column identified by the ID "COL6" are "453,189,143,123,244.272727,866,1588167.73,17.9980279"
    * Validate that the inventory total for the column with column ID "COL6" is "1695342.002321"
    When User deletes blank row at index 1 from WKS
    Then Validate that the cell values in the column identified by the ID "COL6" are "#ERROR!,#ERROR!,#ERROR!,#ERROR!,#ERROR!,#ERROR!,#ERROR!"
    * Validate that the inventory total for the column with column ID "COL6" is "0"
    When User unlocks the column identified by column ID "COL6"
    Then Validate that the cell values in the column identified by the ID "COL6" are "#REF!,#REF!,#REF!,#REF!,#REF!,#ERROR!,#REF!"
    * Validate that the inventory total for the column with column ID "COL6" is "0"

  @WKS_Mandatory @calculation_tests
  Scenario: Validate that calculations do not break when performs filter operation on the columns which are locked in WKS
    Given User is in the WKS page
    When Add "Product Design" "Blank" rows in WKS
    * Add 3 blank rows to WKS
    * User reloads the page
    * User is in the WKS page
    * Enter the values "90, 100, 110, 120, 130, 140, 150, 160" into the column with ID "COL8" in WKS
    * Enter the values "10, 20, 30, 40, 50, 60, 70, 80" into the column with ID "COL9" in WKS
    * User enters the formulae "=SUM(E1:F1)-F1,=SUM(E2:F3)-SUMPRODUCT(E1:F1),=SUMPRODUCT(E1:F3)/123456789.123456789,=E1/SUM(F1:F4)*G3,=SIN(E1)/TAN(F2),=SUM(E1:E8)+SUM(F1:F8),=SUMPRODUCT(E7:F8)-SUM(F1:F3),=123456789/0.000000009*G4" into the cells of the column with ID "COL7" in WKS
    * User enters the formulae "=SUM(F1:F1)-F1,=SUM(F2:G3)-SUMPRODUCT(F1:F1),=SUMPRODUCT(F1:G3)/123456789.123456789,=F1/SUM(F1:G4)*H3,=SIN(H3),=SUM(F1:F8)+SUM(F1:F8),=SUMPRODUCT(F7:G8)-SUM(G1:G3),=123456789/0.000000009*H4" into the cells of the column with ID "COL6" in WKS
    * User enters the formulae "=SUM(G1:G1)-G1,=SUM(G2:H3)-SUMPRODUCT(G1:G1),=SUMPRODUCT(G1:H3)/123456789.123456789,=G1/SUM(G1:H4)*I3,=SIN(I3),=SUM(G1:G8)+SUM(G1:G8),=SUMPRODUCT(G7:H8)-SUM(H1:H3),=123456789/0.000000009*I4" into the cells of the column with ID "COL5" in WKS
    Then Validate that the cell values in the column identified by the ID "COL7" are "10,160,0.000002916,6.9e-8,0.926444515,1360,160,952380951"
    Then Validate that the cell values in the column identified by the ID "COL6" are "0,280.000003,0.000003807,5.81e-7,0.000003807,2000,952381251,7966101700"
    Then Validate that the cell values in the column identified by the ID "COL5" are "0,430.00001,0.000003645,8.1e-8,0.000003645,1904765280,9870863780,1111111110"
    Then Validate that the inventory total for the column with column ID "COL5" is "12886740170.000004"
    * Validate that the inventory total for the column with column ID "COL6" is "8918484951.000004"
    * Validate that the inventory total for the column with column ID "COL7" is "952382471.926445"
    When User locks the column identified by column ID "COL5"
    * User locks the column identified by column ID "COL6"
    * User locks the column identified by column ID "COL7"
    When User clicks the filter icon
    * User applies filter for columns containing text "004"
    * Enter the values "100, 200, 300, 400, 500, 600, 700, 800" into the column with ID "COL8" in WKS
    * User clears all the applied filters from "WKS Page"
    When User unlocks the column identified by column ID "COL5"
    * User unlocks the column identified by column ID "COL6"
    * User unlocks the column identified by column ID "COL7"
    Then Validate that the cell values in the column identified by the ID "COL7" are "10,440,0.000005346,5.3e-8,0.303493874,3960,1050,733333333"
    * Validate that the cell values in the column identified by the ID "COL6" are "0,840.000005,0.000008505,5.87e-7,0.000008505,7200,733335433,8045977010"
    * Validate that the cell values in the column identified by the ID "COL5" are "0,1270.00002,0.000010449,8.1e-8,0.000010449,1466677590,9512645990,1111111110"
    * Validate that the inventory total for the column with column ID "COL5" is "12090434690.000011"
    * Validate that the inventory total for the column with column ID "COL6" is "8779319643.00001"
    * Validate that the inventory total for the column with column ID "COL7" is "733338343.303494"
