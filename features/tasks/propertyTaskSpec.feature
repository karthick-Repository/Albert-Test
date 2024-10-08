Feature: Task Creation UI Validation

  Background: User logs into the application & clicks on create Task
    * I goto to the landing page of the application
    * I click on the "Create" button
    * I click on "Task" menu option

  Scenario: User must be able to create a new task of type Property
    Given "Create New Task" dialog is displayed
    Then Verify that "Property" tab is selected
    When I click on "Batch"
    When I fetch "3" inventory IDs of type "RawMaterials" with lots from the system
    * I set the fetched inventories in the set inventories field
    # * Validate the UI elements in the task pop-up dialog for "Property"
    # When User enters the details of the Property task to be created
    # * User clicks on the "Create" button
    # Then Task must be created successfully
