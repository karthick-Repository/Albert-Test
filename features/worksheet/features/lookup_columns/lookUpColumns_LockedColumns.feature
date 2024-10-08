Feature: Test to validate that user can add look up columns from a locked column & also check that non product filters are displayed for the added look-up columns

  Background: User logs in , navigates to WKS & adds look-up columns from a locked product column
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I add 2 blank rows, 2 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * User clicks action icon of column "COL5"
    * User clicks on "Edit Name" in the action menu
    * User changes the formula name to "TFC-1"
    * User clicks action icon of column "COL5"
    * User clicks on "Add a Product / Formula Column" in the action menu
    * User enters "TFC-2" into the column header of the added column
    * User locks the column identified by column ID "COL5"
    * User clicks action icon of column "COL6"
    * I click on the text "Add a Lookup Column"
    * I click on " Alias " identified as a hyperlink
    * User clicks action icon of column "COL7"
    * I click on the text "Add a Lookup Column"
    * I click on " Description " identified as a hyperlink
    * User clicks action icon of column "COL8"
    * I click on the text "Add a Lookup Column"
    * I click on " Tags " identified as a hyperlink
    * User clicks action icon of column "COL9"
    * I click on the text "Add a Lookup Column"
    * I click on " RSN " identified as a hyperlink
    * User clicks action icon of column "COL10"
    * I click on the text "Add a Lookup Column"
    * I click on " RSNe " identified as a hyperlink
    * User clicks action icon of column "COL11"
    * I click on the text "Add a Lookup Column"
    * I click on " IDH " identified as a hyperlink
    * User resizes all columns in the WKS to "50px"

  @WKS_Mandatory
  Scenario: Validate that user can add look-up columns from a product column which is locked
    Then User validates that the columns names as fetched from the UI are "Inventory ID,Name,Manufacturer,Details,IDH,RSNe,RSN,Tags,Description,Alias,TFC-2,TFC-1"

  # @WKS_Mandatory
  # Scenario: Validate that non-product filters are displayed for look up columns
  #   When I click on the filter icon of column "COL11"
  #   Then I validate that the non product filter is displayed
  #   When I click on the filter icon of column "COL10"
  #   Then I validate that the non product filter is displayed
  #   When I click on the filter icon of column "COL9"
  #   Then I validate that the non product filter is displayed
  #   When I click on the filter icon of column "COL8"
  #   Then I validate that the non product filter is displayed
  #   When I click on the filter icon of column "COL7"
  #   Then I validate that the non product filter is displayed

