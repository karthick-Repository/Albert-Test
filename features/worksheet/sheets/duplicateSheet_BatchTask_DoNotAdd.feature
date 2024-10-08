Feature: Tests to validate batch task should not be displayed in duplicate sheet

  Background: User logs in, Create new Project and navigate to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I add 0 blank rows, 1 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * I add 0 blank rows, 1 inventory rows of type "Consumables" into the PD grid of all the sheets of the worksheet
    * I add 2 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * User reloads the page
    * User is in the WKS page
 
  @WKS_Mandatory
  Scenario: Validate batch task should not be displayed in duplicate sheet
    When User clicks action icon of column "COL5"
    * User clicks on "Create Batch Task" in the action menu
    * User select "3" inventory select "g" as unit and "100" as quantity and click on create button
    * User waits for 5 seconds
    * User resizes all columns in the WKS to "130px"
    * User is in the WKS page
    * I click on the product design grid section in the worksheet
    * I expand the apps grid section in the worksheet
    Then Verify "1 Task" should be shown in cell corresponding to row "6" and column "COL5"
    When I duplicate sheet number 1
    * I set a random 10 character string as the name of the sheet being duplicated
    * I "check" the checkbox number 3 in the "Product Design Grid" section
    * I click on the "Create" button to add new sheet
    * I validate that the new sheet is added in the first position
    * User waits for 5 seconds
    * I click on the product design grid section in the worksheet
    When I expand or collapse the row with aria-indexes "3"
    Then Verify "No Tasks" should be shown in cell corresponding to row "6" and column "COL5"
    * Verify "No Tasks" should be shown in cell corresponding to row "6" and column "COL6"
    * Verify "No Tasks" should be shown in cell corresponding to row "6" and column "COL7"

  @WKS_Mandatory
  Scenario: Validate 1 batch task should be displayed in sheet
    When User clicks action icon of column "COL5"
    * User clicks on "Create Batch Task" in the action menu
    * User select "3" inventory select "g" as unit and "100" as quantity and click on create button
    * User waits for 5 seconds
    * User resizes all columns in the WKS to "130px"
    * User is in the WKS page
    * I click on the product design grid section in the worksheet
    * I expand the apps grid section in the worksheet
    Then Verify "1 Task" should be shown in cell corresponding to row "6" and column "COL5"
    * Verify "1 Task" should be shown in cell corresponding to row "6" and column "COL6"
    * Verify "1 Task" should be shown in cell corresponding to row "6" and column "COL7"