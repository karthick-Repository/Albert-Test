Feature: Validate row and column indexes by adding blank/inventory rows

  Background: User logs in and navigates to WKS
    When User creates a project
    * User enables worksheet for the created project
    * I add 10 blank rows, 10 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * I add 20 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * User navigates to the WKS
    * User resizes all columns in the WKS to "40px"

  @WKS_Mandatory @TO-DO
  Scenario: Validate the the cell color coding with overlapping formula & look-up rows
    When User enters the value "=SUM(F1:W20)+SUMPRODUCT(G2:U3)+SUM(M1:M7)-PRODUCT(H6:O12)*INTERVAL(K9)+SUMPRODUCT(W15:A12)" into the cell identified by row 1 and column 1 of the right panel in the WKS
    * User just double clicks on the cell identified by row "1" in column identified by ID "COL6" in WKS
    * I fetch the color code details from the formula cell
    Then I validate that the color code of the cells in rows between "1" to "1" and columns between "6" to "12" matches with the color code of the original formula at index "1"
    * I validate that the color code of the cells in rows between "1" to "1" and columns between "14" to "20" matches with the color code of the original formula at index "1"
    * I validate that the color code of the cells in rows between "1" to "11" and columns between "23" to "24" matches with the color code of the original formula at index "1"
    * I validate that the color code of the cells in rows between "1" to "11" and columns between "7" to "7" matches with the color code of the original formula at index "1"
    * I validate that the color code of the cells in rows between "2" to "3" and columns between "8" to "13" matches with the color code of the original formula at index "2"
    * I validate that the color code of the cells in rows between "2" to "3" and columns between "14" to "14" matches with the color code of the original formula at index "3"
    * I validate that the color code of the cells in rows between "2" to "3" and columns between "15" to "22" matches with the color code of the original formula at index "2"
    * I validate that the color code of the cells in rows between "4" to "7" and columns between "14" to "14" matches with the color code of the original formula at index "3"
    * I validate that the color code of the cells in rows between "6" to "12" and columns between "9" to "9" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "6" to "12" and columns between "16" to "16" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "12" to "12" and columns between "9" to "16" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "12" to "12" and columns between "9" to "16" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "9" to "9" and columns between "12" to "12" matches with the color code of the original formula at index "5"
    * I validate that the color code of the cells in rows between "12" to "15" and columns between "1" to "1" matches with the color code of the original formula at index "3"
    When User clicks action icon of column "COL6"
    * I click on the text "Add a Lookup Column"
    * I click on " Alias " identified as a hyperlink
    * User clicks action icon of column "COL6"
    * I click on the text "Add a Lookup Column"
    * I click on " Description " identified as a hyperlink
    * User clicks action icon of column "COL6"
    * I click on the text "Add a Lookup Column"
    * I click on " Tags " identified as a hyperlink
    * User resizes all columns in the WKS to "40px"
    * User clicks action icon of column "COL6"
    * I click on the text "Add a Lookup Column"
    * I click on " RSN " identified as a hyperlink
    * User clicks action icon of column "COL6"
    * I click on the text "Add a Lookup Column"
    * I click on " RSNe " identified as a hyperlink
    * User clicks action icon of column "COL6"
    * I click on the text "Add a Lookup Column"
    * I click on " IDH " identified as a hyperlink
    * User resizes all columns in the WKS to "40px"
    * User fetch the value of the cell identified by row "1" in column identified by ID "COL6" in WKS
    Then Validate that the value fetched from the cell is "=SUM(L1:AC20)+SUMPRODUCT(M2:AA3)+SUM(S1:S7)-PRODUCT(N6:U12)*INTERVAL(Q9)+SUMPRODUCT(AC15:A12)"
    When User enters the value "=SUM(E1:AC20)+SUMPRODUCT(M2:AA3)+SUM(S1:S7)-PRODUCT(N6:U12)*INTERVAL(Q9)+SUMPRODUCT(AC15:A12)" into the cell identified by row 2 and column 7 of the right panel in the WKS
    * User just double clicks on the cell identified by row "2" in column identified by ID "COL6" in WKS
    * I fetch the color code details from the formula cell
    Then I validate that the color code of the cells in rows between "1" to "1" and columns between "5" to "12" matches with the color code of the original formula at index "1"
    * I validate that the color code of the cells in rows between "1" to "11" and columns between "5" to "5" matches with the color code of the original formula at index "1"
    * I validate that the color code of the cells in rows between "1" to "1" and columns between "19" to "19" matches with the color code of the original formula at index "3"
    * I validate that the color code of the cells in rows between "1" to "1" and columns between "20" to "29" matches with the color code of the original formula at index "1"
    * I validate that the color code of the cells in rows between "2" to "3" and columns between "13" to "18" matches with the color code of the original formula at index "2"
    * I validate that the color code of the cells in rows between "2" to "3" and columns between "19" to "19" matches with the color code of the original formula at index "3"
    * I validate that the color code of the cells in rows between "2" to "3" and columns between "20" to "27" matches with the color code of the original formula at index "2"
    * I validate that the color code of the cells in rows between "4" to "7" and columns between "19" to "19" matches with the color code of the original formula at index "3"
    * I validate that the color code of the cells in rows between "6" to "8" and columns between "19" to "19" matches with the color code of the original formula at index "3"
    * I validate that the color code of the cells in rows between "8" to "8" and columns between "14" to "21" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "9" to "9" and columns between "17" to "17" matches with the color code of the original formula at index "5"
    * I validate that the color code of the cells in rows between "6" to "6" and columns between "14" to "18" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "6" to "6" and columns between "20" to "21" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "12" to "12" and columns between "14" to "21" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "6" to "12" and columns between "21" to "21" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "6" to "12" and columns between "14" to "14" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "12" to "12" and columns between "9" to "16" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "12" to "12" and columns between "9" to "16" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "9" to "9" and columns between "12" to "12" matches with the color code of the original formula at index "5"
    * I validate that the color code of the cells in rows between "12" to "15" and columns between "1" to "1" matches with the color code of the original formula at index "6"
    When User enters the value "=SUM(L1:$AC$20)+$SUMPRODUCT($M2:$AA3)+SUM($S$1:$S$7)-PRODUCT($N6:$U12)*INTERVAL(Q$9)+SUMPRODUCT($AC$15:$A$12)" into the cell identified by row 2 and column 7 of the right panel in the WKS
    * User waits for 2 seconds
    * User just double clicks on the cell identified by row "2" in column identified by ID "COL6" in WKS
    * I fetch the color code details from the formula cell
    Then I validate that the color code of the cells in rows between "1" to "1" and columns between "5" to "12" matches with the color code of the original formula at index "1"
    * I validate that the color code of the cells in rows between "1" to "11" and columns between "5" to "5" matches with the color code of the original formula at index "1"
    * I validate that the color code of the cells in rows between "1" to "1" and columns between "19" to "19" matches with the color code of the original formula at index "3"
    * I validate that the color code of the cells in rows between "1" to "1" and columns between "20" to "29" matches with the color code of the original formula at index "1"
    * I validate that the color code of the cells in rows between "2" to "3" and columns between "13" to "18" matches with the color code of the original formula at index "2"
    * I validate that the color code of the cells in rows between "2" to "3" and columns between "19" to "19" matches with the color code of the original formula at index "3"
    * I validate that the color code of the cells in rows between "2" to "3" and columns between "20" to "27" matches with the color code of the original formula at index "2"
    * I validate that the color code of the cells in rows between "4" to "7" and columns between "19" to "19" matches with the color code of the original formula at index "3"
    * I validate that the color code of the cells in rows between "6" to "8" and columns between "19" to "19" matches with the color code of the original formula at index "3"
    * I validate that the color code of the cells in rows between "8" to "8" and columns between "14" to "21" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "9" to "9" and columns between "17" to "17" matches with the color code of the original formula at index "5"
    * I validate that the color code of the cells in rows between "6" to "6" and columns between "14" to "18" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "6" to "6" and columns between "20" to "21" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "12" to "12" and columns between "14" to "21" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "6" to "12" and columns between "21" to "21" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "6" to "12" and columns between "14" to "14" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "12" to "12" and columns between "9" to "16" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "12" to "12" and columns between "9" to "16" matches with the color code of the original formula at index "4"
    * I validate that the color code of the cells in rows between "9" to "9" and columns between "12" to "12" matches with the color code of the original formula at index "5"
    * I validate that the color code of the cells in rows between "12" to "15" and columns between "1" to "1" matches with the color code of the original formula at index "6"
    When User enters the value "=SUM(G1:G20)" into the cell identified by row 3 and column 7 of the right panel in the WKS
    * User just double clicks on the cell identified by row "3" in column identified by ID "COL6" in WKS
    * I fetch the color code details from the formula cell
    Then I validate that the color code of the cells in rows between "1" to "20" and columns between "28" to "28" matches with the color code of the original formula at index "1"
    When User clicks action icon of column "COL28"
    * User clicks on "Pin Column" in the action menu
    * User enters the value "=SUM(E1:E20)" into the cell identified by row 3 and column 7 of the right panel in the WKS
    * User just double clicks on the cell identified by row "3" in column identified by ID "COL6" in WKS
    * I fetch the color code details from the formula cell
    Then I validate that the color code of the cells in rows between "1" to "20" and columns between "28" to "28" matches with the color code of the original formula at index "1"
    When User enters the value "=M3+N3+M3+N3+M3+N3+M3+N3" into the cell identified by row 4 and column 7 of the right panel in the WKS
    * User just double clicks on the cell identified by row "4" in column identified by ID "COL7" in WKS
    * I fetch the color code details from the formula cell
    Then I validate that the total number of "span" in the active cell are 8
    # When Enter the values "10,20,30,40,50,10.12345,11.23456,12.34567,13.4567,14.56789,10,20,30,40,50,10.12345,11.23456,12.34567,13.4567,14.56789" into the column with ID "COL5" in WKS
    # * User enters the formulae "=SUM(A1:D1)+Y1" into the cells of the column with ID "COL9" in WKS
    # * User copies the cell contents from the cell identified by row 1 and column 9 to all cells between rows 2 to 20 in column 9
    # When User just double clicks and presses escape on the all cells in column identified by ID "COL9" in WKS
    # Then I validate that the color coding is not longer applied to the cells identified by the name column
