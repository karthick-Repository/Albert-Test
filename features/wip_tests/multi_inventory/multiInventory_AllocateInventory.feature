Feature: Tests to validate allocate inventory scenarioes

  Background: User logs into the application & clicks on create task
    When User creates a project
    Then User enables worksheet for the created project
    When I add 4 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * User navigates to the WKS
    * User is in the WKS page
    * I fetch the column names of all the formula columns in the WKS
    * I click on the "Create" button
    * I click on "Task" menu option
    * "Create a Task" dialog is displayed
    Then Verify that "Property" tab is selected

  @Delete_Task @WKS_Mandatory
  Scenario: Validate the contents and the default inventory details in the allocate inventory dialog
    When I create lot data for the formula columns in the WKS
    * I create a propety task with the formulas present in the worksheet with 2 datatemplates, 0 tags and a random note of length 200 characters
    Then I validate that the message "has been created and sent to the Task Module" is displayed
    When I navigate to the details page of the task created
    Then I validate that the user is in the details page of the the created task
    When I change the status of the task to "Completed (Complete Task)"
    Then I validate the contents of the allocate inventory dialog
    * I validate the inventories in the task against the inventories in the allocate inventory dialog

  # @Delete_Lots @WKS_Mandatory
  # Scenario: Validate whether lot fields are editable when lots are not assigned to inventories when task is created
  #   When I create a propety task with the formulas present in the worksheet with 2 datatemplates, 2 tags and a random note of length 200 characters
  #   Then I validate that the message "has been created and sent to the Task Module" is displayed
  #   When I navigate to the details page of the task created
  #   Then I validate that the user is in the details page of the the created task
  #   When I create lot data for the formula columns in the WKS
  #   * I change the status of the task to "Completed (Complete Task)"
  #   Then I validate that the lot information in table 1 the allocate inventory dialog are "enabled"
    