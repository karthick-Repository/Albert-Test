Feature: Tests to validate  apps grid scenarios which involve duplicating current sheet

Background: User logs into the application & clicks on create task
  When User creates a project
  Then User enables worksheet for the created project
  When I add 2 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
  * User navigates to the WKS
  * User is in the WKS page
  * I fetch the column names of all the formula columns in the WKS

@Delete_Task @WKS_Mandatory
Scenario: User can add a Property Task against any formula column in Result Grid
  When User clicks action icon of column "COL5"
  * User clicks on "Create Property Task" in the action menu
  * I create 2 propety task with the formulas present in the worksheet with 2 datatemplates, 0 tags and a random note of length 200 characters
  Then I validate that the message "has been created and sent to the Task Module" is displayed
  When I expand or collapse the row with aria-indexes "2,3"
  * User expands the row group number "1" in the work sheet
  Then I validate that 2 intermediate row expansion icons are displayed
  When I "expand" the intermate row at index 1 in the product design grid
  Then User validates that the row "No Data Rows" is added to the worksheet
  When I "expand" the intermate row at index 1 in the product design grid
  Then User validates that the row "No Data Rows" is added to the worksheet
  # Then I validate that the row at index 1 has the text "(1 DT)"