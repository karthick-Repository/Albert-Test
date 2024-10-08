Feature: Validations WKS calculations with column pin & unpin feature

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 5 inventories of type "RawMaterials" to the WKS from advanced search dialog

  @WKS_Mandatory @smoke_tests
  Scenario: Column pin unpin smoke tests
    Given User is in the WKS page
    When User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TFC-2" into the column header of the added column
    When User moves column with identified by column ID "COL1" to "COL6"
    * User moves column with identified by column ID "COL3" to "COL6"
    * User reloads the page
    * User is in the WKS page
    * User clicks action icon of column "COL3"
    Then User verifies that the menu option "Pin Column" is "displayed"
    When User moves column with identified by column ID "COL5" to "COL4"
    * User reloads the page
    * User is in the WKS page
    * User waits for 2 seconds
    * User clicks action icon of column "COL5"
    Then User verifies that the menu option "Unpin Column" is "displayed"

  @WKS_Mandatory @calculation_tests
  Scenario: Validate the calculation references of cells when user pins and unpins columns
    Given User is in the WKS page
    When User clicks action icon of column "COL5"
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
    * User resizes all columns in the WKS to "70px"
    * Enter the values "10, 20, 30, 40, 50" into the column with ID "COL7" in WKS
    * Enter the values "60, 70, 80, 90, 100" into the column with ID "COL6" in WKS
    * User enters the formulae "=SUM(F1:G1)-F5/G5, =SUM(F2:G2)-F2/F4, =SUM(F3:G3)-F3/G3, =SUM(F4:G4)-F4/F2, =SUM(F4:G4)-F4/G1" into the cells of the column with ID "COL5" in WKS
    * User enters the formulae "=SUM(F1:F2)+SUM(G1:G2)-F3, =SUM(F2:F2)+SUM(G2:G2)-G3, =SUM(F3:F3)+SUM(G3:G3)-G2, =SUM(F4:F4)+SUM(G4:G4)-F1, =SUM(F5:F5)+SUM(G5:G5)-G1" into the cells of the column with ID "COL8" in WKS
    Then Validate that the cell values in the column identified by the ID "COL5" are "69.5,89.5,109.625,128,129.333333"
    * Validate that the inventory total for the column with column ID "COL5" is "525.958333"
    * Validate that the inventory total for the column with column ID "COL8" is "390"
    When User clicks action icon of column "COL6"
    * User clicks on "Pin Column" in the action menu
    # * User fetches all columns using WKS service endpoint
    # Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,Manufacturer,Details,TFC-4,TFC-3,TFC-2,TFC-1"
    * Validate that the cell values in the column identified by the ID "COL5" are "199.5,99.5,149.625,248,249.333333"
    * Validate that the inventory total for the column with column ID "COL5" is "945.958333"
    * Validate that the inventory total for the column with column ID "COL8" is "390"
    When User fetch the value of the cell identified by row "1" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(G1:E1)-G5/E5"
    When User fetch the value of the cell identified by row "2" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(G2:E2)-G2/G4"
    When User fetch the value of the cell identified by row "3" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(G3:E3)-G3/E3"
    When User fetch the value of the cell identified by row "4" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(G4:E4)-G4/G2"
    When User fetch the value of the cell identified by row "5" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(G4:E4)-G4/E1"
    When User clicks action icon of column "COL7"
    * User clicks on "Pin Column" in the action menu
    # * User fetches all columns using WKS service endpoint
    # Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,Manufacturer,Details,TFC-2,TFC-4,TFC-3,TFC-1"
    * Validate that the cell values in the column identified by the ID "COL5" are "69.5,89.5,109.625,128,129.333333"
    * Validate that the inventory total for the column with column ID "COL5" is "525.958333"
    * Validate that the inventory total for the column with column ID "COL8" is "390"
    When User fetch the value of the cell identified by row "1" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(F1:E1)-F5/E5"
    When User fetch the value of the cell identified by row "2" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(F2:E2)-F2/F4"
    When User fetch the value of the cell identified by row "3" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(F3:E3)-F3/E3"
    When User fetch the value of the cell identified by row "4" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(F4:E4)-F4/F2"
    When User fetch the value of the cell identified by row "5" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(F4:E4)-F4/E1"
    When User clicks action icon of column "COL5"
    * User clicks on "Pin Column" in the action menu
    * User clicks action icon of column "COL7"
    * User clicks on "Unpin Column" in the action menu
    # * User fetches all columns using WKS service endpoint
    # Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,Manufacturer,Details,TFC-2,TFC-1,TFC-3,TFC-4"
    * Validate that the cell values in the column identified by the ID "COL5" are "#CYCLE!,#CYCLE!,#CYCLE!,#CYCLE!,#CYCLE!"
    * Validate that the inventory total for the column with column ID "COL5" is "0"
    * Validate that the inventory total for the column with column ID "COL8" is "390"
    When User fetch the value of the cell identified by row "1" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(G1:E1)-G5/E5"
    When User fetch the value of the cell identified by row "2" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(G2:E2)-G2/G4"
    When User fetch the value of the cell identified by row "3" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(G3:E3)-G3/E3"
    When User fetch the value of the cell identified by row "4" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(G4:E4)-G4/G2"
    When User fetch the value of the cell identified by row "5" in column identified by ID "COL5" in WKS
    Then Validate that the value fetched from the cell is "=SUM(G4:E4)-G4/E1"
    When User moves column with identified by column ID "COL7" to "COL5"
    * User clicks action icon of column "COL7"
    Then User validates that "Pin Column" is not part of the menu options displayed
    When User moves column with identified by column ID "COL5" to "COL8"
    * User clicks action icon of column "COL5"
    Then User validates that "Unpin Column" is not part of the menu options displayed
    When User clicks action icon of column "COL6"
    * User clicks on "Copy To New" in the action menu
    * User enters "3" into the copy to new input field
    * User clicks on the Done button in Copy to new dialog
    * User clicks action icon of column "COL9"
    Then User validates that "Pin Column" is not part of the menu options displayed
    When User clicks action icon of column "COL10"
    Then User validates that "Pin Column" is not part of the menu options displayed
    When User clicks action icon of column "COL11"
    Then User validates that "Pin Column" is not part of the menu options displayed
    When User clicks action icon of column "COL1"
    * User clicks on "Unpin Column" in the action menu
    * User clicks action icon of column "COL3"
    * User clicks on "Unpin Column" in the action menu
    * User clicks action icon of column "COL4"
    * User clicks on "Unpin Column" in the action menu
    * User resizes all columns in the WKS to "40px"
    * User clicks action icon of column "COL9"
    * User clicks on "Edit Name" in the action menu
    * User changes the formula name to "TFC-5"
    * User clicks action icon of column "COL10"
    * User clicks on "Edit Name" in the action menu
    * User changes the formula name to "TFC-6"
    * User clicks action icon of column "COL11"
    * User clicks on "Edit Name" in the action menu
    * User changes the formula name to "TFC-7"
    * User waits for 1 seconds
    # * User fetches all columns using WKS service endpoint
    # Then User validates that the columns names as fetched from the UI are "Name,TFC-7,TFC-6,TFC-5,TFC-2,TFC-3,Details,Manufacturer,Inventory ID,TFC-1,TFC-4"
