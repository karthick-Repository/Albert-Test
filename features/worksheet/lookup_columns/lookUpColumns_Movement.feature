Feature: Tests to validate the addition of lookup columns addition and re-order

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    When Add "Product Design" "Blank" rows in WKS
    * Add 3 blank rows to WKS
    * User clicks action icon of column "COL5"
    * User clicks on "Edit Name" in the action menu
    * User changes the formula name to "TFC-1"

  @WKS_Mandatory
  Scenario: Validate that the user can add look up columns, re-order them & check for column indexes
    When User clicks action icon of column "COL5"
    * I click on the text "Add a Lookup Column"
    Then I validate that "Alias, Description, Tags, RSN, RSNe, IDH, CuD" menu options are displayed
    When I click on " Alias " identified as a hyperlink
    * User clicks action icon of column "COL6"
    * I click on the text "Add a Lookup Column"
    Then I validate that "Description, Tags, RSN, RSNe, IDH, CuD" menu options are displayed
    When I click on " Description " identified as a hyperlink
    * User clicks action icon of column "COL7"
    * I click on the text "Add a Lookup Column"
    Then I validate that "Tags, RSN, RSNe, IDH, CuD" menu options are displayed
    When I click on " Tags " identified as a hyperlink
    * User clicks action icon of column "COL8"
    * I click on the text "Add a Lookup Column"
    Then I validate that "RSN, RSNe, IDH, CuD" menu options are displayed
    When I click on " RSN " identified as a hyperlink
    * User clicks action icon of column "COL9"
    * I click on the text "Add a Lookup Column"
    Then I validate that "RSNe, IDH, CuD" menu options are displayed
    When I click on " RSNe " identified as a hyperlink
    * User clicks action icon of column "COL10"
    * I click on the text "Add a Lookup Column"
    Then I validate that "IDH, CuD" menu options are displayed
    When I click on " IDH " identified as a hyperlink
    * User resizes all columns in the WKS to "40px"
    Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,Manufacturer,Details,IDH,RSNe,RSN,Tags,Description,Alias,TFC-1"
    When User enters the value "=" into the cell identified by row 1 and column 7 of the right panel in the WKS
    Then Verify that the row index is not broken in WKS
    * Verify that the column index is "A,B,C,D,E,F,G,H,I,J,K"
    When User clicks action icon of column "COL11"
    * User clicks on "Pin Column" in the action menu
    * User fetches all columns using WKS service endpoint
    Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,Manufacturer,Details,IDH,RSNe,RSN,Tags,Description,Alias,TFC-1"
    * User clicks action icon of column "COL6"
    * User clicks on "Pin Column" in the action menu
    * User fetches all columns using WKS service endpoint
    Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,Manufacturer,Details,IDH,Alias,RSNe,RSN,Tags,Description,TFC-1"
    When User moves column with identified by column ID "COL8" to "COL3"
    Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,Manufacturer,Details,IDH,Alias,RSNe,RSN,Tags,Description,TFC-1"

  @WKS_Mandatory
  Scenario: When a look up column is added from a pinned column then automatically new column should be pinned and same for unpinned columns
    Given User is in the WKS page
    When User clicks action icon of column "COL5"
    * User clicks on "Add a Lookup Column" in the action menu
    * User clicks on "Alias" in the action menu
    * User clicks action icon of column "COL6"
    * User clicks on "Pin Column" in the action menu
    * User fetches all columns using WKS service endpoint
    Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,Manufacturer,Details,Alias,TFC-1"
    When User clicks action icon of column "COL6"
    Then User validates that "Pin Column" is not part of the menu options displayed
    * User clicks on "Add a Lookup Column" in the action menu
    * User clicks on "Description" in the action menu
    * User fetches all columns using WKS service endpoint
    * User resizes all columns in the WKS to "40px"
    Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,Manufacturer,Details,Description,Alias,TFC-1"
    When User clicks action icon of column "COL7"
    Then User validates that "Pin Column" is not part of the menu options displayed
    When User clicks action icon of column "COL5"
    * User clicks on "Add a Lookup Column" in the action menu
    * User clicks on "RSN" in the action menu
    * User reloads the page
    * User is in the WKS page
    * User fetches all columns using WKS service endpoint
    Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,Manufacturer,Details,Description,Alias,RSN,TFC-1"
    When User clicks action icon of column "COL8"
    * User clicks on "Add a Lookup Column" in the action menu
    * User clicks on "RSNe" in the action menu
    * User fetches all columns using WKS service endpoint
    * User resizes all columns in the WKS to "40px"
    Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,Manufacturer,Details,Description,Alias,RSNe,RSN,TFC-1"
