Feature: Copy to new feature validations

  Background: User logs in and navigates to WKS
    * User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 10 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User reloads the page
    * User is in the WKS page
    * Enter the values "99, 100, 99.999999, 100.999999, 101, 99, 100, 99.999999, 100.999999,101" into the column with ID "COL5" in WKS

  @WKS_Mandatory @smoke_tests
  Scenario: Copy to new with values only validations
    When User clicks action icon of column "COL5"
    * User clicks on "Copy To New" in the action menu
    * User enters "10" into the copy to new input field
    * User selects "Copy values only" radio button
    * User waits for 1 seconds
    * User clicks on "Done"
    * User waits for 3 seconds
    * User resizes all columns in the WKS to "40px"
    * User waits for 2 seconds
    Then Validate that the cell values in the column identified by the ID "COL5" are "99,100,99.999999,100.999999,101,99,100,99.999999,100.999999,101"
    * Validate that the inventory total for the column with column ID "COL5" is "1001.999996"
    Then Validate that the cell values in the column identified by the ID "COL6" are "99,100,99.999999,100.999999,101,99,100,99.999999,100.999999,101"
    * Validate that the inventory total for the column with column ID "COL6" is "1001.999996"
    Then Validate that the cell values in the column identified by the ID "COL7" are "99,100,99.999999,100.999999,101,99,100,99.999999,100.999999,101"
    * Validate that the inventory total for the column with column ID "COL7" is "1001.999996"
    Then Validate that the cell values in the column identified by the ID "COL8" are "99,100,99.999999,100.999999,101,99,100,99.999999,100.999999,101"
    * Validate that the inventory total for the column with column ID "COL8" is "1001.999996"
    Then Validate that the cell values in the column identified by the ID "COL9" are "99,100,99.999999,100.999999,101,99,100,99.999999,100.999999,101"
    * Validate that the inventory total for the column with column ID "COL9" is "1001.999996"
    Then Validate that the cell values in the column identified by the ID "COL10" are "99,100,99.999999,100.999999,101,99,100,99.999999,100.999999,101"
    * Validate that the inventory total for the column with column ID "COL10" is "1001.999996"
    Then Validate that the cell values in the column identified by the ID "COL11" are "99,100,99.999999,100.999999,101,99,100,99.999999,100.999999,101"
    * Validate that the inventory total for the column with column ID "COL11" is "1001.999996"
    Then Validate that the cell values in the column identified by the ID "COL12" are "99,100,99.999999,100.999999,101,99,100,99.999999,100.999999,101"
    * Validate that the inventory total for the column with column ID "COL12" is "1001.999996"
    Then Validate that the cell values in the column identified by the ID "COL13" are "99,100,99.999999,100.999999,101,99,100,99.999999,100.999999,101"
    * Validate that the inventory total for the column with column ID "COL13" is "1001.999996"
    Then Validate that the cell values in the column identified by the ID "COL14" are "99,100,99.999999,100.999999,101,99,100,99.999999,100.999999,101"
    * Validate that the inventory total for the column with column ID "COL14" is "1001.999996"
    Then Validate that the cell values in the column identified by the ID "COL15" are "99,100,99.999999,100.999999,101,99,100,99.999999,100.999999,101"
    * Validate that the inventory total for the column with column ID "COL15" is "1001.999996"
