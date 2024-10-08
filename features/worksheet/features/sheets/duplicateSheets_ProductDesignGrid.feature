Feature: Tests to validate product grid scenarioes for duplicate sheet functionality

  Background: User logs in and navigates to WKS
    When User creates a project
    * User stores the details of the created project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I add 2 formula columns and 1 blank columns into the PD grid of all the sheets of the worksheet
    * I add 0 blank rows, 5 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * User resizes all columns in the WKS to "70px"
    * Enter the values "1,2,3,4,5" into the column with ID "COL4" in WKS
    * Enter the values "10,20,30,40,50" into the column with ID "COL5" in WKS
    * Enter the values "60,70,80,90,100" into the column with ID "COL6" in WKS
    * User enters the formulae "=SUM(E1:D1)/PRODUCT(H1:H5),=SUM(E2:E5-SUM(D$2:$D5)),=SUM(F1:$F$2),=F2+F1-F3,=SUM(F4:F2)" into the cells of the column with ID "COL7" in WKS
    * User enters the formulae "=SUM(F1:D1)/SUM(D1:D5)*0.0101010,=SUM(D2:H2),=G2-G1,=G2+G3+G1*SUM(D1:F5)+SUMPRODUCT(H1:H5),=SUM(F5:D5)/SUM(D5:D5)*0.0101010" into the cells of the column with ID "COL8" in WKS

  @WKS_Mandatory
  Scenario: Validate duplicate sheets scenario for a sheet with rows and columns & also validate that the locked column state is retained
    When User locks the column identified by column ID "COL7"
    * User locks the column identified by column ID "COL8"
    Then Validate that the cell values in the column identified by the ID "COL7" are "0.000005083,56,56.0000051,0,112.000005"
    * Validate that the cell values in the column identified by the ID "COL8" are "0.041077403,#CYCLE!,#CYCLE!,#CYCLE!,0.43838341"
    When I duplicate sheet number 1
    * I set a random 50 character string as the name of the sheet being duplicated
    * I "check" the checkbox number 3 in the "Product Design Grid" section
    * I click on the "Create" button
    * I expand or collapse the row with aria-index "9"
    * I expand or collapse the row with aria-index "10"
    Then Validate that the cell values in the column identified by the ID "COL7" are "0.000005083,56,56.0000051,0,112.000005"
    * Validate that the cell values in the column identified by the ID "COL8" are "0.041077403,#CYCLE!,#CYCLE!,#CYCLE!,0.43838341"
    * Validate that the inventory total for the column with column ID "COL7" is "224.000015"
    * Validate that the inventory total for the column with column ID "COL8" is "0.479461"
    * User validates that the column identified by column ID "COL7" is locked
    * User validates that the column identified by column ID "COL8" is locked

  @WKS_Mandatory
  Scenario: Validate duplicate sheets scenario for a sheet with rows and columns & also validate that the grouped rows state is retained
    When User "groups" the rows identified by indexes "1,3,5"
    * User clicks on the group rows button
    * User names the row as "TRGFS-1"
    * User waits for 2 seconds
    * User "groups" the rows identified by indexes "2,3,4"
    * User clicks on the group rows button
    * User names the row as "TRGFS-2"
    * User waits for 2 seconds
    * User expands the row group number "2" in the work sheet
    * User "groups" the rows identified by indexes "7,8"
    * User clicks on the group rows button
    * User names the row as "TRGFS-3"
    * User waits for 2 seconds
    Then Validate that the cell values in the column identified by the ID "COL5" are ",,10,,30,50,20,40"
    * Validate that the cell values in the column identified by the ID "COL6" are ",,60,,80,100,70,90"
    * Validate that the cell values in the column identified by the ID "COL7" are ",,0.004066667,,#CYCLE!,#CYCLE!,63,#CYCLE!"
    * Validate that the cell values in the column identified by the ID "COL8" are ",,0.068466897,,#CYCLE!,#CYCLE!,#CYCLE!,#CYCLE!"
    When I fetch all the rows in the product design grid
    * I duplicate sheet number 1
    * I set a random 20 character string as the name of the sheet being duplicated
    * I "check" the checkbox number 3 in the "Product Design Grid" section
    * I click on the "Create" button
    * I expand or collapse the row with aria-index "12"
    * I expand or collapse the row with aria-index "13"
    Then I validate that the grouped rows state is preserved after user duplicates the sheet
    * Validate that the cell values in the column identified by the ID "COL5" are ",,10,,30,50,20,40"
    * Validate that the cell values in the column identified by the ID "COL6" are ",,60,,80,100,70,90"
    * Validate that the cell values in the column identified by the ID "COL7" are ",,0.004066667,,#CYCLE!,#CYCLE!,63,#CYCLE!"
    * Validate that the cell values in the column identified by the ID "COL8" are ",,0.068466897,,#CYCLE!,#CYCLE!,#CYCLE!,#CYCLE!"

  # @WKS_Mandatory
  # Scenario: Validate duplicate sheets scenario for a sheet with rows and columns
  #   When I duplicate sheet number 1
  #   # * I set a random 50 character string as the name of the sheet being duplicated
  #   * I click on icon 2 of type > in the "Product Design Grid"
  #   Then I validate the initial contents of the Select Columns To Copy dialog for "5" rows and "4" columns with the following calculation references "D,E,H,F" in the sheet
