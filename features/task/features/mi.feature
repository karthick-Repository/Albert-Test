Feature: Tests to validate the inventory limits which could be set in a property task
  
  Background: User logs into the application & clicks on create task
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I add 10 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * I add 1 blank rows, 2 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * I add 0 blank rows, 5 inventory rows of type "Consumables" into the PD grid of all the sheets of the worksheet
    * I add 1 blank rows, 3 inventory rows of type "Formulas" into the PD grid of all the sheets of the worksheet
    * User reloads the page
    * User is in the WKS page
    * I fetch the column names of all the formula columns in the WKS
    * I create lot data for the formula columns in the WKS
    * I click on the "Create" button
    * I click on "Task" menu option
    * "Create a Task" dialog is displayed
    Then Verify that "Property" tab is selected
 
  @Delete_Task @WKS_Mandatory
  Scenario: Verify in create task pop-up and details page invnetory filed should allow the user to select only 15 inventories.
    When I create a propety task with the formulas present in the worksheet with 2 datatemplates, 0 tags and a random note of length 200 characters
    Then I validate that the message "has been created and sent to the Task Module" is displayed
    When I navigate to the details page of the task created
    Then I validate that the user is in the details page of the the created task
    When I change the status of the task to "Completed (Complete Task)"
    Then I validate the contents of the allocate inventory dialog
    * I validate the inventories in the task against the inventories in the allocate inventory dialog
    # * I validate that the lot information in table 1 the allocate inventory dialog are "disabled"
 
  # @Delete_Lots @WKS_Mandatory
  # Scenario: Validate whether lot fields are editable when lots are not assigned to inventories when task is created
  #   When I create a propety task with the formulas present in the worksheet with 2 datatemplates, 2 tags and a random note of length 200 characters
  #   Then I validate that the message "has been created and sent to the Task Module" is displayed
  #   When I navigate to the details page of the task created
  #   Then I validate that the user is in the details page of the the created task
  #   When I create lot data for the formula columns in the WKS
  #   * I change the status of the task to "Completed (Complete Task)"
  #   Then I validate that the lot information in table 1 the allocate inventory dialog are "enabled"
has context menu



  Scenario: Verify in create task pop-up and details page invnetory filed should allow the user to select only 15 inventories.
    When I Select the 15 formulas present in the worksheet with all the formula lots in the assign lot fields
    * I select 15 Data templates and 2 pg for each data templates 
    * I set a random note with 200 characters and select the assign as Current User 
    Then I change the project id to some random project and Change some random location
    * I select the priority as low and set the random date in the date field and add
    Then I validate that the message "has been created and sent to the Task Module" is displayed
    When I navigate to the details page of the task created
    Then I validate that the user is in the details page of the the created task
    When I change the status of the task to "Completed (Complete Task)"
    Then I validate the contents of the allocate inventory dialog