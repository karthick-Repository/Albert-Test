Feature: Validations WKS calculations with column re-order

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
    * User clicks action icon of column "COL7"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "FC-3" into the column header of the added column
    * User clicks action icon of column "COL8"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "FC-4" into the column header of the added column
    * User resizes all columns in the WKS to "70px"
    * Enter the values "10, 20, 30, 40, 50" into the column with ID "COL9" in WKS
    * Enter the values "60, 70, 80, 90, 100" into the column with ID "COL8" in WKS
    * Enter the values "110, 120, 130, 140, 150" into the column with ID "COL7" in WKS

  @WKS_Mandatory @index_tests
  Scenario: Validate that the cell indexes are updated automatically when user re-orders columns in a WKS
    Given User is in the WKS page
    When User enters the formulae "=SUM(E1:G2),=SUM(E2:G3),=SUM(E3:G4),=SUM(E4:G5),=SUM(E1:G5)-H4" into the cells of the column with ID "COL6" in WKS
    * User moves column with identified by column ID "COL6" to "COL9"
    * User fetch the value of the cell identified by row "1" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:G2)"
    * User fetch the value of the cell identified by row "2" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E2:G3)"
    * User fetch the value of the cell identified by row "3" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E3:G4)"
    * User fetch the value of the cell identified by row "4" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E4:G5)"
    * User fetch the value of the cell identified by row "5" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:G5)-H4"
    * Validate that the cell values in the column identified by the ID "COL6" are "390,450,510,570,630"
    * Validate that the inventory total for the column with column ID "COL6" is "2550"
    * User moves column with identified by column ID "COL6" to "COL5"
    * User fetch the value of the cell identified by row "1" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:G2)"
    * User fetch the value of the cell identified by row "2" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E2:G3)"
    * User fetch the value of the cell identified by row "3" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E3:G4)"
    * User fetch the value of the cell identified by row "4" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E4:G5)"
    * User fetch the value of the cell identified by row "5" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:G5)-H4"
    * Validate that the cell values in the column identified by the ID "COL6" are "390,450,510,570,630"
    * Validate that the inventory total for the column with column ID "COL6" is "2550"
    * User moves column with identified by column ID "COL6" to "COL8"
    * User fetch the value of the cell identified by row "1" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:H2)"
    * User fetch the value of the cell identified by row "2" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E2:H3)"
    * User fetch the value of the cell identified by row "3" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E3:H4)"
    * User fetch the value of the cell identified by row "4" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E4:H5)"
    * User fetch the value of the cell identified by row "5" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:H5)-F4"
    * Validate that the cell values in the column identified by the ID "COL6" are "#CYCLE!,#CYCLE!,#CYCLE!,#CYCLE!,#CYCLE!"
    * Validate that the inventory total for the column with column ID "COL6" is "0"
    * User moves column with identified by column ID "COL6" to "COL7"
    * User clicks action icon of column "COL8"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "FC-5" into the column header of the added column
    * User fetch the value of the cell identified by row "1" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:H2)"
    * User fetch the value of the cell identified by row "2" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E2:H3)"
    * User fetch the value of the cell identified by row "3" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E3:H4)"
    * User fetch the value of the cell identified by row "4" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E4:H5)"
    * User fetch the value of the cell identified by row "5" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:H5)-I4"
    * Validate that the cell values in the column identified by the ID "COL6" are "390,450,510,570,630"
    * Validate that the inventory total for the column with column ID "COL6" is "2550"
    * User moves column with identified by column ID "COL7" to "COL10"
    * User fetch the value of the cell identified by row "1" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:F2)"
    * User fetch the value of the cell identified by row "2" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E2:F3)"
    * User fetch the value of the cell identified by row "3" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E3:F4)"
    * User fetch the value of the cell identified by row "4" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E4:F5)"
    * User fetch the value of the cell identified by row "5" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:F5)-I4"
    * Validate that the cell values in the column identified by the ID "COL6" are "260,300,340,380,420"
    * Validate that the inventory total for the column with column ID "COL6" is "1700"
    * User moves column with identified by column ID "COL7" to "COL5"
    * User fetch the value of the cell identified by row "1" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:J2)"
    * User fetch the value of the cell identified by row "2" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E2:J3)"
    * User fetch the value of the cell identified by row "3" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E3:J4)"
    * User fetch the value of the cell identified by row "4" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E4:J5)"
    * User fetch the value of the cell identified by row "5" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:J5)-H4"
    * Validate that the cell values in the column identified by the ID "COL6" are "#CYCLE!,#CYCLE!,#CYCLE!,#CYCLE!,#CYCLE!"
    * Validate that the inventory total for the column with column ID "COL6" is "0"

  @WKS_Mandatory @index_tests
  Scenario: Validate that the cell indexes are updated automatically when user moves columns with cells referencing to other individual cells
    Given User is in the WKS page
    When User enters the formulae "=E1+G5+F3,=F5-E1,=G5+F3-E2/2,=E1*0.001+F5+G2,=((E2-E1+F1)*(E3))/F2" into the cells of the column with ID "COL6" in WKS
    * User moves column with identified by column ID "COL6" to "COL9"
    * User fetch the value of the cell identified by row "1" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=E1+G5+F3"
    * User fetch the value of the cell identified by row "2" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=F5-E1"
    * User fetch the value of the cell identified by row "3" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=G5+F3-E2/2"
    * User fetch the value of the cell identified by row "4" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=E1*0.001+F5+G2"
    * User fetch the value of the cell identified by row "5" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=((E2-E1+F1)*(E3))/F2"
    * Validate that the cell values in the column identified by the ID "COL6" are "240,90,220,220.01,30"
    * Validate that the inventory total for the column with column ID "COL6" is "800.01"
    * User moves column with identified by column ID "COL6" to "COL8"
    * User fetch the value of the cell identified by row "1" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=E1+H5+G3"
    * User fetch the value of the cell identified by row "2" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=G5-E1"
    * User fetch the value of the cell identified by row "3" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=H5+G3-E2/2"
    * User fetch the value of the cell identified by row "4" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=E1*0.001+G5+H2"
    * User fetch the value of the cell identified by row "5" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=((E2-E1+G1)*(E3))/G2"
    * Validate that the cell values in the column identified by the ID "COL6" are "240,90,220,220.01,30"
    * Validate that the inventory total for the column with column ID "COL6" is "800.01"
    * User moves column with identified by column ID "COL6" to "COL5"
    * User fetch the value of the cell identified by row "1" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=E1+G5+F3"
    * User fetch the value of the cell identified by row "2" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=F5-E1"
    * User fetch the value of the cell identified by row "3" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=G5+F3-E2/2"
    * User fetch the value of the cell identified by row "4" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=E1*0.001+F5+G2"
    * User fetch the value of the cell identified by row "5" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=((E2-E1+F1)*(E3))/F2"
    * Validate that the cell values in the column identified by the ID "COL6" are "240,90,220,220.01,30"
    * Validate that the inventory total for the column with column ID "COL6" is "800.01"
