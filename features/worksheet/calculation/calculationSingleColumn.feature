Feature: Custom Worksheet Calculation and Validation within single column

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * User is in the WKS page
    * Add "Product Design" "Inventory" rows in WKS
    * User clicks on the advanced search button in the inventory seach dialog
    * User adds 5 inventories of type "RawMaterials" to the WKS from advanced search dialog
    * User reloads the page
    * User is in the WKS page

  @WKS_Mandatory @calculation_tests
  Scenario: Validate calculations with complex formulae with in a single column
    Given User is in the WKS page
    When User enters the formulae "=1.008877664+9.999999999, =SQRT(E1) * 0.000000099, =AVERAGE(E1:E2)/768.987645239, =ROUND((3.14*(E2/100)*E3/60),2), =SUMPRODUCT($E1:$E4,E1:E4)/100" into the cells of the column with ID "COL5" in WKS
    Then Validate that the cell values in the column identified by the ID "COL5" are "11.0088777,3.28e-7,0.007158033,0,1.21195439"
    * Validate that the inventory total for the column with column ID "COL5" is "12.22799"
    When User enters the formulae "1,2,3,4,5" into the cells of the column with ID "COL5" in WKS
    * User enters the formulae "=1.008877664+9.999999999, =SQRT(E1) * 0.000000099, =AVERAGE(E1:E2)/768.987645239, =ROUND((3.14*(E2/100)*E3/60),2), =SUMPRODUCT($E1:$E4,E1:E4)/100" into the cells of the column with ID "COL5" in WKS
    Then Validate that the cell values in the column identified by the ID "COL5" are "11.0088777,3.28e-7,0.007158033,0,1.21195439"
    * Validate that the inventory total for the column with column ID "COL5" is "12.22799"

  # Commenting this test as this a feature which will be implemented in the future sprints
  # @WKS_Mandatory
  # Scenario: Validate calculations within a single column with ,(German) replacing .(US)
  #   Given User is in the WKS page
  #   * User enters the formulae "=1,0123456789+1,0123456789, =SQRT(E1) * 0,000000099, =AVERAGE(E1:E2)/768,987645239, =ROUND((3,14*(E2/100)*E3/60),2), =SUMPRODUCT($E1:$E4,E1:E4)/100" into the cells of the column with ID "COL5" in WKS
  #   Then Validate that the cell values in the column identified by the ID "COL5" are "2.02469136,3.28478325e-7,0.00715803307,0,1.21195439"
  #   * Validate that the inventory total for the column with column ID "COL5" is "3.2438041"

  @WKS_Mandatory @calculation_tests @smoke_tests
  Scenario: [WKS-4312] - Validate calculations with formulae with $ operator
    Given User is in the WKS page
    * User enters the formulae "=1.008877664+9.999999999, =SQRT(E1) * 0.000000099, =AVERAGE(E1:E2)/768.987645239, =ROUND((3.14*(E2/100)*E3/60),2), =SUM(E$1:E$5)" into the cells of the column with ID "COL5" in WKS
    Then Validate that the cell values in the column identified by the ID "COL5" are "11.0088777,3.28e-7,0.007158033,0,#CYCLE!"
    * Validate that the inventory total for the column with column ID "COL5" is "11.016036"

  # @WKS_Mandatory @smoke_tests @TO-DO
  # Scenario: Validate calculation when cell is referring  to some column having string like (Inventory id, Manufacturer, Name)
  #   Given User is in the WKS page
  #   When User enters the value "=1-5" into the cell identified by row 1 and column 1 of the right panel in the WKS 
  #   Then Validate that the message "Product inventory cell cannot be a Negative value" is displayed
  #   When User enters the value "=Name" into the cell identified by row 1 and column 1 of the right panel in the WKS 
  #   * User reads the value of the cell identified by row "1" in column identified by ID "1" in WKS
  #   Then Validate that the value fetched from the cell is "#NAME?"
  #   When User enters the value "-100" into the cell identified by row 1 and column 1 of the right panel in the WKS 
  #   Then Validate that the message "Product inventory cell cannot be a Negative value" is displayed

  # @WKS_Mandatory @smoke_tests @TO-DO
  # Scenario: Validate that the message "Calculation references do not exist" is displayed when user tries to reference the inventory total cell in any formula
  #   Given User is in the WKS page
  #   When User clicks action icon of column "COL5"
  #   * User clicks on "Add a Product / Formula Column" in the action menu
  #   * User enters "FC-1" into the column header of the added column
  #   * User reloads the page
  #   * User is in the WKS page
  #   * Enter the values "10, 20, 30, 40, 50" into the column with ID "COL6" in WKS
  #   * User enters the value "=SUM(E1:E6)" into the cell identified by row 1 and column 2 of the right panel in the WKS
  #   Then Validate that the message "Calculation references do not exist" is displayed
  #   * User enters the value "=SUM($E$1:E6)" into the cell identified by row 1 and column 2 of the right panel in the WKS
  #   Then Validate that the message "Calculation references do not exist" is displayed
  #   * User enters the value "=SUM($E$1:$E$6)" into the cell identified by row 1 and column 2 of the right panel in the WKS
  #   Then Validate that the message "Calculation references do not exist" is displayed