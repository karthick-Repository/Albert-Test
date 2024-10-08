Feature: Copy from existing with calculations related validations

  Background: User logs in and navigates to WKS
    When User creates a project
    Then User enables worksheet for the created project
    * User navigates to the WKS
    * User is in the WKS page
    When I add 4 blank rows, 5 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * I add 4 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * User resizes all columns in the WKS to "70px"
    * User reloads the page
    * User is in the WKS page
    
  @WKS_Mandatory @calculation_tests
  Scenario: Validate that no negative values appear in the cells when user performs copy from existing operation involving multiple column formulae
    When Enter the values "90, 80, 70, 60, 50, 40, 30, 20, 10" into the column with ID "COL7" in WKS
    * Enter the values "10, 20, 30, 40, 50, 60, 70, 80, 90" into the column with ID "COL8" in WKS
    * Enter the values "1, 2, 3, 4, 5, 6, 7, 8, 9" into the column with ID "COL5" in WKS
    * User enters the formulae "=SUM(F1:G3)-SUM(I1:I3), =SUMPRODUCT(F2:G4)-PRODUCT((I1:I3)), =PRODUCT(I1:I3)-(H2-H1), =SUMPRODUCT(H1:H3)-SUMPRODUCT(H1:H2), =PRODUCT(H1:I1)-PRODUCT(I2:I3)/2, =SUM(F6:G9)-MAX(H1:I3), =AVERAGE(F1:G9)-SUM($I$1:$I$3), =SUM(F$1:G$6)-SUM(I1:I$3), =PRODUCT(I1:I3)*0.00000000045" into the cells of the column with ID "COL6" in WKS
    Then Validate that the cell values in the column identified by the ID "COL6" are "294,294,6,0,,397,44,594,3e-9"
    When Validate that the inventory total for the column with column ID "COL6" is "594"
    When I perform Copy From Existing operation on column "COL9" using "COL6" with "calculations"
    * User is in the WKS page
    Then Validate that the cell values in the column identified by the ID "COL9" are "294,294,6,0,,397,44,594,3e-9"
    * Validate that the inventory total for the column with column ID "COL9" is "594"
    When User just double clicks and pressed escape on the cell identified by row "5" in column identified by ID "COL9" in WKS
    * User just double clicks and pressed escape on the cell identified by row "1" in column identified by ID "COL9" in WKS
    * User just double clicks and pressed escape on the cell identified by row "2" in column identified by ID "COL9" in WKS
    Then Validate that the cell values in the column identified by the ID "COL9" are "294,294,6,0,,397,44,594,3e-9"
    * Validate that the inventory total for the column with column ID "COL6" is "594"
