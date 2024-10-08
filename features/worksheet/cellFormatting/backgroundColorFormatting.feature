Feature: Validate tests for back ground color formatting across PD grid, Apps Grid & Results grid

    Background: User logs in and navigates to WKS
        When User creates a project
        * User enables worksheet for the created project
        When I add 5 blank rows, 5 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
        * I add 3 formula columns and 2 blank columns into the PD grid of all the sheets of the worksheet
        * User navigates to the WKS
        * User resizes all columns in the WKS to "40px"
        * Enter the values "1,2,3,4,5,6,7,8,9,10" into the column with ID "COL4" in WKS
        * Enter the values "11,12,13,14,15,16,17,18,19,20" into the column with ID "COL6" in WKS
        * User enters the formulae "=SUM(D1:E1)/0.0001" into the cells of the column with ID "COL7" in WKS
        * User copies the cell contents from the cell identified by row 1 and column 2 to all cells between rows 2 to 10 in column 2
        * User enters the formulae "=SUMPRODUCT(D1:F1)/123456789.123456789" into the cells of the column with ID "COL8" in WKS
        * User copies the cell contents from the cell identified by row 1 and column 3 to all cells between rows 2 to 10 in column 3
        * User enters the formulae "=SUM(D1:E1)/SUM(F1:G1)" into the cells of the column with ID "COL9" in WKS
        * User copies the cell contents from the cell identified by row 1 and column 4 to all cells between rows 2 to 10 in column 4
        * User enters the formulae "=SUM(D1:H1)+J1" into the cells of the column with ID "COL10" in WKS
        * User copies the cell contents from the cell identified by row 1 and column 5 to all cells between rows 2 to 10 in column 5

    @WKS_Mandatory
    Scenario: Validate that the user can apply background color formats for all cells in the product design grid
        When I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 1          | 10       | 1       | 10    | Green           |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 1          | 10       | 1       | 10    | style            | rgb(130, 222, 198)    |
        When I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 3          | 6        | 1       | 11    | Blue            |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 3          | 6        | 1       | 11    | style            | rgb(214, 233, 255)    |
        When I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 7          | 7        | 1       | 11    | Yellow          |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 7          | 7        | 1       | 11    | style            | rgb(254, 240, 159)    |
        When I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 8          | 8        | 1       | 11    | Orange          |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 8          | 8        | 1       | 11    | style            | rgb(255, 227, 210)    |
        When I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 9          | 9        | 1       | 11    | Purple          |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 9          | 9        | 1       | 11    | style            | rgb(238, 215, 255)    |
        When User copies the cell contents from the column with ID "COL6" to column with ID "COL5"
        * User clicks action icon of column "COL5"
        * User clicks on "Normalize" in the action menu
        * Enter "99999999" into the normalize input
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 10          | 10       | 1       | 10    | style            | rgb(214, 233, 255)    |
        When User clicks on "Done"
        * User clicks on "Confirm"
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 10          | 10       | 1       | 10    | style            | rgb(214, 233, 255)    |
        When I add all available look up columns to the worksheet to the left of the column with column ID "COL6" as reference
        * User resizes all columns in the WKS to "40px"
        * I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 5          | 5        | 1       | 11    | White           |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck          |
            | 5          | 5        | 1       | 11    | style            | background-color: transparent; |
        When I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 6          | 6        | 1       | 11    | Red             |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 6          | 6        | 1       | 11    | style            | rgb(255, 161, 161)    |
        When I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 8          | 8        | 1       | 11    | Green           |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 8          | 8        | 1       | 11    | style            | rgb(130, 222, 198)    |
        When I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 9          | 9        | 1       | 11    | Blue            |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 9          | 9        | 1       | 11    | style            | rgb(214, 233, 255)    |
        When I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 11         | 11       | 1       | 11    | Yellow          |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 11         | 11       | 1       | 11    | style            | rgb(254, 240, 159)    |
        When I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 13         | 13       | 1       | 11    | Orange          |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 13         | 13       | 1       | 11    | style            | rgb(255, 227, 210)    |
        When I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 14         | 17       | 1       | 11    | Purple          |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 14         | 17       | 1       | 11    | style            | rgb(238, 215, 255)    |
        When User "groups" the rows identified by indexes "1,2,3,4,5"
        * I click on the text "Group rows"
        * User names the row as "Test Row Group 1"
        * User "groups" the rows identified by indexes "7,8,9"
        * I click on the text "Group rows"
        * User names the row as "Test Row Group 2"
        * I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 1          | 17       | 1       | 1     | Purple          |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 1          | 17       | 1       | 1     | style            | rgb(238, 215, 255)    |
        When I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 1          | 17       | 7       | 7     | Orange          |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 1          | 17       | 7       | 7     | style            | rgb(255, 227, 210)    |
        When Add "Product Design" "Inventory" rows in WKS
        * User clicks on the advanced search button in the inventory seach dialog
        * User adds 2 inventories of type "Formulas" to the WKS from advanced search dialog
        * I "expand" the intermate row at index 1 in the product design grid
        * User waits for 2 seconds
        * I format the cells with the following details:
            | fromColumn | toColumn | fromRow | toRow | backgroundColor |
            | 1          | 17       | 1       | 5     | Purple          |
        Then I validate that the cells have the following attributes:
            | fromColumn | toColumn | fromRow | toRow | attributeToCheck | attributeValueToCheck |
            | 1          | 17       | 1       | 1    | style            | rgb(238, 215, 255)    |
