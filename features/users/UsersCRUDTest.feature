Feature: Users feature CRUD validations

  Background: User logs in and navigates to the users page
    * I navigate to the users page

  @smoke_tests
  Scenario: Validate the CRUD tests for Users feature
    Then I am in the users page
    * User validates that the table in the page has the headers "Users,Teams,Access Role,Status,Default Location,Last Login"
    * User validates that the sort by drop down displays the following options "Relevancy,Name: A → Z,Name: Z → A,Team Name: A → Z,Team Name: Z → A,Default Location: A → Z,Default Location: Z → A,Date created : Newest → Oldest (Default),Date created : Oldest → Newest"
    Then I am in the users page
    When I generate random user data with the role "Full Access" and class "Trusted"
    * I create the user with the random data generated
    * User waits for 2 seconds
    When I fetch the Albert ID of the user created in the previous step using email ID
    Then I delete the created user
