Feature: Formula and reference handling validations when user deletes row/column from worksheet

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * User is in the WKS page
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 5 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "FC-1" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "FC-2" into the column header of the added column

  @WKS_Mandatory @calculation_tests
  Scenario: Calculation with most used formulae in prod
    Given User is in the WKS page
    * User resizes all columns in the WKS to "70px"
    When User enters the formulae "=1.008877664+9.999999999, =SQRT(E1) * 0.000000099, =AVEDEV(E1:E2), =ROUND((3.14*(E2/100)*E3/60),2), =SUMPRODUCT($E1:$E4,E1:E4)/100" into the cells of the column with ID "COL7" in WKS
    Then Validate that the cell values in the column identified by the ID "COL7" are "11.0088777,3.28e-7,5.50443867,0,1.51494232"
    * Validate that the inventory total for the column with column ID "COL7" is "18.028259"
    When User enters the formulae "=SUMPRODUCT($E1,E5)/10, =(ABS((E1*E2/100)/(1-((E5-(E1*E3/100))/0.99626)))), =(E5*100), =STDEV.S(E1:F3), =IF(E4=0,(F1+F2)/F1)" into the cells of the column with ID "COL6" in WKS
    Then Validate that the cell values in the column identified by the ID "COL6" are "1.66778147,4.13e-7,151.494232,60.5086636,1.00000025"
    * Validate that the inventory total for the column with column ID "COL6" is "214.670678"
    When User enters the formulae "=COUNT(E1:F5), =MAX(E1:F5) * 0.000000099, =MEDIAN(E1:F5), =LOG(F3,10), =SUM(E1:F5)" into the cells of the column with ID "COL5" in WKS
    Then Validate that the cell values in the column identified by the ID "COL5" are "10,0.000014998,1.5913619,2.1803961,232.698937"
    * Validate that the inventory total for the column with column ID "COL5" is "246.47071"

  @WKS_Mandatory @calculation_tests
  Scenario: Verify Proper Handling of Cell References and Formula Errors When Rows and Columns Referenced in Formulas are Deleted from a Worksheet
    Given User is in the WKS page
    When Add "Product Design" "Blank" rows in WKS
    * Add 3 blank rows to WKS
    * User clicks action icon of column "COL7"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "TBC-1" into the column header of the added column
    * User resizes all columns in the WKS to "70px"
    * Enter the values "10, 20, 30, 40, 50, 60, 70, 80" into the column with ID "COL8" in WKS
    * Enter the values "90, 100, 120, 130, 140, 150, 160, 170" into the column with ID "COL7" in WKS
    * Enter the values "180, 190, 200, 210, 220, 230, 240, 250" into the column with ID "COL6" in WKS
    * User enters the formulae "a;kjcncn!!#@3e231, =SUM(F2:G3)+E3, =SUM(E2:F3)+G3, =SUM(E7:F6)/SUM($F3:$G3), =SUM(E8:F7)/SUM(F3:G3), =SUM($E1:$E3)+F8, =SUM(E2:F2)+E3, =SUM(E1:F1)+G8" into the cells of the column with ID "COL5" in WKS
    * User deletes blank row at index 1 from WKS
    * User reloads the page
    * User is in the WKS page
    Then Validate that the cell values in the column identified by the ID "COL5" are "640,470,1.375,1.5,#REF!,150,#REF!"
    * Validate that the inventory total for the column with column ID "COL5" is "152.875"
    When User fetch the value of the cell identified by row "1" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(F1:G2)+E2"
    When User fetch the value of the cell identified by row "2" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:F2)+G2"
    When User fetch the value of the cell identified by row "3" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E6:F5)/SUM($F2:$G2)"
    When User fetch the value of the cell identified by row "4" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E7:F6)/SUM(F2:G2)"
    When User fetch the value of the cell identified by row "5" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM($E#REF!:$E2)+F7"
    When User fetch the value of the cell identified by row "6" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:F1)+E2"
    When User fetch the value of the cell identified by row "7" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E#REF!:F#REF!)+G7"
    When User deletes the column identified by column ID "COL8"
    * User reloads the page
    * User is in the WKS page
    Then Validate that the cell values in the column identified by the ID "COL5" are "#REF!,#REF!,#REF!,#REF!,#REF!,#REF!,#REF!"
    * Validate that the inventory total for the column with column ID "COL5" is "0"

  @WKS_Mandatory @calculation_tests
  Scenario: Validate that the formula is not retained in a formula cell when the value is negative
    Given User is in the WKS page
    When Add "Product Design" "Blank" rows in WKS
    * Add 3 blank rows to WKS
    * User resizes all columns in the WKS to "70px"
    * Enter the values "10, 20, 30, 40, 50, 60, 70, 80" into the column with ID "COL7" in WKS
    * Enter the values "90, 100, 110, 120, 130, 140, 150, 160" into the column with ID "COL6" in WKS
    * User enters the formulae "=SUM($E1:F1)-SUM(E2:$F2), =SUM(E2:$F2)-SUM(E3:$F3), =SUM($E$3:F3)-SUM(E4:$F$4), =SUM($E$4:$F$4)-SUM($E$5:$F$5), =SUM(E5:F5)-SUM(E6:F6), =SUM(E6:F6)-SUM(E1:E8), =SUM(E1:E8)-SUM(F1:F8), =SUMPRODUCT(E1:E8)-SUMPRODUCT(F1:F8)" into the cells of the column with ID "COL5" in WKS
    * User fetch the value of the cell identified by row "1" in column identified by ID "COL5" in WKS
    When User fetch the value of the cell identified by row "1" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM($E1:F1)-SUM(E2:$F2)"
    When User fetch the value of the cell identified by row "2" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E2:$F2)-SUM(E3:$F3)"
    When User fetch the value of the cell identified by row "3" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM($E$3:F3)-SUM(E4:$F$4)"
    * User fetch the value of the cell identified by row "4" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is ""
    When User fetch the value of the cell identified by row "5" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is ""
    When User fetch the value of the cell identified by row "6" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is ""
    When User fetch the value of the cell identified by row "7" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is ""
    When User fetch the value of the cell identified by row "8" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is ""
    * Validate that the inventory total for the column with column ID "COL5" is "0"