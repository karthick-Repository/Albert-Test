Feature: Tests to validate that a basic sheet template can be created correctly.

    Background: User logs in and navigates to WKS
        When User creates a project
        Then User enables worksheet for the created project
        When User navigates to the WKS

    Scenario: user click on save without giving sheet name then Template name cannot be empty message should be displayed
        When I duplicate sheet number 1
        * I click on "Save As Template"
        * User pauses the execution
        * I click on the "Save" button
        Then User validates that the message "Template name cannot be empty." is displayed
