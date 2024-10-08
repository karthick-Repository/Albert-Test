Feature: Basic Test for Adjustment creation

    Background: User logs in and navigates to WKS
        When User waits for 2 seconds
        When I click on the "Create" button

    Scenario: user is able to create adjustment/transfer creation
        * I click on "Adjustment / Transfer" menu option
        # When User waits for 4 seconds
        * User pauses the execution
        * I click on "Adjustment" to create adjustment inventory
        * I click on Lot Dropdown
        * I select Lot ID from the Dropdown
        # * User select "g" as unit and "10" as quantity
        # * I click on Save button



    
        
        








