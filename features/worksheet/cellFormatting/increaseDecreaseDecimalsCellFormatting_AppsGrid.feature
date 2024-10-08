Feature: Tests to validate the increase decrease decimals cell formatting across Apps Grid

    Background: User creates a worksheet & adds data into the apps grid rows
        When User creates a project
        * User enables worksheet for the created project
        * I add 2 formula columns and 2 blank columns into the PD grid of all the sheets of the worksheet
        * User navigates to the WKS
        * I expand or collapse the row with aria-indexes "2,4"
        * I add the look up rows "Description,Alias" starting from the row at index 4 in the apps grid
        * Add "Apps Grid" "Blank" rows in WKS
        * Add 3 blank rows to WKS
        * User resizes all columns in the WKS to "70px"
        * I expand or collapse the row with aria-indexes "2"
        * Enter the values "1.1,2.22,3.333" into the column with ID "COL4" in WKS
        * Enter the values "-01.0001,-2.2222,-3.333" into the column with ID "COL5" in WKS
        * Enter the values "123123.12312,1231.123,21.12321141" into the column with ID "COL6" in WKS
        * Enter the values "10.10,20.20,30.30002" into the column with ID "COL7" in WKS
        * Enter the values "4.234312,5.123124,6.124124124124324324" into the column with ID "COL8" in WKS
        * Enter the values "1.1231241,20.213141,31.12412412" into the column with ID "COL9" in WKS
        * User just double clicks on the cell identified by row "6" in column identified by ID "COL5" in WKS
        * I add 2 tags in tags section
        * User clicks on "Done"
        * User just double clicks on the cell identified by row "6" in column identified by ID "COL6" in WKS
        * I add 3 tags in tags section
        * User clicks on "Done"
        * User just double clicks on the cell identified by row "6" in column identified by ID "COL7" in WKS
        * I add 1 tags in tags section
        * User clicks on "Done"
        * User resizes all columns in the WKS to "130px"
        * I expand or collapse the row with aria-indexes "2"
        * User enters the value "2234312413.123423" into the cell identified by row 8 and column 1 of the right panel in the WKS
        * User enters the value "0" into the cell identified by row 8 and column 2 of the right panel in the WKS
        * User enters the value "0.000001" into the cell identified by row 8 and column 5 of the right panel in the WKS
        * User enters the value "2234312413.123423" into the cell identified by row 9 and column 1 of the right panel in the WKS
        * User enters the value "0" into the cell identified by row 9 and column 2 of the right panel in the WKS
        * User enters the value "0.000001" into the cell identified by row 9 and column 5 of the right panel in the WKS
        * User enters the value "2234312413.123423" into the cell identified by row 12 and column 1 of the right panel in the WKS
        * User enters the value "0.12312e12" into the cell identified by row 12 and column 2 of the right panel in the WKS
        * User enters the value "0.000001#$^%&" into the cell identified by row 12 and column 5 of the right panel in the WKS
        * User enters the value "2234312413.123423" into the cell identified by row 13 and column 1 of the right panel in the WKS
        * User enters the value "0.12312e12" into the cell identified by row 13 and column 2 of the right panel in the WKS
        * User enters the value "0.000001#$^%&" into the cell identified by row 13 and column 5 of the right panel in the WKS

    @WKS_Mandatory @INVENT-4393
    Scenario: Validate that the increase & decrease decimals cell formatting holds good Apps grid
        Then Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 3 and 5 are "-1.0001,-2.2222,-3.333"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 8 and 9 are "0.000001,0.000001"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 12 and 13 are "0.000001#$^%&,0.000001#$^%&"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 3 and 5 are "123123.12312,1231.123,21.12321141"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 8 and 9 are "2234312413.123423,2234312413.123423"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 12 and 13 are "2234312413.123423,2234312413.123423"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 3 and 5 are "10.1,20.2,30.30002"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 8 and 9 are "0,0"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 12 and 13 are "0.12312e12,0.12312e12"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 3 and 5 are "4.234312,5.123124,6.124124124124324"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 6 and 13 are ",,,,,,,"
        * Validate that the cell values in the column identified by the ID "COL9" between the rows with row-indexes 3 and 5 are "1.1231241,20.213141,31.12412412"
        * Validate that the cell values in the column identified by the ID "COL9" between the rows with row-indexes 6 and 13 are ",,,,,,,"
        When I "decrease" the decimal value by 7 between columns with aria-indexes 5 and 9 and in rows with row-indexes between 3 and 13
        Then Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 3 and 5 are "-1,-2,-3"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 8 and 9 are "0,0"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 12 and 13 are "0.000001#$^%&,0.000001#$^%&"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 3 and 5 are "123123,1231,21"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 8 and 9 are "2234312413,2234312413"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 12 and 13 are "2234312413,2234312413"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 3 and 5 are "10,20,30"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 8 and 9 are "0,0"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 12 and 13 are "0.12312e12,0.12312e12"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 3 and 5 are "4,5,6"
        * Validate that the cell values in the column identified by the ID "COL9" between the rows with row-indexes 3 and 5 are "1,20,31"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 6 and 13 are ",,,,,,,"
        * Validate that the cell values in the column identified by the ID "COL9" between the rows with row-indexes 6 and 13 are ",,,,,,,"
        When I "increase" the decimal value by 5 between columns with aria-indexes 5 and 9 and in rows with row-indexes between 3 and 13
        Then Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 3 and 5 are "-1.00010,-2.22220,-3.33300"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 8 and 9 are "0.00000,0.00000"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 12 and 13 are "0.000001#$^%&,0.000001#$^%&"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 3 and 5 are "123123.12312,1231.12300,21.12321"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 8 and 9 are "2234312413.12342,2234312413.12342"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 12 and 13 are "2234312413.12342,2234312413.12342"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 3 and 5 are "10.10000,20.20000,30.30002"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 8 and 9 are "0.00000,0.00000"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 12 and 13 are "0.12312e12,0.12312e12"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 3 and 5 are "4.23431,5.12312,6.12412"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 6 and 13 are ",,,,,,,"
        * Validate that the cell values in the column identified by the ID "COL9" between the rows with row-indexes 3 and 5 are "1.12312,20.21314,31.12412"
        * Validate that the cell values in the column identified by the ID "COL9" between the rows with row-indexes 6 and 13 are ",,,,,,,"
        When I "decrease" the decimal value by 1 between columns with aria-indexes 4 and 9 and in rows with row-indexes between 3 and 13
        Then Validate that the cell values in the column identified by the ID "COL4" between the rows with row-indexes 3 and 5 are "1,2,3"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 3 and 5 are "-1,-2,-3"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 8 and 9 are "0,0"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 12 and 13 are "0.000001#$^%&,0.000001#$^%&"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 3 and 5 are "123123,1231,21"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 8 and 9 are "2234312413,2234312413"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 12 and 13 are "2234312413,2234312413"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 3 and 5 are "10,20,30"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 8 and 9 are "0,0"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 12 and 13 are "0.12312e12,0.12312e12"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 3 and 5 are "4,5,6"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 6 and 13 are ",,,,,,,"
        * Validate that the cell values in the column identified by the ID "COL9" between the rows with row-indexes 3 and 5 are "1,20,31"
        * Validate that the cell values in the column identified by the ID "COL9" between the rows with row-indexes 6 and 13 are ",,,,,,,"
        When I "increase" the decimal value by 7 between columns with aria-indexes 4 and 9 and in rows with row-indexes between 3 and 13
        * User clears all data from the WKS starting from row 3
        * Enter the values "1.1,2.22,3.333" into the column with ID "COL4" in WKS
        * Enter the values "-01.0001,-2.2222,-3.333" into the column with ID "COL5" in WKS
        * Enter the values "123123.12312,1231.123,21.12321141" into the column with ID "COL6" in WKS
        * Enter the values "10.10,20.20,30.30002" into the column with ID "COL7" in WKS
        * Enter the values "4.234312,5.123124,6.124124124124324324" into the column with ID "COL8" in WKS
        * Enter the values "1.1231241,20.213141,31.12412412" into the column with ID "COL9" in WKS
        * User enters the value "2234312413.123423" into the cell identified by row 8 and column 1 of the right panel in the WKS
        * User enters the value "0" into the cell identified by row 8 and column 2 of the right panel in the WKS
        * User enters the value "0.000001" into the cell identified by row 8 and column 5 of the right panel in the WKS
        * User enters the value "2234312413.123423" into the cell identified by row 9 and column 1 of the right panel in the WKS
        * User enters the value "0" into the cell identified by row 9 and column 2 of the right panel in the WKS
        * User enters the value "0.000001" into the cell identified by row 9 and column 5 of the right panel in the WKS
        * User enters the value "2234312413.123423" into the cell identified by row 12 and column 1 of the right panel in the WKS
        * User enters the value "0.12312e12" into the cell identified by row 12 and column 2 of the right panel in the WKS
        * User enters the value "0.000001#$^%&" into the cell identified by row 12 and column 5 of the right panel in the WKS
        * User enters the value "2234312413.123423" into the cell identified by row 13 and column 1 of the right panel in the WKS
        * User enters the value "0.12312e12" into the cell identified by row 13 and column 2 of the right panel in the WKS
        * User enters the value "0.000001#$^%&" into the cell identified by row 13 and column 5 of the right panel in the WKS
        Then Validate that the cell values in the column identified by the ID "COL4" between the rows with row-indexes 3 and 5 are "1.1000000,2.2200000,3.3330000"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 3 and 5 are "-1.0001000,-2.2222000,-3.3330000"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 8 and 9 are "0.0000010,0.0000010"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 12 and 13 are "0.000001#$^%&,0.000001#$^%&"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 3 and 5 are "123123.1231200,1231.1230000,21.1232114"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 8 and 9 are "2234312413.1234231,2234312413.1234231"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 12 and 13 are "2234312413.1234231,2234312413.1234231"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 3 and 5 are "10.1000000,20.2000000,30.3000200"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 8 and 9 are "0.0000000,0.0000000"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 12 and 13 are "0.12312e12,0.12312e12"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 3 and 5 are "4.2343120,5.1231240,6.1241241"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 6 and 13 are ",,,,,,,"
        * Validate that the cell values in the column identified by the ID "COL9" between the rows with row-indexes 3 and 5 are "1.1231241,20.2131410,31.1241241"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 6 and 13 are ",,,,,,,"
        When User "groups" the rows identified by indexes "3,4,5,6,7"
        * I click on the text "Group rows"
        * User names the row as "Test Row Group for Cell Formatting"
        Then User validates that the group "Test Row Group for Cell Formatting" is added to the worksheet
        When I "decrease" the decimal value by 4 between columns with aria-indexes 4 and 9 and in rows with row-indexes between 3 and 14
        * User enters the value "1.12" into the cell identified by row 5 and column 1 of the right panel in the WKS
        * User enters the value "1.123" into the cell identified by row 5 and column 2 of the right panel in the WKS
        * User enters the value "1.1234" into the cell identified by row 5 and column 3 of the right panel in the WKS
        * User enters the value "1.12345" into the cell identified by row 5 and column 4 of the right panel in the WKS
        * User enters the value "0.123" into the cell identified by row 5 and column 5 of the right panel in the WKS
        Then Validate that the cell values in the column identified by the ID "COL4" between the rows with row-indexes 3 and 6 are "1.100,2.220,,3.333"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 3 and 6 are "-1.000,-2.222,0.123,-3.333"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 9 and 10 are "0.000,0.000"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 13 and 14 are "0.000001#$^%&,0.000001#$^%&"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 3 and 6 are "123123.123,1231.123,1.120,21.123"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 9 and 10 are "2234312413.123,2234312413.123"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 13 and 14 are "2234312413.123,2234312413.123"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 3 and 6 are "10.100,20.200,1.123,30.300"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 9 and 10 are "0.000,0.000"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 13 and 14 are "0.12312e12,0.12312e12"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 3 and 6 are "4.234,5.123,1.123,6.124"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 7 and 14 are ",,,,,,,"
        * Validate that the cell values in the column identified by the ID "COL9" between the rows with row-indexes 3 and 6 are "1.123,20.213,1.123,31.124"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 7 and 14 are ",,,,,,,"
        When I duplicate sheet number 1
        * I set a random 50 character string as the name of the sheet being duplicated
        * I "check" the checkbox number 3 in the "Product Design Grid" section
        * I set a random 50 character string as the name of the sheet being duplicated
        * I click on the "Create" button to add new sheet
        * User waits for 2 seconds
        * User reloads the page
        * User is in the WKS page
        * I expand or collapse the row with aria-indexes "2,3"
        * User expands the row group number "3" in the work sheet
        Then Validate that the cell values in the column identified by the ID "COL4" between the rows with row-indexes 3 and 6 are "1.100,2.220,,3.333"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 3 and 6 are "-1.000,-2.222,0.123,-3.333"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 9 and 10 are "0.000,0.000"
        * Validate that the cell values in the column identified by the ID "COL5" between the rows with row-indexes 13 and 14 are "0.000001#$^%&,0.000001#$^%&"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 3 and 6 are "123123.123,1231.123,1.120,21.123"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 9 and 10 are "2234312413.123,2234312413.123"
        * Validate that the cell values in the column identified by the ID "COL6" between the rows with row-indexes 13 and 14 are "2234312413.123,2234312413.123"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 3 and 6 are "10.100,20.200,1.123,30.300"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 9 and 10 are "0.000,0.000"
        * Validate that the cell values in the column identified by the ID "COL7" between the rows with row-indexes 13 and 14 are "0.12312e12,0.12312e12"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 3 and 6 are "4.234,5.123,1.123,6.124"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 7 and 14 are ",,,,,,,"
        * Validate that the cell values in the column identified by the ID "COL9" between the rows with row-indexes 3 and 6 are "1.123,20.213,1.123,31.124"
        * Validate that the cell values in the column identified by the ID "COL8" between the rows with row-indexes 7 and 14 are ",,,,,,,"