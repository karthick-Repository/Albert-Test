Feature: New Project Creation UI Validation

  @smoke_tests
  Scenario: User must be able to create a new Project
    When I click on the "Create" button
    When I click on "Project" menu option
    When I "set" the name of the project
    When I "set" the Customer or Market Segment
    When I set "1" "existing" "Applications" in the project
    When I set "1" "existing" "Technologies" in the project
    When I "set" the ADP Number to "asdsdf!@#@!1233"
    When I click on the Create button in the "project" dialog
    # Then I validate that the "alproject" page is displayed
    When I fetch the code of the component from the page URL
    # * I set the status to "Closed - Archived"
    # Then I validate that the project is "created" with the right details passed
    # When I goto the "projects" list page
    # * I search for the project I "created"
    # Then I validate that the "created" project details in the grid for are correct
    When I goto the details page of the project I created
    When I "edit" the name of the project
    When I "edit" the Customer or Market Segment
    When I "edit" the ADP Number to "!@#@!1233"
    When I set the status to "Closed - Success"
    Then I validate that the project is "edited" with the right details passed
    When I goto the "projects" list page
    When I search for the project I "edited"
    Then I validate that the "edited" project details in the grid for are correct
    When I delete the project


  # @smoke_tests
  # Scenario: User must be able ot edit a project
  #   When I goto the details page of the project I created
  #   When I "edit" the name of the project
  #   * I "edit" the Customer or Market Segment
  #   * I "edit" the ADP Number to "!@#@!1233"
  #   When I set the status to "Closed - Success"
  #   Then I validate that the project is "edited" with the right details passed
  #   When I goto the "projects" list page
  #   * I search for the project I "edited"
  #   Then I validate that the "edited" project details in the grid for are correct

  # @smoke_tests
  # Scenario: User must be able to delete a project using backend service only
  #   When I delete the project
