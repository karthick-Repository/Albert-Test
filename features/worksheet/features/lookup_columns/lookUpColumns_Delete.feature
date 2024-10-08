Feature: Tests to validate look up column deletion and re-addition to WKS

  Background: User logs in & navigates to WKS & adds look-up columns from the default formula column
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I add 2 blank rows, 2 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * User clicks action icon of column "COL5"
    * User clicks on "Edit Name" in the action menu
    * User changes the formula name to "TFC-1"
    * User clicks action icon of column "COL5"
    * I click on the text "Add a Lookup Column"
    * I click on " Alias " identified as a hyperlink
    * User clicks action icon of column "COL6"
    * I click on the text "Add a Lookup Column"
    * I click on " Description " identified as a hyperlink
    * User clicks action icon of column "COL7"
    * I click on the text "Add a Lookup Column"
    * I click on " Tags " identified as a hyperlink
    * User clicks action icon of column "COL8"
    * I click on the text "Add a Lookup Column"
    * I click on " RSN " identified as a hyperlink
    * User clicks action icon of column "COL9"
    * I click on the text "Add a Lookup Column"
    * I click on " RSNe " identified as a hyperlink
    * User clicks action icon of column "COL10"
    * I click on the text "Add a Lookup Column"
    * I click on " IDH " identified as a hyperlink
    * User resizes all columns in the WKS to "50px"

    @WKS_Mandatory
    Scenario: Validate that the user is be able to re add deleted look up column many times
    Then I validate that all the look up columns have with column IDs between "COL6" to "COL11" have "Add a Blank Column,Add a Product / Formula Column,Add a Lookup Column,Pin Column,Remove Column" as the menu options
    When I delete all the look up columns with IDs from "COL3" to "COL4"
    * I delete all the look up columns with IDs from "COL6" to "COL11"
    * User fetches all columns using WKS service endpoint
    Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,TFC-1"
    When I add the look up column " Alias " to the WKS by using column with "COL5"
    * User fetches all columns using WKS service endpoint
    Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,Alias,TFC-1"
    When I delete the look up column with ID "COL12"
    * User fetches all columns using WKS service endpoint
    Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,TFC-1"
    When I add the look up column " Alias " to the WKS by using column with "COL5"
    * User fetches all columns using WKS service endpoint
    Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,Alias,TFC-1"
    When I delete the look up column with ID "COL13"
    * User fetches all columns using WKS service endpoint
    Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,TFC-1"





