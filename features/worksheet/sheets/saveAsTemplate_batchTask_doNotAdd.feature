Feature: Tests to validate worksheet save as template and create worksheet from template functionality and respective values

  Background: User logs in, Create new Project and navigate to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I add 0 blank rows, 1 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * I add 0 blank rows, 1 inventory rows of type "Consumables" into the PD grid of all the sheets of the worksheet
    * I add 2 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * User resizes all columns in the WKS to "70px"
    * User is in the WKS page

@WKS_Mandatory
  Scenario: Validate No batch task should be displayed in new sheet if created from a template which contains 1 task
    When User clicks action icon of column "COL5"
    * User clicks on "Create Batch Task" in the action menu
    * User select "3" inventory select "g" as unit and "100" as quantity and click on create button
    * User waits for 4 seconds
    * User is in the WKS page
    * User waits for 4 seconds
    * I click on the product design grid section in the worksheet
    * I expand the apps grid section in the worksheet
    Then Verify "1 Task" should be shown in cell corresponding to row "6" and column "COL5"
    * I click on the action icon of sheet 1
    * I click on "Save As Template"
    * I set a random 10 character string as the name of the sheet being duplicated
    * I "check" the checkbox number 3 in the "Product Design Grid" section
    * I click on the "Create" button to add new sheet
    * I click on the plus icon in the footer of the worksheet
    * I click on "Create sheet from a template"
    * I click on "Created by me"
    * User waits for 2 seconds
    * I select a sheet template
    * I click on the "Create" button to add new sheet
    * User waits for 2 seconds
    * I validate that the new sheet is added in the first position
    * I click on the product design grid section in the worksheet
    * User waits for 5 seconds
    * I click on the result grid section in the worksheet
    When I click on the plus icon in the footer of the worksheet
    * I click on "Create sheet from a template"
    * I click on "Created by me"
    * User waits for 2 seconds
    * I Delete the created template
    Then Verify "No Tasks" should be shown in cell corresponding to row "6" and column "COL5"
    * Verify "No Tasks" should be shown in cell corresponding to row "6" and column "COL6"
    * Verify "No Tasks" should be shown in cell corresponding to row "6" and column "COL7"