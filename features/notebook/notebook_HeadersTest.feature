Feature: Notebook validations for h1, h2 & h3 headers

    Background: User logs in and navigates to notebook
        When User creates a project
        And User navigates to the notebook

    @WKS_Mandatory @INVENT-4785
    Scenario: Tests to header addition, editing, re-ordering, copying & deleting to/from a notebook
        When The user sets a random string of length 50 as the name of the notebook
        * The user adds 5 random strings of lengths "10,15,20,25,30" as headers "h1,h2,h3,h1,h2" to the notebook
        Then The user validates that the headers are saved in the notebook
        * The user validates that the headers in the notebook are in the order "h1,h2,h3,h1,h2"
        When The user moves "header" 0 "down" by 2 positions
        * The user moves "header" 1 "down" by 2 positions
        * The user moves "header" 3 "up" by 2 positions
        * The user moves "header" 2 "down" by 1 positions
        * The user moves "header" 4 "up" by 2 positions
        Then The user validates that the headers are saved in the notebook
        * The user validates that the headers in the notebook are in the order "h2,h3,h2,h1,h1"
        # When The user deletes block 1
        # Then The user validates that the data is saved in the notebook
        # When The user edits the headers "0,1,2" with new headers having strings with lengths "40,45,50" in the notebook
        # Then The user validates that the data is saved in the notebook
        # When The user merges the headers at positions "0,1" in the notebook
        # Then The user validates that the data is saved in the notebook
        # Defect INVENT-4785
        # When User reloads the page
        # * User waits for 3 seconds
        # * User is in the notebook page
        # Then The user validates that the headers are saved in the notebook


