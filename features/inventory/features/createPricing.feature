Background: User logs in and navigates to inventory details page
    Given User logs into the application
    When User closes the modal dialog
    When User creates an inventory
    Then User navigates to the inventory details page

 Scenario : User must able to add new pricing for the created rawmaterial   
    When the user clciks on add price button.
    * Then user is on the "Add new price" pop-up page
    * The user sets the unit as "lb"
    * The user enters the quantity
    * Choose a vendor from the dropdown menu.
    And Click on “Create.”
    Then I validate that the pricng is "created" successfully 
    And check the converted pricing value in the pricing section