Feature: Tests to validate calculations which involve look up columns

  Background: User logs in & navigates to WKS & adds look-up columns from a reference column ID
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I add all available look up columns to the worksheet to the left of the column with column ID "COL5" as reference
    * I add 0 blank rows, 3 inventory rows of type "Consumables" into the PD grid of all the sheets of the worksheet
    * User resizes all columns in the WKS to "50px"
    * User enters the formulae "=SUM(E1:K1),=SUM(E2:J2)+1,=SUM(E3:J3)/0" into the cells of the column with ID "COL5" in WKS

  @WKS_Mandatory
  Scenario: Validate that user should not be able to refer look up columns as calculation reference
    Then Validate that the cell values in the column identified by the ID "COL5" are "0,1,#DIV/0!"
    When I delete all the look up columns with IDs from "COL6" to "COL8"
    Then Validate that the cell values in the column identified by the ID "COL5" are "#REF!,#REF!,#REF!"
    When User fetch the value of the cell identified by row "1" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E1:#REF!1)"
    When User fetch the value of the cell identified by row "2" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E2:#REF!2)+1"
    When User fetch the value of the cell identified by row "3" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(E3:#REF!3)/0"
