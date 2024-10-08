Feature: Copy from existing with values copied from a different project

  Background: User logs in creates a project which will serve as a source for copy from existing validations
    * User creates a project
    * User stores the details of the created project
    * User enables worksheet for the created project
    * User navigates to the WKS
    * User is in the WKS page
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 5 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User reloads the page
    * User is in the WKS page
    * Enter the values "90, 80, 70, 60, 50" into the column with ID "COL5" in WKS

  @WKS_Multiple_Project_Deletion @smoke_tests
  Scenario: Validate copy from existing between two projects with varying inventory types
    When User fetches all columns using WKS service endpoint
    * User fetches the id of the column with colId "COL5"
    * User creates a project
    * User stores the details of the created project
    * User enables worksheet for the created project
    * User navigates to the WKS
    * User is in the WKS page
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 5 inventories of type "Formulas" to the WKS from advanced search dialog
    * User reloads the page
    * User is in the WKS page
    * User clicks action icon of column "COL5"
    * User clicks on "Copy From Existing" in the action menu
    * User enters the fetched column id into the Select Product to copy dropdown in Copy to Existing dialog
    * User stores "001" as the index number of the column which will be used in performing copy from existing
    * User waits for 2 seconds
    * User clicks on the formula entered "involving" an external project
    * User waits for 1 seconds
    * User clicks on "Done"
    * User waits for 2 seconds
    * User reloads the page
    * User is in the WKS page
    Then Validate that the cell values in the column identified by the ID "COL5" are "90,80,70,60,50,,,,,"

  @WKS_Multiple_Project_Deletion @smoke_tests
  Scenario: Validate copy from existing between to a project with only blank rows
    When User fetches all columns using WKS service endpoint
    * User fetches the id of the column with colId "COL5"
    * User creates a project
    * User stores the details of the created project
    * User enables worksheet for the created project
    * User navigates to the WKS
    * User is in the WKS page
    * Add "Product Design" "Blank" rows in WKS
    * Add 5 blank rows to WKS
    * User reloads the page
    * User is in the WKS page
    * User waits for 1 seconds
    * User clicks action icon of column "COL5"
    * User clicks on "Copy From Existing" in the action menu
    * User enters the fetched column id into the Select Product to copy dropdown in Copy to Existing dialog
    * User stores "001" as the index number of the column which will be used in performing copy from existing
    * User waits for 2 seconds
    * User clicks on the formula entered "involving" an external project
    * User waits for 1 seconds
    * User clicks on "Done"
    * User waits for 3 seconds
    * User reloads the page
    * User is in the WKS page
    Then Validate that the cell values in the column identified by the ID "COL5" are "90,80,70,60,50,,,,,"

  @WKS_Multiple_Project_Deletion @smoke_tests
  Scenario: Validate copy from existing between to a project with the exact inventories as in the parent project
    When User fetches all columns using WKS service endpoint
    * User fetches the id of the column with colId "COL5"
    * User creates a project
    * User stores the details of the created project
    * User enables worksheet for the created project
    * User navigates to the WKS
    * User is in the WKS page
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User waits for 2 seconds
    * User adds the inventories added in the parent project to the current project
    * User clicks action icon of column "COL5"
    * User clicks on "Copy From Existing" in the action menu
    * User enters the fetched column id into the Select Product to copy dropdown in Copy to Existing dialog
    * User stores "001" as the index number of the column which will be used in performing copy from existing
    * User waits for 2 seconds
    * User clicks on the formula entered "involving" an external project
    * User waits for 1 seconds
    * User clicks on "Done"
    * User waits for 3 seconds
    * User reloads the page
    * User is in the WKS page
    Then Validate that the cell values in the column identified by the ID "COL5" are "90,80,70,60,50"
