Feature: Tests to validate lookup columns with values should be added in duplicate worksheet
 
  Background: User logs in, Create new Project and navigate to WKS
    When User creates a project
    * User stores the details of the created project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I add 0 blank rows, 3 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * I add 2 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * User resizes all columns in the WKS to "70px"
    * User is in the WKS page
 
  @WKS_Mandatory
  Scenario: Validate that user should be able to see lookup columns with values in duplicate worksheet
    When User clicks on the action icon of row at index 1
    * User clicks on "Expand Summary" in the action menu
    * I click on open details of inventory and added below values in respective section
      | alias  | Descriptions | RSN  | RSNe  |
      | alias1 | description1 | rsn1 | rsne1 |
    * I add alias Descriptions RSN and RSNe lookup columns
    * I duplicate sheet number 1
    * I set a random 10 character string as the name of the sheet being duplicated
    * I "check" the checkbox number 3 in the "Product Design Grid" section
    * I click on the "Create" button to add new sheet
    * User waits for 2 seconds
    Then I validate that the new sheet is added in the first position
    * User waits for 2 seconds
    Then Validate lookup values as follows in duplicate sheet
      | alias  | Descriptions | RSN  | RSNe  |
      | alias1 | description1 | rsn1 | rsne1 |