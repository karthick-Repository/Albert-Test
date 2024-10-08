Feature: Tests to validate scenarios which involve creating a sheet from scratch

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS

  @WKS_Mandatory
  Scenario: Validate that user click on Save without giving sheet name then validation 'Sheet name cannot be empty' be thrown
    When I click on the plus icon in the footer of the worksheet
    Then I validate that the "Create an empty sheet,Create sheet from a template,Duplicate current sheet" options are displayed after clicking the plus icon displayed in the footer of the worksheet
    When I click on "Create an empty sheet"
    * I click on the "Create" button
    Then Validate that the message "Sheet name cannot be empty" is displayed
    When I click on the "Cancel" button
    * I click on the plus icon in the footer of the worksheet
    * I create a sheet from scratch and name it as "Sheet 1"
    Then Validate that the message "Sheet name already exists" is displayed
    When I enter a random string of length 51 as the sheet name into the sub pop-over
    * I click on the "Create" button
    Then Validate that the message "Sheet name exceeds 50 Characters." is displayed

  @WKS_Mandatory
  Scenario: Validate that users search for the right sheet among the sheets in a WKS_Mandatory
    When I create 5 sheets from scratch and name them as random 20 character alphanumeric strings
    * I search for sheet number 1
    Then I validate that sheet number 1 is in focus

  @WKS_Mandatory
  Scenario: Validate that user is able to add a basic sheet from scratch
    When I click on the plus icon in the footer of the worksheet
    * I create 1 sheets from scratch and name them as random 5 character alphanumeric strings
    Then I validate that all the sheets are added to the worksheet
    When Add "Product Design" "Blank" rows in WKS
    * Add 5 blank rows to WKS
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 5 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User reloads the page
    * User is in the WKS page
    * Enter the values "0.00000012312,123456789.123456879,1234.23456765,1,2,3,4,5,6,7" into the column with ID "COL5" in WKS
    Then Validate that the inventory total for the column with column ID "COL5" is "123458026.23457"

  @WKS_Mandatory
  Scenario: Validate formula index sequence for all sheets created in a worksheet
    When I click on the plus icon in the footer of the worksheet
    * I create 5 sheets from scratch and name them as random 10 character alphanumeric strings
    Then I validate that all the sheets are added to the worksheet
    When I add 5 blank rows, 5 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * I add 5 formula columns and 5 blank columns into the PD grid of all the sheets of the worksheet
    Then I validate that the index of formula columns in all the sheets is not broken

  @WKS_Mandatory
  Scenario: Validate the users cannot select formula from a different sheet while creating a Batch Task
    When I click on the plus icon in the footer of the worksheet
    * I create 3 sheets from scratch and name them as random 5 character alphanumeric strings
    Then I validate that all the sheets are added to the worksheet
    When I add 2 blank rows, 2 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * I add 2 formula columns and 2 blank columns into the PD grid of all the sheets of the worksheet
    * User clicks action icon of column "COL6"
    * User clicks on "Create Batch Task" in the action menu
    * "Create a Task" dialog is displayed
    Then I validate that only the formulae which are part of sheet number 1 can be set in the inventory multi select dropdown
 
  # # @WKS_Mandatory
  # # Scenario: Validate that users can move the sheets towards the left and right
  # #   When I click on the plus icon in the footer of the worksheet
  # #   * I create 3 sheets from scratch and name them as random 15 character alphanumeric strings
  # #   * I click on the action icon of sheet 1
  # #   * I click on "Move Left"
  # #   * I click on the action icon of sheet 2
  # #   * I click on "Move Right"
  # # Then I validate that the sheet order is preserved
