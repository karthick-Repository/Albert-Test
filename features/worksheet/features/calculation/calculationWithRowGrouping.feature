Feature: WKS Row grouping related validations

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * User is in the WKS page
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 9 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User reloads the page
    * User is in the WKS page
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TRGC-1" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TRGC-2" into the column header of the added column
    * User clicks action icon of column "COL7"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TRGC-3" into the column header of the added column
    * User resizes all columns in the WKS to "70px"
    * Enter the values "90, 80, 70, 60, 50, 40, 30, 20, 10" into the column with ID "COL7" in WKS
    * Enter the values "10, 20, 30, 40, 50, 60, 70, 80, 90" into the column with ID "COL8" in WKS
    * Enter the values "1, 2, 3, 4, 5, 6, 7, 8, 9" into the column with ID "COL5" in WKS
    * User enters the formulae "=SUM(E1:F2)-SUM(H1:H2)/2*0.00045, =SUMPRODUCT(E2:F5)-SUMPRODUCT(H1:H4)*(E1/F6+E3-SUM(H9:H7)*999999.99999), =((G2-G1)/SUM(F1:F9))*0.0000000123456789, =MAX(G1:G3)-MAX(E1:E9), =(AVERAGE(G1:G4)-AVERAGE(H1:H9))/(AVERAGE(E1:F9)), =PRODUCT(E1:F2)*1.1234564789, =PRODUCT(H1:H9)-SUM(E2:F7), =SUM($F1:F$9)-SUM($E$1:$E$9), =(1+1-1-1)" into the cells of the column with ID "COL6" in WKS

  @WKS_Mandatory @calculation_tests
  Scenario: Calculations & index validations involving group addition, group deletion
    When User "groups" the rows identified by indexes "1"
    * User clicks on the group rows button
    Then User validates that "1 Selected" is visible
    When User names the row as "ARG-1"
    Then User validates that the group "ARG-1" is added to the worksheet
    * Validate that the cell values in the column identified by the ID "COL6" are ",199.999325,240000097,0.006584359,240000007,2400001.43,1617777.33,362280,0,0"
    * Validate that the inventory total for the column with column ID "COL6" is "484380362.765909"
    When User enters the value "=" into the cell identified by row 1 and column 1 of the right panel in the WKS
    Then Verify that the row index is "1,2,3,4,5,6,7,8,9,10"
    * Verify that the column index is "A,B,C,D,E,F,G,H"
    When User "groups" the rows identified by indexes "3,4,5"
    * User clicks on the group rows button
    * User names the row as " "
    Then User validates that the group " " is not added to the worksheet
    When User "groups" the rows identified by indexes "3,4,5"
    Then User validates that "3 Selected" is visible
    When User clicks on the group rows button
    * User names the row as "abcd!@#$1234"
    Then User validates that the group "abcd!@#$1234" is added to the worksheet
    * Validate that the cell values in the column identified by the ID "COL6" are ",199.999325,240000097,0.006584359,240000007,,2400001.43,1617777.33,362280,0,0"
    * Validate that the inventory total for the column with column ID "COL6" is "484380362.765909"
    When User enters the value "=" into the cell identified by row 1 and column 1 of the right panel in the WKS
    Then Verify that the row index is "1,2,3,4,5,6,7,8,9,10,11"
    * Verify that the column index is "A,B,C,D,E,F,G,H"
    When User "groups" the rows identified by indexes "7,8,9"
    * User clicks on the group rows button
    * User names the row as "RoxVvUKAlJDSA20wY2sxzHDWvQuzJ2EdDQPDQIbdaGGXXkKyafZ7DfdhLLttiKLH17s3kfkgx2odWrR9FNCQNyovB4sVdwp5NJstSNrX1fEnhdXOEA8xbBJx8mxQqa2tFcxHyvM62cAQBxM590b1rSWeInAv6Nm7unmEkY0HSyzbAoOeBx679RHHXqauNLA6GT645Er6eGePJ8cyVPs1KGS3wGv9DdPc332nCijYjl3r6pjoh2gsYt56hVV"
    Then User validates that the group "RoxVvUKAlJDSA20wY2sxzHDWvQuzJ2EdDQPDQIbdaGGXXkKyafZ7DfdhLLttiKLH17s3kfkgx2odWrR9FNCQNyovB4sVdwp5NJstSNrX1fEnhdXOEA8xbBJx8mxQqa2tFcxHyvM62cAQBxM590b1rSWeInAv6Nm7unmEkY0HSyzbAoOeBx679RHHXqauNLA6GT645Er6eGePJ8cyVPs1KGS3wGv9DdPc332nCijYjl3r6pjoh2gsYt56hV" is added to the worksheet
    Then Validate that the cell values in the column identified by the ID "COL6" are ",199.999325,240000097,0.006584359,240000007,,,0,0"
    * Validate that the inventory total for the column with column ID "COL6" is "484380362.765909"
    When User enters the value "=" into the cell identified by row 1 and column 1 of the right panel in the WKS
    * User expands the row group number "7" in the work sheet
    Then Verify that the row index is "1,2,3,4,5,6,7,11,12,8,9,10"
    * Verify that the column index is "A,B,C,D,E,F,G,H"
    When User deletes blank row at index 1 from WKS
    Then User validates that the group "ARG-1" is not added to the worksheet
    Then Validate that the cell values in the column identified by the ID "COL6" are "199.999325,240000097,0.006584359,240000007,,,0,0,484380362.765909,2400001.43,1617777.33"
    * Validate that the inventory total for the column with column ID "COL6" is "362280"
    When User clicks on the action icon of row at index 5
    * User clicks on "Add a Blank Row" in the action menu
    * User names the row as "Row_Inside_Group"
    * User clicks on the search input in WKS
    * User reloads the page
    * User is in the WKS page
    * User "groups" the rows identified by indexes "1,2,10,11"
    Then User validates that "4 Selected" is visible
    When User "un-groups" the rows identified by indexes "1"
    Then User validates that "3 Selected" is visible
    When User "un-groups" the rows identified by indexes "10"
    Then User validates that "2 Selected" is visible
    When User "groups" the rows identified by indexes "1,10"
    Then User validates that the checkboxes of the rows identified by the indexes "1,2,10,11" are "checked"
    When User enters the value "=" into the cell identified by row 1 and column 1 of the right panel in the WKS
    Then Verify that the row index is "1,2,3,4,5,6,7,8,9,10,11,12"
    * Verify that the column index is "A,B,C,D,E,F,G,H"
    When User clicks on the group rows button
    * User names the row as "ARG-2"
    Then User validates that the group "ARG-2" is added to the worksheet
    When User reloads the page
    * User is in the WKS page
    * User "groups" the rows identified by indexes "1"
    * User clicks on the group rows button
    * User names the row as "ARG-3"
    * User reloads the page
    * User is in the WKS page
    * User "groups" the rows identified by indexes "1"
    * User clicks on the group rows button
    * User names the row as "ARG-4"
    * User reloads the page
    * User is in the WKS page
    * User "groups" the rows identified by indexes "1"
    * User clicks on the group rows button
    * User names the row as "ARG-5"
    * User reloads the page
    * User is in the WKS page
    * User "groups" the rows identified by indexes "1"
    * User clicks on the group rows button
    * User names the row as "ARG-6"
    * User reloads the page
    * User is in the WKS page
    * Enter the values "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17" into the column with ID "COL5" in WKS
    * Enter the values "90, 80, 70, 60, 50, 40, 30, 20, 10, -1.123, 2.234, -0.00004, 1.123456789, 0.0000009, -100, 10, 20" into the column with ID "COL7" in WKS
    * Enter the values "10, 20, 30, 40, 50, 60, 70, 80, 90, 0.0000008, 2.123456789, -0.00007, 3.456, 1.123, 123456789.123456789, 8, 9" into the column with ID "COL8" in WKS
    Then Validate that the cell values in the column identified by the ID "COL6" are ",,,,,199.997075,1683000340,,,0.644583672,1559543550,,,121.269752,5662220.65,2963938440000.0005,0"
    * Validate that the inventory total for the column with column ID "COL6" is "2967186646432.562"
    When User "groups" the rows identified by indexes "6,7,8"
    * User moves row at index 6 to index 2
    * User reloads the page
    * User is in the WKS page
    Then Validate that the cell values in the column identified by the ID "COL6" are ",199.997075,#DIV/0!,,,,,,,#DIV/0!,#DIV/0!,,,#DIV/0!,5662220.65,355687305000000,0"
    * Validate that the inventory total for the column with column ID "COL6" is "355691477207340.3"