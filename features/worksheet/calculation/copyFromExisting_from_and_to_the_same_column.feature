Feature: Copy from existing smoke test validations

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * User is in the WKS page

  @WKS_Mandatory @smoke_tests
  Scenario: Validate copy from existing scenario from a blank column
    Given User is in the WKS page
    When Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 3 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User waits for 1 seconds
    * User clicks action icon of column "COL5"
    * User clicks on "Copy From Existing" in the action menu
    * User fetches all columns using WKS service endpoint
    * User fetches the id of the column with colId "COL5"
    * User enters the fetched column id into the Select Product to copy dropdown in Copy to Existing dialog
    Then User validates that the message "No Record Found" is displayed
    When User enters "abcdef!@@#" into the Select Product to copy dropdown in Copy to Existing dialog
    Then User validates that the message "No Record Found" is displayed