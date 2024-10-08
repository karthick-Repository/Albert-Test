Feature: Tests to validate linked tasks scenarioes

  Background: User logs into the application & creates a batch task
    When User creates a project
    Then User enables worksheet for the created project
    When I add 1 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * I add 0 blank rows, 5 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    When User navigates to the WKS
    * I fetch the column names of all the formula columns in the WKS
    * User clicks action icon of column "COL5"
    * User clicks on "Create Batch Task" in the action menu
    Then "Create a Task" dialog is displayed

  @WKS_Mandatory
  Scenario: Validate that Grid has no data message is displayed when user adds a QC task
    # When I click on "Add QC Task"
    # Then I validate that the Add Property QC Tasks dialog is displayed
    # * I validate that the headers in the Add PropertyQA Tasks dialog for column containing index "001"
    When I add 2 "property" parameter groups to the task
