Feature: CRUD test cases for propertytask

  Background: User logs into the application & clicks on create task
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS
    * I add 2 formula columns and 2 blank columns into the PD grid of all the sheets of the worksheet
    * I add 1 blank rows, 2 inventory rows of type "RawMaterials" into the PD grid of all the sheets of the worksheet
    * I add 0 blank rows, 5 inventory rows of type "Consumables" into the PD grid of all the sheets of the worksheet
    # * I add 1 blank rows, 3 inventory rows of type "Formulas" into the PD grid of all the sheets of the worksheet
    * User reloads the page
    * User is in the WKS page
    * I fetch the column names of all the formula columns in the WKS
    * I create lot data for the formula columns in the WKS
    * I click on the "Create" button
    * I click on "Task" menu option
    * "Create a Task" dialog is displayed
    Then Verify that "Property" tab is selected

  
# @WKS_Mandatory
    Scenario: Verify in create task pop-up and details page invnetory filed should allow the user to select only 15 inventories.
    When I save a custom template task with the formulas present in the worksheet with 2 datatemplates, 0 tags and a random note of length 200 characters
    * User waits for 2 seconds
    * I set a random 25 character string as the Template Name
    # * I set a Acl from anyone can view to only selected user can view in the task template save pop-up
    * I click on the "Save" button
    Then I validate that the message " Saved Successfully " is displayed
    # * I click on the "Cancel" button
    # * User waits for 2 seconds
    #  * I click on the "Create" button
    # * I click on "Task" menu option
     * I click on choose template button 
    * I select the created template

    #   Scenario: Verify in create task pop-up and details page invnetory filed should allow the user to select only 15 inventories.
    # When I fetched the saved custom template
    # * User pauses the execution
    # * I click on choose template button 
    # * I select the created template


   

    # @Delete_Task @WKS_Mandatory
  #   Scenario: Verify in create task pop-up user should be able to use the saved template for the proeprty task
  #   When User waits for 2 seconds
  #   * I click on choose template button  
  #   * User waits for 2 seconds
    * I fetch "3" custom template of type "Property Task"
  #   * I set the fetched custom template
  #   Then I validate that the message "has been created and sent to the Task Module" is displayed
  #   # When I navigate to the details page of the task created
  #   # Then I validate that the user is in the details page of the the created task

  #   # When I change the status of the task to "Completed (Complete Task)"
  #   # Then I validate the contents of the allocate inventory dialog
    # When I navigate to the details page of the task created
    # Then I validate that the user is in the details page of the the created task
    # When I change the status of the task to "Completed (Complete Task)"
    # Then I validate the contents of the allocate inventory dialog 