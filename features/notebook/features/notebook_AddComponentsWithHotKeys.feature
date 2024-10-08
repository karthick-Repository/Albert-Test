Feature: Notebook validations for various headings

  Background: User logs in and navigates to notebook
    * User creates a project
    * User navigates to the notebook
    * User clicks on the plus icon in the landing page of notebook
    Then User is in the notebook page

  @WKS_Mandatory
  Scenario: Validate that the user can add and search various for headings in the notebook using hotkeys
    When I add 3 "Heading 1" blocks of length 10 to the notebook "using hotkeys"
    # * I add 1 "Heading 2" blocks of length 10 to the notebook "using hotkeys"
    # # * I add 1 "Heading 3" blocks of length 10 to the notebook "using hotkeys"
  
#   @WKS_Mandatory
#   Scenario: Validate that the user can add and search the added bulleted list in the notebook using hotkeys
#     When I add 1 "Bulleted List" block or blocks each containing 10 list items with random strings of length 10 to the notebook using hotkeys
#     Then I validate that the user can search for the added "Bulleted List" blocks using hotkeys

#   @WKS_Mandatory
#   Scenario: Validate that the user can add and search the added numbered list in the notebook using hotkeys
#     When I add 1 "Numbered List" block or blocks each containing 10 list items with random strings of length 10 to the notebook using hotkeys
#     Then I validate that the user can search for the added "Numbered List" blocks using hotkeys

#   @WKS_Mandatory
#   Scenario: Validate that the user can add and search the added check list in the notebook using hotkeys
#     When I add 1 "Checklist" block or blocks each containing 10 list items with random strings of length 10 to the notebook using hotkeys
#     Then I validate that the user can search for the added "Checklist" blocks using hotkeys
