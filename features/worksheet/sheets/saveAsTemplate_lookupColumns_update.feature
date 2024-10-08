Feature: Tests to validate lookup columns values updated in new worksheet created from a saved as template

  Background: User logs in, Create new Project and navigate to WKS
    When User creates a project
    * User stores the details of the created project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * User waits for 5 seconds
    * I add 2 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * I add 0 blank rows, 2 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * User resizes all columns in the WKS to "70px"
    * User waits for 5 seconds
    * Enter the values "10,20" into the column with ID "COL5" in WKS
    * Enter the values "60,70" into the column with ID "COL6" in WKS

    @WKS_Mandatory
      Scenario: Validate lookup columns values of new sheet updated same as in template
        When User clicks on the action icon of row at index 1
        * User clicks on "Expand Summary" in the action menu
        * I click on open details of inventory and added below values in respective section
          | alias  | Descriptions | RSN  | RSNe  |
          | alias1 | description1 | rsn1 | rsne1 |
        * I add alias Descriptions RSN and RSNe lookup columns
        * User waits for 5 seconds
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
        * I validate that the new sheet is added in the first position
        * User waits for 2 seconds
        * I click on the plus icon in the footer of the worksheet
        * I click on "Create sheet from a template"
        * I click on "Created by me"
        * User waits for 2 seconds
        * I Delete the created template
        Then Validate lookup values as follows in duplicate sheet
          | alias  | Descriptions | RSN  | RSNe  |
          | alias1 | description1 | rsn1 | rsne1 |