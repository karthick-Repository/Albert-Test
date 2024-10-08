Feature: Tests to validate pricing change in new workSheet created from a template

  Background: User logs in, Create new Project and navigate to WKS
    When User creates a project
    * User stores the details of the created project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I add 2 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * I add 0 blank rows, 2 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * User resizes all columns in the WKS to "120px"
    * User waits for 5 seconds
    * Enter the values "10,20" into the column with ID "COL7" in WKS
    * Enter the values "60,70" into the column with ID "COL6" in WKS

  @WKS_Mandatory @failing_bec_of_pd_grid_state_mamnagement
  Scenario: Validate average pricing should be less than maximum and more than minimum price 
    When User clicks on the action icon of row at index 1
    * User clicks on "Expand Summary" in the action menu
    * User click on open details and added two new price with value "20" and "25" also add distinct location one Vendor name from dropdown at index "2"
    * User close the popup of inventory details
    * User clicks on the action icon of row at index 2
    * User clicks on "Expand Summary" in the action menu
    * User click on open details and added two new price with value "27" and "45" also add distinct location one Vendor name from dropdown at index "5"
    * User close the popup of inventory details
    * I expand the apps grid section in the worksheet
    * I click on the action icon of sheet 1
    * I click on "Save As Template"
    * I set a random 10 character string as the name of the sheet being duplicated
    * I "check" the checkbox number 3 in the "Product Design Grid" section
    * I click on the "Create" button to add new sheet
    * I click on the plus icon in the footer of the worksheet
    * I click on "Create sheet from a template"
    * User waits for 3 seconds
    * I click on "Created by me"
    * I select a sheet template
    * I click on the "Create" button to add new sheet
    Then I validate that the new sheet is added in the first position
    * User waits for 3 seconds
    * I click on the result grid section in the worksheet
    When I click on the plus icon in the footer of the worksheet
    * I click on "Create sheet from a template"
    * User waits for 3 seconds
    * I click on "Created by me"
    * I Delete the created template
    Then Verify average price should be less then maximum and greater then minimum in corresponding row "7" and column "COL7"