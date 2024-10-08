Feature: Tests to validate cell values of new sheet creating from a template

  Background: User logs in, Create new Project, navigate to WKS, added inventories and fill values in formula columns
    When User creates a project
    * User stores the details of the created project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I add 2 formula columns and 2 blank columns into the PD grid of all the sheets of the worksheet
    * I add 5 blank rows, 3 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * I add 0 blank rows, 2 inventory rows of type "Consumables" into the PD grid of all the sheets of the worksheet
    * User resizes all columns in the WKS to "70px"
    * User is in the WKS page
    When User waits for 3 seconds
    * Enter the values "10,20,30,40,7.9,8.76,3,4,5,6" into the column with ID "COL5" in WKS
    * Enter the values "60,70,80,90,83,7.5,3,4,5,6" into the column with ID "COL6" in WKS
    * Enter the values "10,20,30,40,7.9,8.76,3,4,5,6" into the column with ID "COL7" in WKS
    * Enter the values "60,70,80,90,83,7.5,3,4,5,6" into the column with ID "COL8" in WKS
    * Enter the values "10,20,30,40,7.9,8.76,3,4,5,6" into the column with ID "COL9" in WKS
    * User enters the formulae "=SUM(F1:G1),=SUM(E1:F1)" into the cells of the column with ID "COL9" in WKS


  @WKS_Mandatory
  Scenario: Validate data of a new sheet created from saved as template
    When User clicks on the action icon of row at index 1
    * User clicks on "Expand Summary" in the action menu
    * User click on open details and added two new price with value "20" and "25" also add distinct location one Vendor name from dropdown at index "2"
    * I click on open details of inventory and added below values in respective section
        | alias  | Descriptions | RSN  | RSNe  |
        | alias1 | description1 | rsn1 | rsne1 |
    * I add alias Descriptions RSN and RSNe lookup columns
    * User "groups" the rows identified by indexes "1,2"
    * I click on the text "Group rows"
    * User names the row as "abcd!@#$1234"
    Then User validates that the group "abcd!@#$1234" is added to the worksheet
    When I "collapse" the intermate row at index 1 in the product design grid
    * User "groups" the rows identified by indexes "2,3,4"
    * I click on the text "Group rows"
    * User names the row as "abc!@#$1234"
    Then User validates that the group "abc!@#$1234" is added to the worksheet
    When I "collapse" the intermate row at index 1 in the product design grid
    * User "groups" the rows identified by indexes "1,2"
    * I click on the text "Group rows"
    * User names the row as "ab!@#$1234"
    Then User validates that the group "ab!@#$1234" is added to the worksheet
    * User resizes all columns in the WKS to "70px"
    * User is in the WKS page
    * I click on the product design grid section in the worksheet
    * I expand the apps grid section in the worksheet
    When User just double clicks on the cell identified by row "3" in column identified by ID "COL5" in WKS
    * I add 2 tags in tags section
    * User clicks on "Done"
    * User waits for 3 seconds
    * User copy the tags value corresponding to row "3" and column "COL5"
    * I click on the plus icon of apps grid section in the worksheet
    * I click on the text "Add a Lookup Row"
    * I click on " Description " identified as a hyperlink
    * I click on the plus icon of apps grid section in the worksheet
    * I click on the text "Add a Lookup Row"
    * I click on " Alias " identified as a hyperlink
    * User enter 10 characters in the cell identified by row "3" in column identified by ID "COL5" in WKS
    * User enter 10 characters in the cell identified by row "4" in column identified by ID "COL5" in WKS
    When User clicks action icon of column "COL5"
    * User clicks on "Expand Summary" in the action menu
    * User click on open details and update the predecessor value
    * User clicks action icon of column "COL5"
    * User clicks on "Create Property Task" in the action menu
    * User waits for 3 seconds
    * I select one template under Setup Blocks to Collect Results, provide task name and click on create button
    * User waits for 3 seconds
    * User resizes all columns in the WKS to "70px"
    * User is in the WKS page
    When User waits for 3 seconds
    * User copy predecessor value in the cell identified by row "7" in column identified by ID "COL5" in WKS for template validation
    When I Copy sheet values to verify in template sheet
    * I click on the product design grid section in the worksheet
    * User copy the tags value corresponding to row "5" and column "COL5"
    * I click on the action icon of sheet 1
    * I click on "Save As Template"
    * I click on the "Create" button to add new sheet
    Then User validates that the message "Template name cannot be empty." is displayed
    * I set a random 55 character string as the name of the sheet being duplicated
    * I click on the "Create" button to add new sheet
    Then User validates that the message "Template name exceeds 50 Characters" is displayed
    Then Verify ' Template name exceeds 50 Characters. ' message when clicking on save button providing more then 50 characters in work sheet input field
    * I "check" the checkbox number 3 in the "Product Design Grid" section
    * I click on icon 2 of type > in the "Product Design Grid"
    * I uncheck checkbox number 6 in the Other Columns section
    Then Verify "Some cells have broken calculation. Copy column K to fix it." message visible
    When I click on "Back To Creation Flow"
    Then User validates that the message "Some cells have broken calculation" is displayed
    * I set a random 10 character string as the name of the sheet being duplicated
    * I click on the "Create" button to add new sheet
    * I click on the plus icon in the footer of the worksheet
    * I click on "Create sheet from a template"
    When User waits for 2 seconds
    * I click on "Created by me"
    * I select a sheet template
    * I click on the "Create" button to add new sheet
    When User waits for 2 seconds
    Then I validate that the new sheet is added in the first position
    When User waits for 2 seconds
    When I click on the plus icon in the footer of the worksheet
    * I click on "Create sheet from a template"
    * User waits for 2 seconds
    * I click on "Created by me"
    * User waits for 2 seconds
    * I Delete the created template
    Then Verify data Tamplate Values in new sheet
    When I "expand" the intermate row at index 1 in the product design grid
    * User waits for 2 seconds
    # When I "expand" the intermate row at index 2 in the product design grid
    When I "expand" the intermate row of group 1
    Then Verify "#REF!" should be shown in cell corresponding to row "3" and column "COL9"
    * Verify "=SUM(I3:J3)" should be shown after double click in cell corresponding to row "4" and column "COL9"
    * Verify "10" should be shown in cell corresponding to row "3" and column "COL7"
    * Verify "60" should be shown in cell corresponding to row "3" and column "COL6"
    When I click on the product design grid section in the worksheet
    Then Verify "task1" should be visible in result grid section
    When I click on the result grid section in the worksheet
    Then Verify "" should be shown in cell corresponding to row "3" and column "COL5"
    * Verify "" should be shown in cell corresponding to row "3" and column "COL9"
    * Verify "" should be shown in cell corresponding to row "4" and column "COL5"
    * Verify "" should be shown in cell corresponding to row "4" and column "COL9"
    * Verify tags value in new sheet corresponding to row "5" and column "COL5"
    * Verify average price should be less then maximum and greater then minimum in corresponding row "6" and column "COL5"
    * Verify predecessor value in new sheet is same as old sheet shown in cell corresponding to row "7" and column "COL5"
