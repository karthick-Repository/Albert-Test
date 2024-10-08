Feature: Validate tests for text cell formatting feature

  Background: User logs in and navigates to WKS
    When User creates a project
    * User enables worksheet for the created project

  @WKS_Mandatory
  Scenario: Validate that the text formats hold good when user performs normalization
    When I add 0 blank rows, 5 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * I add 5 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * User navigates to the WKS
    * User resizes all columns in the WKS to "40px"
    * Enter the values "1,2,3,4,5" into the column with ID "COL4" in WKS
    * Enter the values "11,12,13,14,15" into the column with ID "COL6" in WKS
    * User enters the value "=SUM(D1:E1)" into the cell identified by row 1 and column 2 of the right panel in the WKS
    * User copies the cell contents from the cell identified by row 1 and column 2 to all cells between rows 2 to 5 in column 2
    * User enters the value "=H1-F1" into the cell identified by row 1 and column 3 of the right panel in the WKS
    * User copies the cell contents from the cell identified by row 1 and column 3 to all cells between rows 2 to 5 in column 3
    * User enters the value "=SUM(I1:J1)+SUM(D1:F1)" into the cell identified by row 1 and column 4 of the right panel in the WKS
    * User copies the cell contents from the cell identified by row 1 and column 4 to all cells between rows 2 to 5 in column 4
    * Enter the values "11,12,13,14,15" into the column with ID "COL10" in WKS
    * Enter the values "11,2,3,4,5" into the column with ID "COL5" in WKS
    * I format the cells between columns with aria-indexes 2 and 5 and in rows with aria-indexes between 1 and 6 with "Bold,Italic,Underline"
    * User clicks action icon of column "COL5"
    * User clicks on "Normalize" in the action menu
    * Enter "99999999" into the normalize input
    Then I validate that the cells between columns with aria-indexes 2 and 5 and in rows with aria-indexes between 1 and 6 have the "style" attributes "font-weight: bold !important; font-style: italic !important; text-decoration: underline !important"
    When User clicks on "Done"
    * User clicks on "Confirm"
    Then I validate that the cells between columns with aria-indexes 2 and 5 and in rows with aria-indexes between 1 and 6 have the "style" attributes "font-weight: bold !important; font-style: italic !important; text-decoration: underline !important"

  @WKS_Mandatory @TO-DO-BY-DEV
  Scenario: Validate that the text formats hold good when user clears all the cells & enters the data again. Also validates the copy paste scenario
    When I add 0 blank rows, 5 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * I add 5 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * User navigates to the WKS
    * User resizes all columns in the WKS to "40px"
    * Enter the values "1,2,3,4,5" into the column with ID "COL4" in WKS
    * Enter the values "11,12,13,14,15" into the column with ID "COL6" in WKS
    * User enters the value "=SUM(D1:E1)" into the cell identified by row 1 and column 2 of the right panel in the WKS
    * User copies the cell contents from the cell identified by row 1 and column 2 to all cells between rows 2 to 10 in column 2
    * User enters the value "=H1-F1" into the cell identified by row 1 and column 3 of the right panel in the WKS
    * User copies the cell contents from the cell identified by row 1 and column 3 to all cells between rows 2 to 10 in column 3
    * User enters the value "=SUM(I1:J1)+SUM(D1:F1)" into the cell identified by row 1 and column 4 of the right panel in the WKS
    * User copies the cell contents from the cell identified by row 1 and column 4 to all cells between rows 2 to 10 in column 4
    * Enter the values "11,12,13,14,15" into the column with ID "COL10" in WKS
    * Enter the values "11,2,3,4,5" into the column with ID "COL5" in WKS
    * I format the cells between columns with aria-indexes 2 and 10 and in rows with aria-indexes between 1 and 6 with "Bold,Italic,Underline"
    * User clears all data from the WKS
    # Then Validate that the cell values in the column identified by the ID "COL4" are ",,,,"
    # * Validate that the cell values in the column identified by the ID "COL5" are ",,,,"
    # * Validate that the cell values in the column identified by the ID "COL6" are ",,,,"
    # * Validate that the cell values in the column identified by the ID "COL7" are ",,,,"
    # * Validate that the cell values in the column identified by the ID "COL8" are ",,,,"
    # * Validate that the cell values in the column identified by the ID "COL9" are ",,,,"
    # * Validate that the cell values in the column identified by the ID "COL10" are ",,,,"
    When Enter the values "1,2,3,4,5" into the column with ID "COL4" in WKS
    * Enter the values "11,12,13,14,15" into the column with ID "COL6" in WKS
    * User enters the value "=SUM(D1:E1)" into the cell identified by row 1 and column 2 of the right panel in the WKS
    * User copies the cell contents from the cell identified by row 1 and column 2 to all cells between rows 2 to 10 in column 2
    * User enters the value "=H1-F1" into the cell identified by row 1 and column 3 of the right panel in the WKS
    * User copies the cell contents from the cell identified by row 1 and column 3 to all cells between rows 2 to 10 in column 3
    * User enters the value "=SUM(I1:J1)+SUM(D1:F1)" into the cell identified by row 1 and column 4 of the right panel in the WKS
    * User copies the cell contents from the cell identified by row 1 and column 4 to all cells between rows 2 to 10 in column 4
    * Enter the values "11,12,13,14,15" into the column with ID "COL10" in WKS
    * Enter the values "11,2,3,4,5" into the column with ID "COL5" in WKS
    Then I validate that the cells between columns with aria-indexes 2 and 10 and in rows with aria-indexes between 1 and 6 have the "style" attributes "font-weight: bold !important; font-style: italic !important; text-decoration: underline !important"
    When I format the cells between columns with aria-indexes 2 and 10 and in rows with aria-indexes between 1 and 6 with "Bold,Italic,Underline"
    Then I validate that the cells between columns with aria-indexes 2 and 10 and in rows with aria-indexes between 1 and 6 have the "style" attributes "font-style: normal !important; text-decoration: none !important"
    When User clears all data from the WKS
    * Enter the values "1,2,3,4,5" into the column with ID "COL4" in WKS
    * Enter the values "11,12,13,14,15" into the column with ID "COL6" in WKS
    * User enters the value "=SUM(D1:E1)" into the cell identified by row 1 and column 2 of the right panel in the WKS
    * User copies the cell contents from the cell identified by row 1 and column 2 to all cells between rows 2 to 10 in column 2
    * User enters the value "=H1-F1" into the cell identified by row 1 and column 3 of the right panel in the WKS
    * User copies the cell contents from the cell identified by row 1 and column 3 to all cells between rows 2 to 10 in column 3
    * User enters the value "=SUM(I1:J1)+SUM(D1:F1)" into the cell identified by row 1 and column 4 of the right panel in the WKS
    * User copies the cell contents from the cell identified by row 1 and column 4 to all cells between rows 2 to 10 in column 4
    * Enter the values "11,12,13,14,15" into the column with ID "COL10" in WKS
    * Enter the values "11,2,3,4,5" into the column with ID "COL5" in WKS
    Then I validate that the cells between columns with aria-indexes 2 and 10 and in rows with aria-indexes between 1 and 6 have the "style" attributes "font-style: normal !important; text-decoration: none !important"
    When User clears all data from the WKS
    * Enter the values "1,2,3,4,5" into the column with ID "COL4" in WKS
    * Enter the values "11,12,13,14,15" into the column with ID "COL5" in WKS
    When I format the cells between columns with aria-indexes 10 and 10 and in rows with aria-indexes between 1 and 5 with "Bold,Italic,Underline"
    When User copies the cell contents from the column with ID "COL5" to column with ID "COL6"
    * User copies the cell contents from the column with ID "COL5" to column with ID "COL7"
    * User copies the cell contents from the column with ID "COL5" to column with ID "COL8"
    * User copies the cell contents from the column with ID "COL5" to column with ID "COL9"
    * User copies the cell contents from the column with ID "COL5" to column with ID "COL10"
    Then I validate that the cells between columns with aria-indexes 5 and 9 and in rows with aria-indexes between 1 and 5 have the "style" attributes "font-weight: bold !important; font-style: italic !important; text-decoration: underline !important"

  @WKS_Mandatory @TO-DO-BY-DEV
  Scenario: Validate that the text formats hold when the user adds, removes look up columns to PD grid
    When I add 0 blank rows, 5 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * User navigates to the WKS
    * User resizes all columns in the WKS to "40px"
    * I add all available look up columns to the worksheet to the left of the column with column ID "COL5" as reference
    * User resizes all columns in the WKS to "40px"
    * I format the cells between columns with aria-indexes 1 and 12 and in rows with aria-indexes between 1 and 6 with "Bold,Italic,Underline"
    Then I validate that the cells between columns with aria-indexes 1 and 12 and in rows with aria-indexes between 1 and 6 have the "style" attributes "font-weight: bold !important; font-style: italic !important; text-decoration: underline !important"
  #   When I delete all the look up columns with IDs from "COL3" to "COL4"
  #   * I delete all the look up columns with IDs from "COL6" to "COL12"
  #   When User clicks action icon of column "COL5"
  #   * I click on the text "Add a Lookup Column"
  #   * I click on " Alias " identified as a hyperlink
  #   * User clicks action icon of column "COL5"
  #   * I click on the text "Add a Lookup Column"
  #   * I click on " Description " identified as a hyperlink
  #   * User clicks action icon of column "COL5"
  #   * I click on the text "Add a Lookup Column"
  #   * I click on " Tags " identified as a hyperlink
  #   * User clicks action icon of column "COL5"
  #   * I click on the text "Add a Lookup Column"
  #   * I click on " RSN " identified as a hyperlink
  #   * User clicks action icon of column "COL5"
  #   * I click on the text "Add a Lookup Column"
  #   * I click on " RSNe " identified as a hyperlink
  #   * User clicks action icon of column "COL5"
  #   * I click on the text "Add a Lookup Column"
  #   * I click on " IDH " identified as a hyperlink
  #   Then I validate that the cells between columns with aria-indexes 1 and 9 and in rows with aria-indexes between 1 and 6 have the style attributes "font-weight: bold !important; font-style: italic !important; text-decoration: underline !important"

  @WKS_Mandatory @T0-DO-BY-DEV
  Scenario: Validate that the text formats applied in PD grid hold good when user groups rows together
    When I add 0 blank rows, 5 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * User navigates to the WKS
    * User "groups" the rows identified by indexes "1,2,3,4,5"
    * I click on the text "Group rows"
    * User names the row as "abcd!@#$1234"
    Then User validates that the group "abcd!@#$1234" is added to the worksheet
    When I format the cells between columns with aria-indexes 1 and 5 and in rows with aria-indexes between 1 and 7 with "Bold,Italic,Underline"
    Then I validate that the cells between columns with aria-indexes 1 and 5 and in rows with aria-indexes between 1 and 7 have the "class" attributes "cell-formatting-bold cell-formatting-italic cell-formatting-underline"
    When User "groups" the rows identified by indexes "3,4,5"
    * I click on the text "Group rows"
    * User names the row as "abcd!@#$123456"
    Then I validate that the cells between columns with aria-indexes 1 and 5 and in rows with aria-indexes between 1 and 1 have the "class" attributes "cell-formatting-bold cell-formatting-italic cell-formatting-underline"
    # * I validate that the cells between columns with aria-indexes 1 and 5 and in rows with aria-indexes between 1 and 8 have the "style" attributes "font-weight: bold !important; font-style: italic !important; text-decoration: underline !important"

  @WKS_Mandatory
  Scenario: Validate that the text formats applied in Apps grid hold good in the case of look up rows & row grouping
    When User navigates to the WKS
    * I expand or collapse the row with aria-indexes "2"
    * I expand the apps grid section in the worksheet
    * I add the look up rows "Description,Alias" starting from the row at index 4 in the apps grid
    * User navigates to the WKS
    When I format the cells between columns with aria-indexes 1 and 5 and in rows with aria-indexes between 4 and 11 with "Bold,Italic,Underline"
    Then I validate that the cells between columns with aria-indexes 1 and 5 and in rows with aria-indexes between 4 and 11 have the "style" attributes "font-weight: bold !important; font-style: italic !important; text-decoration: underline !important"
    When User "groups" the rows identified by indexes "2,3,4,5,6,7,8,9"
    * I click on the text "Group rows"
    * User names the row as "Test Apps Grid RG 1"
    * I expand or collapse the row with aria-indexes "2"
    * I format the cells between columns with aria-indexes 1 and 6 and in rows with aria-indexes between 3 and 12 with "Bold,Italic,Underline"
    Then I validate that the cells between columns with aria-indexes 1 and 6 and in rows with aria-indexes between 4 and 12 have the "class" attributes "cell-formatting-bold cell-formatting-italic cell-formatting-underline"
    When Enter the values "123" into the column with ID "COL4" in WKS
    When User waits for 1 seconds
    Then I validate that the cells between columns with aria-indexes 1 and 6 and in rows with aria-indexes between 4 and 12 have the "class" attributes "cell-formatting-bold cell-formatting-italic cell-formatting-underline"
    When Add "Apps Grid" "Blank" rows in WKS
    * Add 3 blank rows to WKS
    * I add 1 formula columns and 1 blank columns into the PD grid of all the sheets of the worksheet
    * User resizes all columns in the WKS to "60px"
    * I expand or collapse the row with aria-indexes "2"
    * User expands the row group number "4" in the work sheet
    Then I validate that the cells between columns with aria-indexes 1 and 4 and in rows with aria-indexes between 6 and 14 have the "class" attributes "cell-formatting-bold cell-formatting-italic cell-formatting-underline"
    * I validate that the cells between columns with aria-indexes 7 and 7 and in rows with aria-indexes between 6 and 14 have the "class" attributes "cell-formatting-bold cell-formatting-italic cell-formatting-underline"
    When Enter the values "123,sdjkhcflqkjebrc!!!!,!@#$%^&*()" into the column with ID "COL4" in WKS
    * Enter the values "210293e02knkn,ldkmcrme!@#,sdcmel!@#!@" into the column with ID "COL5" in WKS
    * I format the cells between columns with aria-indexes 1 and 7 and in rows with aria-indexes between 3 and 5 with "Bold,Italic,Underline"
    Then I validate that the cells between columns with aria-indexes 1 and 7 and in rows with aria-indexes between 3 and 5 have the "style" attributes "font-weight: bold !important; font-style: italic !important; text-decoration: underline !important"
    When I format the cells between columns with aria-indexes 1 and 7 and in rows with aria-indexes between 3 and 14 with "Bold,Italic,Underline"
    Then I validate that the cells between columns with aria-indexes 1 and 7 and in rows with aria-indexes between 3 and 14 have the "style" attributes "font-style: normal !important; text-decoration: none !important"
    When I format the cells between columns with aria-indexes 1 and 7 and in rows with aria-indexes between 3 and 14 with "Bold,Italic,Underline"
    Then I validate that the cells between columns with aria-indexes 1 and 7 and in rows with aria-indexes between 3 and 14 have the "style" attributes "font-weight: bold !important; font-style: italic !important; text-decoration: underline !important"
    When User copies the cell contents from the column with ID "COL5" to column with ID "COL6"
    * User copies the cell contents from the column with ID "COL6" to column with ID "COL7"
    Then I validate that the cells between columns with aria-indexes 1 and 7 and in rows with aria-indexes between 3 and 14 have the "style" attributes "font-weight: bold !important; font-style: italic !important; text-decoration: underline !important"

  @WKS_Mandatory
  Scenario: Validate cell formatting for the rows added in the Results Grid
    When I add 0 blank rows, 3 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * I add 2 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * User navigates to the WKS
    * I fetch the column names of all the formula columns in the WKS
    * User clicks action icon of column "COL5"
    * User clicks on "Create Property Task" in the action menu
    * I create a propety task with the formulas present in the worksheet with 1 datatemplates, 1 tags and a random note of length 200 characters
    * User clicks action icon of column "COL6"
    * User clicks on "Create Property Task" in the action menu
    * I create a propety task with the formulas present in the worksheet with 2 datatemplates, 2 tags and a random note of length 200 characters
    * User clicks action icon of column "COL7"
    * User clicks on "Create Property Task" in the action menu
    * I create a propety task with the formulas present in the worksheet with 3 datatemplates, 3 tags and a random note of length 200 characters
    * I expand or collapse the row with aria-indexes "2,3"
    When I format the cells between columns with aria-indexes 1 and 7 and in rows with aria-indexes between 2 and 4 with "Bold,Italic,Underline"
    * User waits for 1 seconds
    Then I validate that the cells between columns with aria-indexes 1 and 7 and in rows with aria-indexes between 2 and 4 have the "style" attributes "font-weight: bold !important; font-style: italic !important; text-decoration: underline !important"
    When User "groups" the rows identified by indexes "1,2,3"
    * I click on the text "Group rows"
    * User names the row as "Test Property Task Group 1"