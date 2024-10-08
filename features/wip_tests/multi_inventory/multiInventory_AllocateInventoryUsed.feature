Feature: Tests to validate allocate inventory used scenarioes

  Background: User logs into the application & clicks on create task
    When User creates 2 Inventories as "RawMaterials" type
    When I goto to the landing page of the application
    # * User closes the modal dialog
    * User waits for 2 seconds
    * I click on the "Create" button
    * I click on "Task" menu option
    Then Verify that "Property" tab is selected

  @Delete_Task
  Scenario: Validate the contents in the allocate inventory dialog for no lots
    When I create a inventory property task with 1 datatemplates, 0 tags and a random note of length 10 characters
    Then I validate that the message "has been created and sent to the Task Module" is displayed
    When I navigate to the details page of the task created
    Then I validate that the user is in the details page of the the created task
    When I change the status of the task to "Completed (Complete Task)"
    * I validate "There are no lots in your location with Inventory." message if no lots for formula in allocate inventory dialog
    * I click on the "Cancel" button
    When I create lot data with onHandvalue as "0" for "inventories"
    When I set the fetched lots in the task left panel
    * I click on the "Done" button
    When I change the status of the task to "Completed (Complete Task)"
    * Enter the values "15.1234,11.7853" for inventories used in allocation pop-up
    * I click on the "Confirm & Complete" button
    * I validate "Result should not exceed 1000 characters" message for more than 1000 character in qc result
    * I set the qc result value
    * I click on the "Save" button
    * I validate the QC Result value in task page
    When I change the status of the task to "In Progress"
    When I change the status of the task to "Completed (Complete Task)"
    * User waits for 2 seconds
    * I validate the inventory used values in the allocate inventory dialog

  @Delete_Task
  Scenario: Validate the contents and the default inventory details in the allocate inventory dialog
    When I create lot data with onHandvalue as "15" for "inventories"
    When I create a inventory property task with 1 datatemplates, 0 tags and a random note of length 10 characters
    Then I validate that the message "has been created and sent to the Task Module" is displayed
    When I navigate to the details page of the task created
    When I change the status of the task to "Completed (Complete Task)"
    * Enter the values "12.1234,11.7853" for inventories used in allocation pop-up
    * I click on the "Confirm & Complete" button
    * I set the qc result value
    * I click on the "Save" button
    When I change the status of the task to "In Progress"
    When I change the status of the task to "Completed (Complete Task)"
    * User waits for 2 seconds
    * I validate the inventory used values in the allocate inventory dialog

