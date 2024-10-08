Feature: CRUD test for an task of Batch type
 
  Background: User logs into the application & clicks on create task
    Given User logs into the application
    When User closes the modal dialog
 
  @smoke_tests
  Scenario: User must be able to create a new Batch  task
    * User click on Create button in landing page
    * User click on Task option from menulist
    * "Create a Task" dialog is displayed
    * Select task type as "Batch"
    * User waits for 2 seconds
    * User clicks on the select inventory from the dropdown
    * User enters the quantity "150" in the batch size field
    * User set the name for "New Batch Task" task
    * I click on the "Create" button
    # * User clciks on the task id from the toaster
