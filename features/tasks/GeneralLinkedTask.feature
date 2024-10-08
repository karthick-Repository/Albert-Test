Feature: Linked task section validation in "General Task"

  Background: User logs into the application & clicks on create task
    When User creates a project
    * User enables worksheet for the created project
    * I add 4 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * I fetch the column names of all the formula columns in the WKS
    * I goto to the landing page of the application
    * I click on the "Create" button
    * I click on "Task" menu option
    * User waits for 1 seconds
    Then "Create a Task" dialog is displayed

  Scenario: User able to create a new General task and link tasks to it
    When I click on "General" radio icon
    * User waits for 1 seconds
    * I create a general task with the formulas present in the worksheet
    Then I validate that the message "has been created and sent to the Task Module" is displayed
    When I navigate to the details page of the task created
    * User waits for 2 seconds
    * I click on "Linked Tasks"
    Then I validate that the "Manually Linked Tasks" section is showing in the landing page of the Linked Tasks page
    * I validate that the message "You have not linked any tasks manually yet. Click on the “Link Task” action in the top header to link tasks." is displayed
    # * I validate the message "You have not linked any tasks manually yet. Click on the “Link Task” action in the top header to link tasks." is displayed when no task linked under manually_linked_tasks section
    * I validate that the following table headers are displayed "Task Name / ID,Status,Inventory name / ID,Location,Assigned To,Additional details," in the linked task page
