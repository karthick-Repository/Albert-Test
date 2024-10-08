Feature: Notebook validations for content of type Numbered List

  Background: User logs in and navigates to notebook
    * User creates a project
    * User navigates to the notebook
    * User clicks on the plus icon in the landing page of notebook
    Then User is in the notebook page

  @WKS_Mandatory
  Scenario: Validate that the user can add multiple numbered list blocks
    When I add 2 numbered list blocks, with each block having 10 random strings of length 10 to the notebook