Feature: Tests to check reports page in maya

  Scenario: User navigates to the report page and checks for the headers
    Then I validate that the user is in the landing page of maya application
    When I navigate to the "reports" page in maya
    Then I validate that the headers "Name,Description, Type, Type, Created By, Created On" are displayed