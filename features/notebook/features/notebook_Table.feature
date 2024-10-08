Feature: Notebook validations for content of type Numbered List

  Background: User logs in and navigates to notebook
    * User creates a project
    * User navigates to the notebook
    * User clicks on the plus icon in the landing page of notebook
    Then User is in the notebook page

  @WKS_Mandatory
  Scenario: Validate that the user can add a table block to a notebook and perfom operations on it
    When I add 1 table block or blocks, with each block having 3 rows and 3 columns into the notebook
    * I enter random values into every cell of table 1 in the notebook
    * User reloads the page
    * I wait till the "notebook" page is reloaded
    Then I validate that the details entered into table 1 are intact
    When I click on the ellipses icon of row 1 in table 1
    * I "With Headings" block number 1
    Then I validate that the every cell in row 1 of table 1 is editable and displays the text Heading
    * I validate that the last "column" of table 1 is of type "tc-add-column"
    * I validate that the last "row" of table 1 is of type "tc-add-row"
    When I click on the last row in table 1
    Then I validate that an extra row is added to table 1
