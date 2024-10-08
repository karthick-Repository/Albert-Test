Feature: Tests to validate the Property task creation with multiple inventories

  Background: User logs into the application & clicks on create Task
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I add 2 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    # * I add 2 blank rows, 2 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * User reloads the page
    * User is in the WKS page
    * I fetch the column names of all the formula columns in the WKS
    * I create lot data for the formula columns in the WKS
    * I click on the "Create" button
    * I click on "Task" menu option
    * "Create a Task" dialog is displayed
    Then Verify that "Property" tab is selected

  @WKS_Mandatory
  Scenario: Validate that the user can create a new property task with multiple inventories
    When I fetch "5" inventory IDs of type "Formulas" with lots from the system
    * I set the fetched inventories in the set inventories field
    * I fetch "3" data templates from the system
    * I set the fetched data templates in the Setup Blocks to Collect Results section
    * I set the the "Property_Task" name
    * I create the task
    Then I validate that the message "has been created and sent to the Task Module" is displayed

  # @Delete_Task @WKS_Mandatory
  # Scenario: Validate that left panel details of the created property task with multiple inventories
  #   When I create a propety task with the formulas present in the worksheet with 2 datatemplates, 2 tags and a random note of length 200 characters
  #   Then I validate that the message "has been created and sent to the Task Module" is displayed
  #   When I navigate to the details page of the task created
  #   Then I validate that the user is in the details page of the the created task
  #   * I validate that the status of the task is "Unclaimed"
  #   * I validate that the label "Inventory (3)" is displayed in the left pane
  #   * I validate the inventories displayed in the left pane of the task details page
