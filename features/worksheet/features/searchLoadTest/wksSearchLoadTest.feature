Feature: Test to check for the search endpoint performance in a project with 100 formula columns

  Background: User logs into the application & clicks on create Task
    # Given User logs into the application
    # When User closes the modal dialog
    When User creates a project
    Then User enables worksheet for the created project
    When User navigates to the WKS

  # @WKS_Mandatory
  Scenario: Load test check for search endpoint
    When I add 100 formula columns and 0 blank columns into the PD grid of all the sheets of the worksheet
    * User reloads the page
    * User is in the WKS page
    * User fetches all columns using WKS service endpoint
    * User waits for 5 seconds
    Then I validate that the added formula columns are fetched sucessfully in search
