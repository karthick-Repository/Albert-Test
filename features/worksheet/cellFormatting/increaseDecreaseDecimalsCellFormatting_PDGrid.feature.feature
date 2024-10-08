Feature: Tests to validate the increase decrease decimals cell formatting across PD grid, Apps Grid & Results Grid in worksheet

    Background: User logs in and navigates to WKS
        When User creates a project
        * User enables worksheet for the created project
        * I add 5 blank rows, 5 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
        * I add 2 formula columns and 2 blank columns into the PD grid of all the sheets of the worksheet
        * User navigates to the WKS
        * User resizes all columns in the WKS to "70px"
        * Enter the values "10,15,20,25,30,35,40,45,50,55" into the column with ID "COL4" in WKS
        * User enters the formulae "=SQRT(ABS(D1^2 -      D1/2)),=SQRT(ABS(D2 ^2 - D2/2)),=SQRT(ABS( D3^2 - D3/2)),=SQRT(ABS(D4^2 - D4/ 2)),=SQRT(ABS(D 5^2 - D5/2)),=SQRT(ABS(D6^2 - D6/2)), =SUM(D1:D6),=SQRT(ABS(D7^2 - D7/2)),=SQRT(ABS(D8^2 - D8/2)),=SQRT(ABS(D9^2 - D9/2)),=SQRT(ABS(D10^2 - D10/2))" into the cells of the column with ID "COL5" in WKS
        * User enters the formulae "=LOG(D1 + 1),=LOG(D2 + 2),=LOG(D3 + 3),=LOG(D4 + 4),=LOG(D5 + 5),=LOG(D6 + 6),=LOG(D7 + 7),=LOG(D8 + 8),=LOG(D9 + 9),=LOG(D10 + 10)" into the cells of the column with ID "COL6" in WKS
        * User enters the formulae "=SIN(D1),=SIN(D2),=SIN(D3),=SIN(D4),=SIN(D5),=SIN(D6),=SIN(D7),=SIN(D8),=SIN(D9),=SIN(D10)" into the cells of the column with ID "COL7" in WKS
        * User enters the formulae "=-D1,=-D2,=-D3,=-D4,=-D5,=-D6,=-D7,=-D8,=-D9,=-D10" into the cells of the column with ID "COL8" in WKS
        * User enters the formulae "=ROUND(D1 * PI(), 2),=ROUND(D2 * PI(), 2),=ROUND(D3 * PI(), 2),=ROUND(D4 * PI(), 2),=ROUND(D5 * PI(), 2),=ROUND(D6 * PI(), 2),=ROUND(D7 * PI(), 2),=ROUND(D8 * PI(), 2),=ROUND(D9 * PI(), 2),=ROUND(D10 * PI(), 2)" into the cells of the column with ID "COL9" in WKS

    @WKS_Mandatory @INVENT-4187 @INVENT-4202
    Scenario: Validate that the increase & decrease decimals cell formatting holds good PD grid
        When I "decrease" the decimal value by 3 between columns with aria-indexes 5 and 5 and in rows with row-indexes between 1 and 11
        Then Validate that the cell values in the column identified by the ID "COL6" are "1.04139,1.23045,1.36173,1.46240,1.54407,1.61278,1.67210,1.72428,1.77085,1.81291"
        When I "decrease" the decimal value by 5 between columns with aria-indexes 5 and 5 and in rows with row-indexes between 1 and 11
        Then Validate that the cell values in the column identified by the ID "COL6" are "1,1,1,1,2,2,2,2,2,2"
        * Validate that the inventory total for the column with column ID "COL6" is "7"
        When I "increase" the decimal value by 7 between columns with aria-indexes 5 and 5 and in rows with row-indexes between 1 and 11
        Then Validate that the cell values in the column identified by the ID "COL6" are "1.0413927,1.2304489,1.3617278,1.4623980,1.5440680,1.6127839,1.6720979,1.7242759,1.7708520,1.8129134"
        * Validate that the inventory total for the column with column ID "COL6" is "6.6400350"
        When I "decrease" the decimal value by 1 between columns with aria-indexes 4 and 9 and in rows with row-indexes between 1 and 11
        Then Validate that the cell values in the column identified by the ID "COL4" are "10,15,20,25,30,35,40,45,50,55"
        * Validate that the cell values in the column identified by the ID "COL5" are "10,15,20,25,30,35,135,40,45,50"
        * Validate that the cell values in the column identified by the ID "COL6" are "1,1,1,1,2,2,2,2,2,2"
        * Validate that the cell values in the column identified by the ID "COL7" are ",1,1,,,-0,1,1,-0,-1"
        * Validate that the cell values in the column identified by the ID "COL8" are "-10,-15,-20,-25,-30,-35,-40,-45,-50,-55"
        * Validate that the cell values in the column identified by the ID "COL9" are "31,47,63,79,94,110,126,141,157,173"
        When I "increase" the decimal value by 7 between columns with aria-indexes 4 and 9 and in rows with row-indexes between 1 and 11
        * I "decrease" the decimal value by 7 between columns with aria-indexes 4 and 9 and in rows with row-indexes between 1 and 11
        Then Validate that the cell values in the column identified by the ID "COL4" are "10,15,20,25,30,35,40,45,50,55"
        * Validate that the cell values in the column identified by the ID "COL5" are "10,15,20,25,30,35,135,40,45,50"
        * Validate that the cell values in the column identified by the ID "COL6" are "1,1,1,1,2,2,2,2,2,2"
        * Validate that the cell values in the column identified by the ID "COL7" are ",1,1,,,-0,1,1,-0,-1"
        * Validate that the cell values in the column identified by the ID "COL8" are "-10,-15,-20,-25,-30,-35,-40,-45,-50,-55"
        * Validate that the cell values in the column identified by the ID "COL9" are "31,47,63,79,94,110,126,141,157,173"
        When I "increase" the decimal value by 7 between columns with aria-indexes 5 and 9 and in rows with row-indexes between 1 and 11
        * I "decrease" the decimal value by 1 between columns with aria-indexes 4 and 9 and in rows with row-indexes between 1 and 11
        # Then Validate that the cell values in the column identified by the ID "COL4" are "10,15,20,25,30,35,40,45,50,55"
        # * Validate that the cell values in the column identified by the ID "COL5" are "10,15,20,25,30,35,135,40,45,50"
        # * Validate that the cell values in the column identified by the ID "COL6" are "1,1,1,1,2,2,2,2,2,2"
        # * Validate that the cell values in the column identified by the ID "COL7" are ",1,1,,,-0,1,1,-0,-1"
        # * Validate that the cell values in the column identified by the ID "COL8" are "-10,-15,-20,-25,-30,-35,-40,-45,-50,-55"
        # * Validate that the cell values in the column identified by the ID "COL9" are "31,47,63,79,94,110,126,141,157,173"
        When I "increase" the decimal value by 10 between columns with aria-indexes 5 and 9 and in rows with row-indexes between 1 and 11
        * User clicks action icon of column "COL5"
        * User clicks on "Normalize" in the action menu
        * Enter "12345678.1234" into the normalize input
        * User clicks on "Done"
        * User clicks on "Confirm"
        Then Validate that the cell values in the column identified by the ID "COL5" are "1218653.3800000,1843945.2700000,2469168.3400000,3094364.3000000,3719546.8400000,34.7491007,135.0000000,39.7492138,44.7493017,49.7493719"
        When I "decrease" the decimal value by 2 between columns with aria-indexes 5 and 9 and in rows with row-indexes between 1 and 11
        Then Validate that the cell values in the column identified by the ID "COL5" are "1218653.38000,1843945.27000,2469168.34000,3094364.30000,3719546.84000,34.74910,135.00000,39.74921,44.74930,49.74937"
        * Validate that the cell values in the column identified by the ID "COL6" are "1.04139,1.23045,1.36173,1.46240,1.54407,1.61278,1.67210,1.72428,1.77085,1.81291"
        * Validate that the cell values in the column identified by the ID "COL7" are ",0.65029,0.91295,,,-0.42818,0.74511,0.85090,-0.26237,-0.99976"
        * Validate that the cell values in the column identified by the ID "COL8" are "-10.00000,-15.00000,-20.00000,-25.00000,-30.00000,-35.00000,-40.00000,-45.00000,-50.00000,-55.00000"
        * Validate that the cell values in the column identified by the ID "COL9" are "31.42000,47.12000,62.83000,78.54000,94.25000,109.96000,125.66000,141.37000,157.08000,172.79000"
        * Validate that the inventory total for the column with column ID "COL5" is "12345678.13000"
        # When User clicks action icon of column "COL5"
        # * User clicks on "Copy To New" in the action menu
        # * User enters "2" into the copy to new input field
        # * User selects "Copy values only" radio button
        # * User clicks on "Done"
        # Then Validate that the cell values in the column identified by the ID "COL10" are "1218653.3800000,1843945.2700000,2469168.3400000,3094364.3000000,3719546.8400000,34.7491007,135.0000000,39.7492138,44.7493017,49.7493719"
        # * Validate that the cell values in the column identified by the ID "COL11" are "1218653.3800000,1843945.2700000,2469168.3400000,3094364.3000000,3719546.8400000,34.7491007,135.0000000,39.7492138,44.7493017,49.7493719"
        When I duplicate sheet number 1
        * I set a random 50 character string as the name of the sheet being duplicated
        * I "check" the checkbox number 3 in the "Product Design Grid" section
        * I click on the "Create" button to add new sheet
        * User waits for 2 seconds
        * I expand or collapse the row with aria-indexes "14,15"
        Then Validate that the cell values in the column identified by the ID "COL5" are "1218653.38000,1843945.27000,2469168.34000,3094364.30000,3719546.84000,34.74910,135.00000,39.74921,44.74930,49.74937"
        * Validate that the cell values in the column identified by the ID "COL6" are "1.04139,1.23045,1.36173,1.46240,1.54407,1.61278,1.67210,1.72428,1.77085,1.81291"
        * Validate that the cell values in the column identified by the ID "COL7" are ",0.65029,0.91295,,,-0.42818,0.74511,0.85090,-0.26237,-0.99976"
        * Validate that the cell values in the column identified by the ID "COL8" are "-10.00000,-15.00000,-20.00000,-25.00000,-30.00000,-35.00000,-40.00000,-45.00000,-50.00000,-55.00000"
        * Validate that the cell values in the column identified by the ID "COL9" are "31.42000,47.12000,62.83000,78.54000,94.25000,109.96000,125.66000,141.37000,157.08000,172.79000"
        * Validate that the inventory total for the column with column ID "COL5" is "12345678.13000"
