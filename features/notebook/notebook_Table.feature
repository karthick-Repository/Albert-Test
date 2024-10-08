Feature: Notebook validations for content of type Text

  Background: User logs in and navigates to notebook
    When User creates a project
    And User navigates to the notebook
    And User is in the notebook page

  Scenario: Tests to add and validate table data into the notebook
    When The user adds 1 table and enters 4 values of length 25 into cells of the table 1 in the notebook