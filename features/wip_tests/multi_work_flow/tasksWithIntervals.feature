Feature: New Project Creation UI Validation

  Background: User logs into the application & clicks on create Project
    Given User logs into the application
    When User closes the modal dialog
    * I click on the "Create" button
    * I click on "Task" menu option

  Scenario: User should able add intervals on multiple pgs
    When I fetch "2" inventory IDs of type "RawMaterials" with lots from the system
    * I set the fetched inventories in the set inventories field
    When I fetch "2" data templates from the system
    * I set the fetched data templates in the Setup Blocks to Collect Results section
