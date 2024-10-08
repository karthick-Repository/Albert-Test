Feature: Tests to validate text wrapping feature

  Background: User logs in and navigates to WKS
    # Given User logs into the application
    # When User closes the modal dialog
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS

  @WKS_Mandatory
  Scenario: Validate text wrapping for a new blank row create, edit and grouping in product design grid
    Given User is in the WKS page
    When Add "Product Design" "Blank" rows in WKS
    * I fetch the size of the input cell
    * I set the name of the row as a random string of length 250 characters
    Then I validate that the size of the input cell identified is bigger than what it was previously
    When User clicks on the search input in WKS
    # * I fetch all the rows added in the "product design" grid
    # Then I validate that the rows are added to the product design grid
    When Add "Product Design" "Blank" rows in WKS
    * I fetch the size of the input cell
    * I set the name of the row as a random string of length 250 characters
    * I press the "Tab" key on the enabled input field
    # * I fetch all the rows added in the "product design" grid
    # Then I validate that the rows are added to the product design grid
    When I click on the action icon of the "1" row
    * User clicks on "Edit Name"
    Then I validate that the size of the input cell identified is bigger than what it was previously
    When I set the name of the row as a random string of length 250 characters
    * User clicks on the search input in WKS
    * Add "Product Design" "Blank" rows in WKS
    * I add 3 blank rows with row names consisting of string of length 250 characters each
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "TBC-1" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "TBC-2" into the column header of the added column
    * User clicks action icon of column "COL7"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TFC-1" into the column header of the added column
    * User resizes all columns in the WKS to "40px"
    * I enter random strings of length 250 characters into the cells of column with ID "COL6"
    Then I double click on each cell in the column identified with ID "COL6" and validate that the size of the input cell is bigger than what it was previously
    When Enter the values "10, 20, 30, 40, 50" into the column with ID "COL8" in WKS
    * Enter the values "110, 120, 130, 140, 150" into the column with ID "COL7" in WKS
    * User enters the value "=IF(G1>0,G1,1)+LEN(E1)*CODE(MID(E1,1,1))+LEN(F1)*CODE(MID(F1,1,1))+SUM(G1,G1/2,ABS(G1-G1*2))+PRODUCT(G1,2)-SUM(LEN(E1)" into the cell identified by row 1 and column 4 of the right panel in the WKS
    * User enters the value "=IF(G2>0,G2,1)+LEN(E2)*CODE(MID(E2,2,1))+LEN(F2)*CODE(MID(F2,2,1))+SUM(G2,G2/3,ABS(G2-G2*3))+PRODUCT(G2,3)-SUM(LEN(E2),LEN(F2))" into the cell identified by row 2 and column 4 of the right panel in the WKS
    * User enters the value "=IF(G3>0,G3,1)+LEN(E3)*CODE(MID(E3,3,1))+LEN(F3)*CODE(MID(F3,3,1))+SUM(G3,G3/4,ABS(G3-G3*4))+PRODUCT(G3,4)-SUM(LEN(E3),LEN(F3))" into the cell identified by row 3 and column 4 of the right panel in the WKS
    * User enters the value "=IF(G4>0,G4,1)+LEN(E4)*CODE(MID(E4,3,1))+LEN(F4)*CODE(MID(F4,3,1))+SUM(G4,G4/4,ABS(G4-G4*4))+PRODUCT(G4,4)-SUM(LEN(E4),LEN(F4))" into the cell identified by row 4 and column 4 of the right panel in the WKS
    * User enters the value "=IF(G5>0,G5,1)+LEN(E5)*CODE(MID(E5,3,1))+LEN(F5)*CODE(MID(F5,3,1))+SUM(G5,G5/4,ABS(G5-G5*4))+PRODUCT(G5,4)-SUM(LEN(E5),LEN(F5))" into the cell identified by row 5 and column 4 of the right panel in the WKS
    Then I double click on each cell in the column identified with ID "COL6" and validate that the size of the input cell is bigger than what it was previously
    * I double click on each cell in the column identified with ID "COL5" and validate that the size of the input cell is bigger than what it was previously
    * Validate that the cell values in the column identified by the ID "COL5" are "#VALUE!,#VALUE!,#VALUE!,#VALUE!,#VALUE!"
    * Validate that the inventory total for the column with column ID "COL5" is "0"
    When User "groups" the rows identified by indexes "1,2,3"
    * User clicks on the group rows button
    * I fetch the size of the input cell
    * I set the name of the row as a random string of length 250 characters
    Then I validate that the size of the input cell identified is bigger than what it was previously

  @WKS_Mandatory
  Scenario: Validate text wrapping for a new blank row create, edit and grouping in product apps grid
    Given User is in the WKS page
    When Add "Apps Grid" "Blank" rows in WKS
    * I fetch the size of the input cell
    * I set the name of the row as a random string of length 250 characters
    Then I validate that the size of the input cell identified is bigger than what it was previously
    When User clicks on the search input in WKS
    # * I fetch all the rows added in the "apps" grid
    # Then I validate that the rows are added to the worksheet
    When Add "Product Design" "Blank" rows in WKS
    * I fetch the size of the input cell
    * I set the name of the row as a random string of length 250 characters
    * I press the "Tab" key on the enabled input field
    # * I fetch all the rows added in the "product design" grid
    # Then I validate that the rows are added to the product design grid
    When I click on the action icon of the "1" row
    * User clicks on "Edit Name"
    Then I validate that the size of the input cell identified is bigger than what it was previously
    When I set the name of the row as a random string of length 250 characters
    * User clicks on the search input in WKS
    * Add "Product Design" "Blank" rows in WKS
    * I add 3 blank rows with row names consisting of string of length 250 characters each
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "TBC-1" into the column header of the added column
    * User clicks action icon of column "COL6"
    * User clicks on "Add a Blank Column" in the action menu
    * User enters "TBC-2" into the column header of the added column
    * User clicks action icon of column "COL7"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TFC-1" into the column header of the added column
    * User resizes all columns in the WKS to "40px"
    * I enter random strings of length 250 characters into the cells of column with ID "COL6"
    Then I double click on each cell in the column identified with ID "COL6" and validate that the size of the input cell is bigger than what it was previously
    When Enter the values "10, 20, 30, 40" into the column with ID "COL8" in WKS
    * Enter the values "110, 120, 130, 140" into the column with ID "COL7" in WKS
    * User enters the value "=IF(G1>0,G1,1)+LEN(E1)*CODE(MID(E1,1,1))+LEN(F1)*CODE(MID(F1,1,1))+SUM(G1,G1/2,ABS(G1-G1*2))+PRODUCT(G1,2)-SUM(LEN(E1)" into the cell identified by row 1 and column 4 of the right panel in the WKS
    * User enters the value "=IF(G2>0,G2,1)+LEN(E2)*CODE(MID(E2,2,1))+LEN(F2)*CODE(MID(F2,2,1))+SUM(G2,G2/3,ABS(G2-G2*3))+PRODUCT(G2,3)-SUM(LEN(E2),LEN(F2))" into the cell identified by row 2 and column 4 of the right panel in the WKS
    * User enters the value "=IF(G3>0,G3,1)+LEN(E3)*CODE(MID(E3,3,1))+LEN(F3)*CODE(MID(F3,3,1))+SUM(G3,G3/4,ABS(G3-G3*4))+PRODUCT(G3,4)-SUM(LEN(E3),LEN(F3))" into the cell identified by row 3 and column 4 of the right panel in the WKS
    * User enters the value "=IF(G4>0,G4,1)+LEN(E4)*CODE(MID(E4,3,1))+LEN(F4)*CODE(MID(F4,3,1))+SUM(G4,G4/4,ABS(G4-G4*4))+PRODUCT(G4,4)-SUM(LEN(E4),LEN(F4))" into the cell identified by row 4 and column 4 of the right panel in the WKS
    Then I double click on each cell in the column identified with ID "COL6" and validate that the size of the input cell is bigger than what it was previously
    * I double click on each cell in the column identified with ID "COL5" and validate that the size of the input cell is bigger than what it was previously
    * Validate that the cell values in the column identified by the ID "COL5" are "#VALUE!,#VALUE!,#VALUE!,#VALUE!"
    * Validate that the inventory total for the column with column ID "COL5" is "0"
    When User "groups" the rows identified by indexes "1,2,3"
    * User clicks on the group rows button
    * I fetch the size of the input cell
    * I set the name of the row as a random string of length 250 characters
    Then I validate that the size of the input cell identified is bigger than what it was previously
