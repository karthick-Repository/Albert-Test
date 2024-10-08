Feature: Tests to validate scenarios which involve duplicating current sheet

  Background: User logs in and navigates to WKS
    When User creates a project
    * User stores the details of the created project
    Then User enables worksheet for the created project
    When User navigates to the WKS

  @WKS_Mandatory
  Scenario: Validate duplicate sheets scenario for a sheet with no rows or columns
    When I create 5 sheets from scratch and name them as random 10 character alphanumeric strings
    * I duplicate sheet number 2
    Then I validate that the header details in the duplicate sheets dialog
   * I validate the initial state of all the grid panels in the duplicate sheets dialog
    When I set a random 51 character string as the name of the sheet being duplicated
    * I click on the "Create" button
    Then Validate that the message "Sheet name exceeds 50 Characters." is displayed
    When I set a random 50 character string as the name of the sheet being duplicated
    * I click on the "Create" button
    Then I validate that the new sheet is added in the first position
    # When I fetch the "products" design ID of the active sheet in the worksheet
    # Then I validate that columns displayed are "Name,Inventory ID,Manufacturer,Details"

  @WKS_Mandatory
  Scenario: Validate the column selection limit while duplicating a sheet
    When I add 20 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * User reloads the page
    * User is in the WKS page
    * I duplicate sheet number 1
    * I click on icon 2 of type > in the "Product Design Grid"
    * I check 11 checkboxes in the Other Columns section
    * I check checkbox number 12 in the Other Columns section
    Then I validate that the tippy message number 1 displays the message "You have reached the maximum limit of copying a total of 15 columns into your sheet. This limit applies to both sections combined."
    When I check checkbox number 14 in the Other Columns section
    Then I validate that the tippy message number 1 displays the message "You have reached the maximum limit of copying a total of 15 columns into your sheet. This limit applies to both sections combined."
    When I check checkbox number 18 in the Other Columns section
    Then I validate that the tippy message number 1 displays the message "You have reached the maximum limit of copying a total of 15 columns into your sheet. This limit applies to both sections combined."
    When I click on "Back To Creation Flow"
    * I click on the "Cancel" button
    When User clicks action icon of column "COL1"
    * User clicks on "Unpin Column" in the action menu
    * User clicks action icon of column "COL3"
    * User clicks on "Unpin Column" in the action menu
    * User clicks action icon of column "COL4"
    * User clicks on "Unpin Column" in the action menu
    * User reloads the page
    * User is in the WKS page
    * I duplicate sheet number 1
    * I click on icon 2 of type > in the "Product Design Grid"
    Then I validate that the pinned columns section title is "Pinned Columns (1 of 1 selected)" and the text displayed in the section is "A. NameAll copied rows show name"
    * I validate that the other columns section title is "Other Columns (1 of 24 selected)" and the number of checkboxes displayed are 23
    