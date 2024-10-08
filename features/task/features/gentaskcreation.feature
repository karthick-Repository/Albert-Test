Feature: CRUD test for an task of General type
 
  Background: User logs into the application & clicks on create task
    Given User logs into the application
    When User closes the modal dialog
 
  @smoke_tests
  Scenario: User must be able to create a new general task
    * User click on Create button in landing page
    * User click on Task option from menulist
    * "Create a Task" dialog is displayed
    * Select task type as "General"
    * User set the name for "GEN" task
    * I click on the "Create" button
    * User waits for 2 seconds
 
  #     @smoke_tests
  # Scenario: User must be able to nagivate to the created task
  #   * User goto the details page of the created task
  #   # * Edit task name