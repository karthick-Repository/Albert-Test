Feature: New Project Creation UI Validation

  @smoke_tests
  Scenario: User must be able to create a new Project
    When I click on the "Create" button
    * I click on "Project" menu option
    * I "set" the name of the project
    * I "set" the Customer or Market Segment
    * I set "1" "existing" "Applications" in the project
    * I set "1" "existing" "Technologies" in the project
    * I "set" the ADP Number to "asdsdf!@#@!1233"
    * I click on the "Create" button
    Then I validate that the "projects" details page is displayed
    When I fetch the code of the component from the page URL
    # * I set the status to "Closed - Archived"
    # Then I validate that the project is "created" with the right details passed
    # When I goto the "projects" list page
    # * I search for the project I "created"
    # Then I validate that the "created" project details in the grid for are correct

  @smoke_tests
  Scenario: User must be able ot edit a project
    Given I goto the details page of the "projects" I created
    When I "edit" the name of the project
    * I "edit" the Customer or Market Segment
    * I "edit" the ADP Number to "!@#@!1233"
    When I set the status to "Closed - Success"
    Then I validate that the project is "edited" with the right details passed
    When I goto the "projects" list page
    * I search for the project I "edited"
    Then I validate that the "edited" project details in the grid for are correct

  @smoke_tests
  Scenario: User must be able to delete a project using backend service only
    Then I delete the project
