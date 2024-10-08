Feature: Tests to validate the values for different combinations of blank row, inventory row, blank column and formula column

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * User is in the WKS page

  @WKS_Mandatory @smoke_tests
  Scenario: Validate that user can enter alphanumeric characters & numbers with decimal values into cells belonging to blank row and blank column
    Given User is in the WKS page
    When Add "Product Design" "Blank" rows in WKS
    * Add 3 blank rows to WKS
    * User reloads the page
    * User is in the WKS page
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "BC-1" into the column header of the added column
    * Enter the values "5E3u74yO6QlVd2xFIjNBG0TmrXbR8Pt7Wq1oZ!@#$%^&*():}{<>?,123456789.123456879,1234.23456765" into the column with ID "COL6" in WKS
    Then Validate that the cell values in the column identified by the ID "COL6" are "5E3u74yO6QlVd2xFIjNBG0TmrXbR8Pt7Wq1oZ!@#$%^&*():}{<>?,123456789,1234.23457"
    * Validate that the inventory total for the column with column ID "COL6" is "0"

  @WKS_Mandatory @smoke_tests
  Scenario: Validate that user can enter alphanumeric characters & numbers with decimal values into cells belonging to blank row and formula column
    Given User is in the WKS page
    When Add "Product Design" "Blank" rows in WKS
    * Add 3 blank rows to WKS
    * User reloads the page
    * User is in the WKS page
    * Enter the values "5E3u74yO6QlVd2xFIjNBG0TmrXbR8Pt7Wq1oZ!@#$%^&*():}{<>?,123456789.123456879,1234.23456765" into the column with ID "COL5" in WKS
    Then Validate that the cell values in the column identified by the ID "COL5" are "5E3u74yO6QlVd2xFIjNBG0TmrXbR8Pt7Wq1oZ!@#$%^&*():}{<>?,123456789,1234.23457"
    * Validate that the inventory total for the column with column ID "COL5" is "0"

  @WKS_Mandatory @smoke_tests @calculation_tests
  Scenario: Validate that user can enter alphanumeric characters & numbers with decimal values into cells belonging to an inventory row and blank column
    Given User is in the WKS page
    When Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 3 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "BC-1" into the column header of the added column
    * User reloads the page
    * User is in the WKS page
    * Enter the values "5E3u74yO6QlVd2xFIjNBG0TmrXbR8Pt7Wq1oZ!@#$%^&*():}{<>?,123456789.123456879,1234.23456765" into the column with ID "COL6" in WKS
    Then Validate that the cell values in the column identified by the ID "COL6" are "5E3u74yO6QlVd2xFIjNBG0TmrXbR8Pt7Wq1oZ!@#$%^&*():}{<>?,123456789,1234.23457"
    * Validate that the inventory total for the column with column ID "COL6" is "123458023.23457"

  @WKS_Mandatory @smoke_tests @calculation_tests
  Scenario: Validate that user can enter only numbers with or without decimal values into cells belonging to an inventory row an inventory column
    Given User is in the WKS page
    When Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 3 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User reloads the page
    * User is in the WKS page
    * Enter the values "231453423,123456789.123456879,1234.23456765" into the column with ID "COL5" in WKS
    Then Validate that the cell values in the column identified by the ID "COL5" are "231453423,123456789,1234.23457"
    * Validate that the inventory total for the column with column ID "COL5" is "354911446.23457"
