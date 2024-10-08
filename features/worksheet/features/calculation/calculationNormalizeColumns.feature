Feature: Normalize column validations

  Background: User logs in and navigates to WKS
    * User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * Add "Product Design" "Blank" rows in WKS
    * Add 5 blank rows to WKS
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 5 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User reloads the page
    * User is in the WKS page
    * Enter the values "99, 100, 99.999999, 100.999999, 101, 99, 100, 99.999999, 100.999999,101" into the column with ID "COL5" in WKS

  # @WKS_Mandatory @calculation_tests
  # Scenario: Normalize negative scenario with #DIV0!
  #   When User clicks action icon of column "COL5"
  #   * User clicks on "Add a Blank Column" in the action menu
  #   * User enters "TBC-1" into the column header of the added column
  #   * Enter the values "90, 91, 99.999999, 100.999999, 101, 99, 100, 104, 102.999999,103" into the column with ID "COL6" in WKS
  #   * User clicks action icon of column "COL6"
  #   * User clicks on "Add a Blank Column" in the action menu
  #   * User enters "TBC-2" into the column header of the added column
  #   * User clicks action icon of column "COL7"
  #   * User clicks on "Add a Product / Formula Column" in the action menu
  #   * User enters "TFC-1" into the column header of the added column
  #   * User enters the formulae "=SUM(G1:H1)/F1,=SUM(G2:H2)/F2,=SUM(G3:H3),=SUM(G4:H4),=SUM(G5:H5),=SUM(G6:H6),=SUM(G7:H7),=SUM(G8:H8),=SUM(G9:H9),=SUM(G10:H10)" into the cells of the column with ID "COL8" in WKS
  #   * User clicks action icon of column "COL8"
  #   * User clicks on "Normalize" in the action menu
  #   Then User validates that the non product column filter icons are "disabled"
  #   * User validates that the plus icon in the plus icon in "Product Design" grid is "not visible"
  #   * User validates that the plus icon in the plus icon in "Apps" grid is "not visible"
  #   * Validate that the normalized cell values in the column identified by the ID "COL8" are "0,0,33.112582,33.4437085,33.44370"
  #   * Validate that the normalized inventory total of the column identified by the ID "COL8" is "100"
  #   Then Validate that the total number of normalize checkboxes displayed are "5"
  #   When User clicks on "Done"
  #   * User clicks on "Confirm"
  #   Then Validate that the cell values in the column identified by the ID "COL5" are "0,0,33.112582,33.4437085,33.44370,198,200,199.999998,201.999998,202"
  #   * Validate that the inventory total for the column with column ID "COL5" is "100"
    
  @WKS_Mandatory @smoke_tests
  Scenario: Normalize column smoke tests
    When User clicks action icon of column "COL5"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "TBC-1" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User reloads the page
    * User is in the WKS page
    When User clicks action icon of column "COL6"
    Then Validate the menu options displayed when user clicks on the action icon of a blank column
    When User clicks action icon of column "COL5"
    * User clicks on "Lock Product / Formula" in the action menu
    * User clicks action icon of column "COL5"
    * User clicks on "Normalize" in the action menu
    Then Validate that the message "Normalization is not supported because the Product / Formula is locked" is displayed after clicking normalize
    When User clicks on Got it link
    * User clicks action icon of column "COL5"
    * User clicks on "Unlock Product / Formula" in the action menu
    * User clicks action icon of column "COL5"
    * User clicks on "Normalize" in the action menu
    * User clicks action icon of column "COL5"
    Then Validate that the menu actions are all grayed out
    When Enter "abcd" into the normalize input
    Then Validate that the value in the normalize input is ""
    When Enter "-1.23423" into the normalize input
    Then Validate that the value in the normalize input is "1.2342"
    When Enter "21131!@#E@$" into the normalize input
    Then Validate that the value in the normalize input is "21131"
    When Enter "0.00000001" into the normalize input
    Then Validate that the value in the normalize input is "0.0000"
    When User clicks on the search input in WKS
    Then Validate that the normalized cell values in the column identified by the ID "COL5" are "0,0,0,0,0"
    * Validate that the normalized inventory total of the column identified by the ID "COL5" is "0"
    When Enter "99999999" into the normalize input
    * User clicks on the search input in WKS
    Then Validate that the normalized cell values in the column identified by the ID "COL5" are "19760478.923195522,19960079.720399518,19960079.520798724,20159680.31800272,20159680.517603513"
    * Validate that the normalized inventory total of the column identified by the ID "COL5" is "99999999"
    When User clicks on "Done"
    * User clicks on "Confirm"
    Then Validate that the cell values in the column identified by the ID "COL5" are "19760478.9,19960079.7,19960079.5,20159680.3,20159680.5,99,100,99.999999,100.999999,101"
    * Validate that the inventory total for the column with column ID "COL5" is "99999998.9"

  @WKS_Mandatory @calculation_tests
  Scenario: Validate that the normalize values change accordingly when user makes few entries as a constant by checking the checkboxes
    When User clicks action icon of column "COL5"
    * User clicks on "Normalize" in the action menu
    * Enter "150" into the normalize input
    * User checks checkbox number 1
    Then Validate that the normalized cell values in the column identified by the ID "COL5" are "99,12.686567227,12.6865671,12.813432773,12.8134329"
    * Validate that the normalized inventory total of the column identified by the ID "COL5" is "150"
    When User clicks on "Done"
    * User clicks on "Confirm"
    Then Validate that the cell values in the column identified by the ID "COL5" are "99,12.6865672,12.6865671,12.8134328,12.8134329,99,100,99.999999,100.999999,101"
    * Validate that the inventory total for the column with column ID "COL5" is "150"
    When User clicks action icon of column "COL5"
    * User clicks on "Normalize" in the action menu
    * Enter "9999999" into the normalize input
    * User checks checkbox number 1
    * User checks checkbox number 2
    * User checks checkbox number 3
    * User clicks on the search input in WKS
    Then Validate that the normalized cell values in the column identified by the ID "COL5" are "99,12.6865672,12.6865671,4999937.29392232,4999937.332943381"
    * Validate that the normalized inventory total of the column identified by the ID "COL5" is "9999999"
    When User clicks on "Done"
    * User clicks on "Confirm"
    Then Validate that the cell values in the column identified by the ID "COL5" are "99,12.6865672,12.6865671,4999937.29,4999937.33,99,100,99.999999,100.999999,101"
    When Enter the values "10,20,30,40,50,60,70,80,90,100" into the column with ID "COL5" in WKS
    * User clicks action icon of column "COL5"
    * User clicks on "Normalize" in the action menu
    * Enter "40" into the normalize input
    * User checks checkbox number 1
    * User checks checkbox number 2
    * User checks checkbox number 3
    Then Validate that the normalized cell values in the column identified by the ID "COL5" are "10,20,30,0,0"
    * Validate that the normalized inventory total of the column identified by the ID "COL5" is "60"
    When User clicks on "Done"
    * User clicks on "Confirm"
    Then Validate that the cell values in the column identified by the ID "COL5" are "10,20,30,0,0,60,70,80,90,100"
    * Validate that the inventory total for the column with column ID "COL5" is "60"
    When User clicks action icon of column "COL5"
    * User clicks on "Normalize" in the action menu
    * Enter "8" into the normalize input
    * User checks checkbox number 1
    Then Validate that the normalized cell values in the column identified by the ID "COL5" are "10,0,0"
    * Validate that the normalized inventory total of the column identified by the ID "COL5" is "10"
    When User clicks on "Done"
    * User clicks on "Confirm"
    Then Validate that the cell values in the column identified by the ID "COL5" are "10,0,0,0,0,60,70,80,90,100"
    * Validate that the inventory total for the column with column ID "COL5" is "10"
    When Enter the values "10,20,30,40,50,60,70,80,90,100" into the column with ID "COL5" in WKS
    * User clicks action icon of column "COL5"
    * User clicks on "Normalize" in the action menu
    * Enter "0.0025" into the normalize input
    * User clicks on the search input in WKS
    Then Validate that the normalized cell values in the column identified by the ID "COL5" are "0.000166667,0.000333333,0.0005,0.000666667,0.000833333"
    # * Validate that the normalized inventory total of the column identified by the ID "COL5" is "0.0025"
    When User clicks on "Done"
    * User clicks on "Confirm"
    Then Validate that the normalized cell values in the column identified by the ID "COL5" are "0.000166667,0.000333333,0.0005,0.000666667,0.000833333"
    # * Validate that the inventory total for the column with column ID "COL5" is "0.0025"
    When User waits for 1 seconds
    When User clicks action icon of column "COL5"
    * User clicks on "Normalize" in the action menu
    * User checks checkbox number 1
    * User checks checkbox number 2
    * User checks checkbox number 3
    * User checks checkbox number 4
    * User checks checkbox number 5
    Then Validate that the normalized cell values in the column identified by the ID "COL5" are "0.000166667,0.000333333,0.0005,0.000666667,0.000833333"
    * Validate that the normalized inventory total of the column identified by the ID "COL5" is "0.0025"
    When User clicks on "Done"
    * User clicks on "Confirm"
    Then Validate that the normalized cell values in the column identified by the ID "COL5" are "0.000166667,0.000333333,0.0005,0.000666667,0.000833333"
    * Validate that the normalized inventory total of the column identified by the ID "COL5" is "0.0025"
