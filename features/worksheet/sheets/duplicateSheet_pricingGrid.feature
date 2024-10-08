Feature: Tests to validate pricing change

  Background: User logs in, Create new Project and navigate to WKS
    When User creates a project
    * User stores the details of the created project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I add 2 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * I add 0 blank rows, 2 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * User resizes all columns in the WKS to "120px"
    * User waits for 5 seconds
    * Enter the values "10,20" into the column with ID "COL7" in WKS
    * Enter the values "60,70" into the column with ID "COL6" in WKS

  @WKS_Mandatory
  Scenario: Validate average pricing should be less than maximum and more than minimum 
    When User clicks on the action icon of row at index 2
    * User clicks on "Expand Summary" in the action menu
    * User click on open details and added two new price with value "20" and "25" also add distinct location one Vendor name from dropdown at index "2"
    * User close the popup of inventory details
    * User clicks on the action icon of row at index 1
    * User clicks on "Expand Summary" in the action menu
    * User click on open details and added two new price with value "27" and "45" also add distinct location one Vendor name from dropdown at index "5"
    * User close the popup of inventory details
    * I expand the apps grid section in the worksheet
    Then Verify average price should be less then maximum and greater then minimum in corresponding row "7" and column "COL7"

  @WKS_Mandatory
  Scenario: Validate pricing update in duplicate sheet
    When User clicks on the action icon of row at index 1
    * User clicks on "Expand Summary" in the action menu
    * User click on open details and added two new price with value "20" and "25" also add distinct location one Vendor name from dropdown at index "2"
    * User close the popup of inventory details
    * User clicks on the action icon of row at index 2
    * User clicks on "Expand Summary" in the action menu
    * User click on open details and added two new price with value "27" and "45" also add distinct location one Vendor name from dropdown at index "5"
    * User close the popup of inventory details
    * I expand the apps grid section in the worksheet
    Then Verify average price should be less then maximum and greater then minimum in corresponding row "7" and column "COL7"
    When I duplicate sheet number 1
    * I set a random 10 character string as the name of the sheet being duplicated
    * I "check" the checkbox number 3 in the "Product Design Grid" section
    * I click on the "Create" button to add new sheet
    * I validate that the new sheet is added in the first position
    Then Verify duplicate sheet price is same as old sheet price in corresponding row "8" and column "COL7"

  @WKS_Mandatory
  Scenario: Validate average pricing should be less than maximum and more than minimum in new sheet
    When User clicks on the action icon of row at index 1
    * User clicks on "Expand Summary" in the action menu
    * User click on open details and added two new price with value "20" and "25" also add distinct location one Vendor name from dropdown at index "2"
    * User close the popup of inventory details
    * User clicks on the action icon of row at index 2
    * User clicks on "Expand Summary" in the action menu
    * User click on open details and added two new price with value "27" and "45" also add distinct location one Vendor name from dropdown at index "5"
    * User close the popup of inventory details
    * I expand the apps grid section in the worksheet
    Then Verify average price should be less then maximum and greater then minimum in corresponding row "7" and column "COL7"
    When Enter the values "14,25" into the column with ID "COL7" in WKS
    * Enter the values "66,77" into the column with ID "COL6" in WKS
    Then Verify before update sheet price and after update sheet price value change in corresponding row "7" and column "COL7"