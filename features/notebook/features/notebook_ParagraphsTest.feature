Feature: Notebook validattions for content of type Text

  Background: User logs in and navigates to notebook
    * User creates a project
    * User navigates to the notebook
    * User clicks on the plus icon in the landing page of notebook
    Then User is in the notebook page

  @WKS_Mandatory @smoke_tests
  Scenario: Validate the CRUD features of notebook
    Then User validates that the table in the page has the headers "Notebook,Created By,Created On"
    * User validates that the message "This project does not have any notebooks yet. Click the + icon in the table header to create a notebook." in the landing page of the notebook
    * User validates that the sort by drop down displays the following options "Created On: Newest → Oldest,Created On: Oldest → Newest,Created By: A → Z,Created By: Z → A,Notebook: A → Z,Notebook: Z → A"
    When User clicks on the plus icon in the landing page of notebook
    Then User is in the notebook page
    * User validates the contents of the empty notebook
    When User clicks on the close icon
    Then User is in the landing page of notebook
    * User validates that the record at position "1" of the table is "Untitled Notebook"

  @WKS_Mandatory @smoke_tests
  Scenario: Validate that the user can add multiple text blocks, delete the contents of the text block to a notebook
    When I add 2 text blocks with random strings of length 1000 to the notebook
    Then I validate that the text blocks are added to the notebook
    When I copy the contents of text block number 1 into text block number 2
    Then I validate that the contents of text block number 1 and 2 are identical
    When I delete the contents of text block number 1
    Then I validate that the place-holder text "Type / to add a block or @ to mention collaborators, tasks, inventories " is displayed in text block number 1
    When I enter a random string on length 200 characters into text block number 1
    * User waits for 2 seconds
    When User reloads the page
    * I wait till the "notebook" page is reloaded
    * I "Delete" block number 3
    Then I validate that the contents of text block number 1 are saved successfully
  # @WKS_Mandatory
  # Scenario: Validate text block add/edit feature in notebook
  #   When I add 5 text blocks with random strings of length 20 to the notebook
  #   Then I validate that the text blocks are added to the notebook
  #   When I "Delete" block number 5
  #   Then I validate the updated text blocks in the notebook after deleting the block at number 5
  #   * I "Move down" block number 1
  #   * I "Move up" block number 2
  #   # When I edit the contents of block number 4 and replace it with a random string of length 20
  #   # When I move up block number 4
  #   # When user Add the user mention with the paragraph
  #   # When user selects the paragraph and convert to Heading1,Heading2,Heading3,NumberedList,CheckList,BulletdList
  #   # When user selects the paragraph and changes the texts to Bold
  #   # When user selects the paragraph and changes the text to italic style
  #   # When user selects the paragraph and adds a link
