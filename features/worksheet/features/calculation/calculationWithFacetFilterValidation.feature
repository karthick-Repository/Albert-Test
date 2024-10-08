Feature: Worksheet facet filter related validations

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * User is in the WKS page

  @WKS_Mandatory @smoke_tests
  Scenario: [WKS-2824] When you select 1 record in facet pop up and search another one in top search then, search should not overwrite the previous selection
    Given User is in the WKS page
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 5 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User clicks action icon of column "COL5"
    * User clicks on "Edit Name" in the action menu
    * User changes the formula name to "TFC-1"
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TFC-2" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TFC-3" into the column header of the added column
    * Add "Product Design" "Blank" rows in WKS
    * Add 3 blank rows to WKS
    * User clicks action icon of column "COL7"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "TBC-1" into the column header of the added column
    * User reloads the page
    * User is in the WKS page
    * User clicks the filter icon
    * User applies filter for columns containing text "002"
    * I search for "TFC-2" in the worksheet
    Then User validates that the columns names as fetched from the UI using locators are "Name,Inventory ID,Manufacturer,Details,TFC-2"
    When I search for "Test FC - 2" in the worksheet
    Then User validates that the columns names as fetched from the UI using locators are "Name,Inventory ID,Manufacturer,Details,TFC-2"
    # URL state retention feature is yet to be implemented hence commenting for now
    # When User reloads the page
    # Then User validates that the columns names as fetched from the UI using locators are "Name,Inventory ID,Manufacturer,Details,TFC-2"

  @WKS_Mandatory @smoke_tests @calculation_tests
  Scenario: [WKS-3816] After selecting 2 formulas from top facet pop up, when created 1 more column via Copy to new the grid must not be cleared
    Given User is in the WKS page
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 5 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User clicks action icon of column "COL5"
    * User clicks on "Edit Name" in the action menu
    * User changes the formula name to "TFC-1"
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TFC-2" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TFC-3" into the column header of the added column
    * User clicks action icon of column "COL7"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TFC-4" into the column header of the added column
    * User reloads the page
    * User is in the WKS page
    * Enter the values "10, 20, 30, 40, 50" into the column with ID "COL5" in WKS
    * Enter the values "60, 70, 80, 90, 100" into the column with ID "COL6" in WKS
    * Enter the values "110, 120, 130, 140, 150" into the column with ID "COL7" in WKS
    * User enters the formulae "=SUM(F1:H1)/COUNT(F1:H1), =SUM(F2:H2)/(COUNT(F2:H2)+1), =SUM(F3:H3)/(COUNT(F3:H3)+2), =SUM(F4:H4)/(COUNT(F4:H4)+3), =SUM(F5:H5)/(COUNT(F5:H5)+4)" into the cells of the column with ID "COL8" in WKS
    Then Validate that the cell values in the column identified by the ID "COL8" are "60,52.5,48,45,42.8571429"
    * Validate that the inventory total for the column with column ID "COL8" is "248.357143"
    When User clicks the filter icon
    * User applies filter for columns containing text "003,004"
    Then User validates that the columns names as fetched from the UI using locators are "Name,Inventory ID,Manufacturer,Details,TFC-4,TFC-3"
    When User clicks action icon of column "COL8"
    * User clicks on "Copy To New" in the action menu
    * User enters "2" into the copy to new input field
    * User clicks on the Done button in Copy to new dialog
    * User clicks action icon of column "COL9"
    * User clicks on "Edit Name" in the action menu
    * User changes the formula name to "TFC-5"
    * User clicks action icon of column "COL10"
    * User clicks on "Edit Name" in the action menu
    * User changes the formula name to "TFC-6"
    Then User validates that the columns names as fetched from the UI using locators are "Name,Inventory ID,Manufacturer,Details,TFC-4,TFC-3,TFC-6,TFC-5"
    * Validate that the cell values in the column identified by the ID "COL9" are "76.6666667,60.625,51.6,45.8333333,41.8367347"
    * Validate that the inventory total for the column with column ID "COL9" is "276.561735"
    * Validate that the cell values in the column identified by the ID "COL10" are "82.2222222,58.28125,45.92,38.4722222,33.5276968"
    * Validate that the inventory total for the column with column ID "COL10" is "258.423391"

