Feature: Copy from existing with calculations related validations

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When I add 4 blank rows, 5 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet

  @WKS_Mandatory @calculation_tests
  Scenario: Validate that the cell references are auto-updated when user performs copy from existing operation involving multiple column formulae
    When User navigates to the WKS
    * User is in the WKS page
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TCNEFC-1" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TCNEFC-2" into the column header of the added column
    * User clicks action icon of column "COL7"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TCNEFC-3" into the column header of the added column
    * User clicks action icon of column "COL8"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TCNEFC-4" into the column header of the added column
    * User clicks action icon of column "COL9"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TCNEFC-5" into the column header of the added column
    * User resizes all columns in the WKS to "70px"
    * Enter the values "1, 2, 3, 4, 5, 6, 7, 8, 9" into the column with ID "COL5" in WKS
    * Enter the values "10, 20, 30, 40, 50, 60, 70, 80, 90" into the column with ID "COL6" in WKS
    * User enters the formulae "=SUM(I1:J3), =PRODUCT(I2:J3)-H1, =SUMPRODUCT(I4:I9)+SQRT(SUM(J1:J9)), =SQRTPI(PRODUCT(I1:J2)/2*0.00121+SUM(J1:J9)), =AVERAGEA(I5:J7), =MAXA(I1:J9)/H5, =POWER(J5,25), =POWER(SUM(H1:H7),2), =SUM(H1:H8)-SQRT(H2)/25" into the cells of the column with ID "COL7" in WKS
    * Enter the values "11, 12, 13, 14, 15, 16, 17, 18, 19" into the column with ID "COL8" in WKS
    * Enter the values "1, 2, 3, 4, 5, 6, 7, 8, 9" into the column with ID "COL9" in WKS
    * Validate that the cell values in the column identified by the ID "COL9" are "1,2,3,4,5,6,7,8,9"
    * I perform Copy From Existing on column with ID "COL10" using column containing index "003" "involving calculation"
    Then Validate that the cell values in the column identified by the ID "COL10" are "42,894,50.61895,20.6062317,11,1.72727273,2.52511683e+29,6.376215e+58,6.376215e+58"
    * Validate that the inventory total for the column with column ID "COL10" is "1018.225182"
    When User fetch the value of the cell identified by row "1" in column identified by ID "COL10" in WKS
    Then Validate that the value fetched from the cell is "=SUM(F1:G3)"
    When User fetch the value of the cell identified by row "2" in column identified by ID "COL10" in WKS
    Then Validate that the value fetched from the cell is "=PRODUCT(F2:G3)-E1"
    When User fetch the value of the cell identified by row "3" in column identified by ID "COL10" in WKS
    Then Validate that the value fetched from the cell is "=SUMPRODUCT(F4:F9)+SQRT(SUM(G1:G9))"
    When User fetch the value of the cell identified by row "4" in column identified by ID "COL10" in WKS
    Then Validate that the value fetched from the cell is "=SQRTPI(PRODUCT(F1:G2)/2*0.00121+SUM(G1:G9))"
    When User fetch the value of the cell identified by row "5" in column identified by ID "COL10" in WKS
    Then Validate that the value fetched from the cell is "=AVERAGEA(F5:G7)"
    When User fetch the value of the cell identified by row "6" in column identified by ID "COL10" in WKS
    Then Validate that the value fetched from the cell is "=MAXA(F1:G9)/E5"
    When User fetch the value of the cell identified by row "7" in column identified by ID "COL10" in WKS
    Then Validate that the value fetched from the cell is "=POWER(G5,25)"
    When User fetch the value of the cell identified by row "8" in column identified by ID "COL10" in WKS
    Then Validate that the value fetched from the cell is "=POWER(SUM(E1:E7),2)"
    When User fetch the value of the cell identified by row "9" in column identified by ID "COL10" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:E8)-SQRT(E2)/25"
