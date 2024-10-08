Feature: Users feature CRUD validations

  Background: User logs in and navigates to the users page
    * I navigate to the users page

  @smoke_tests
  Scenario: Validate the UI elements in the landing page of Users Page
    Then I am in the users page
    * User validates that the table in the page has the headers "Users,Teams,Access Role,Status,Default Location,Last Login"
    * User validates that the sort by drop down displays the following options "Relevancy,Name: A → Z,Name: Z → A,Team Name: A → Z,Team Name: Z → A,Default Location: A → Z,Default Location: Z → A,Date created : Newest → Oldest (Default),Date created : Oldest → Newest"

  @smoke_tests
  Scenario: Validate the CRUD tests for Users feature
    Then I am in the users page
    When I generate random user data in "SBU2" with the role "Full Access" and class "Trusted"
    * I create the user with the random data generated
    When I search for the created user in the users grid
    Then I validate that the user is displayed in row 1 users grid with the status "Has Site Access"
    When I fetch the Albert ID of the user created in the previous step using email ID
    * I delete the created user
    * I remove the default filter applied in the grid
    * I search for the created user in the users grid
    Then I validate that the user is displayed in row 1 users grid with the status "No Site Access"
    * I validate that the user ID I deleted now does not exist in the system
