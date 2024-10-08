Feature: Notebook validations for various headings

  Background: User logs in and navigates to notebook
    * User creates a project
    * User navigates to the notebook
    * User clicks on the plus icon in the landing page of notebook
    Then User is in the notebook page

  @WKS_Mandatory
  Scenario: Validate that user can convert text/paragraphs to headings
    When I add 3 text blocks with random strings of length 70 to the notebook
    * I convert text block number 1 into "Heading 1"
    Then I validate that heading block number 1 is of type "h1"
    When I convert text block number 1 into "Heading 2"
    Then I validate that heading block number 2 is of type "h2"
    When I convert text block number 1 into "Heading 3"
    Then I validate that heading block number 3 is of type "h3"
    When I convert heading number 1 into "Heading 2"
    Then I validate that heading block number 1 is of type "h2"
    When I convert heading number 2 into "Heading 3"
    Then I validate that heading block number 2 is of type "h3"
    When I convert heading number 3 into "Heading 1"
    Then I validate that heading block number 3 is of type "h1"
    When User reloads the page
    * I wait till the "notebook" page is reloaded
    Then I validate that heading block number 1 is of type "h2"
    * I validate that heading block number 2 is of type "h3"
    * I validate that heading block number 3 is of type "h1"
