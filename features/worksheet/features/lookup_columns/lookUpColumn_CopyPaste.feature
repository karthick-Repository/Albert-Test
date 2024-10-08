Feature: Test to validate that user cannot copy paste values into the cells of the look up columns

  Background: User logs in & navigates to WKS & adds look-up columns from a reference column ID
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I add all available look up columns to the worksheet to the left of the column with column ID "COL5" as reference
    * I add 0 blank rows, 15 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * User resizes all columns in the WKS to "90px"

  @WKS_Mandatory
  Scenario: Validate that the user cannot copy paste values into the cells of to look-up columns
    When Enter the values "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15" into the column with ID "COL5" in WKS
    * User copies the cell contents from the column with ID "COL5" to column with ID "COL6"
    * User copies the cell contents from the column with ID "COL5" to column with ID "COL7"
    * User copies the cell contents from the column with ID "COL5" to column with ID "COL8"
    * User copies the cell contents from the column with ID "COL5" to column with ID "COL9"
    * User copies the cell contents from the column with ID "COL5" to column with ID "COL10"
    * User copies the cell contents from the column with ID "COL5" to column with ID "COL11"
    Then I verify that the contents of the cells in the column with ID "COL6" are not "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"
    * I verify that the contents of the cells in the column with ID "COL7" are not "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"
    * I verify that the contents of the cells in the column with ID "COL8" are not "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"
    * I verify that the contents of the cells in the column with ID "COL9" are not "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"
    * I verify that the contents of the cells in the column with ID "COL10" are not "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"
    * I verify that the contents of the cells in the column with ID "COL11" are not "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"
