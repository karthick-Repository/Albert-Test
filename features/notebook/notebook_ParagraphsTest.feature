Feature: Notebook validations for content of type Text

  Background: User logs in and navigates to notebook
    When User creates a project
    And User navigates to the notebook
    And User is in the notebook page

  # @WKS_Mandatory @INVENT-4733
  # Scenario: Tests to validate text blocks addition, editing, re-ordering, copying & deleting to/from a notebook
  #   When The user duplicates the current notebook
  #   Then The user validates that the copied notebook is saved with the prefix "Copy of"

  @WKS_Mandatory @INVENT-4733
  Scenario: Tests to validate text blocks addition, editing, re-ordering, copying & deleting to/from a notebook
    When The user sets a random string of length 50 as the name of the notebook
    Then The user validates that the name of the notebook matches with the name in the notebook side panel
    When The user enters text blocks with lengths "50,100,150" to the notebook
    Then The user validates that the data is saved in the notebook
    When The user moves "text block" 0 "down" by 2 positions
    Then The user validates that the data is saved in the notebook
    When The user moves "text block" 2 "up" by 1 positions
    Then The user validates that the data is saved in the notebook
    When The user deletes block 1
    Then The user validates that the data is saved in the notebook
    When The user deletes block 2
    # # Defect INVENT-4733
    When User reloads the page
    * User waits for 3 seconds
    * User is in the notebook page
    Then The user validates that the data is saved in the notebook
    When The user edits the text blocks "0,1" with new text blocks having strings with lengths "10,20" in the notebook
    Then The user validates that the data is saved in the notebook
    When The user merges the text blocks "0,1" in the notebook
    Then The user validates that the data is saved in the notebook
    When The user splits the text block 0 into equal parts
    Then The user validates that the data is saved in the notebook
    When The user copies the contents of block 0 to block 1
    Then The user validates that the data is saved in the notebook
    When The user copies the contents of block 0 to block 2
    Then The user validates that the data is saved in the notebook
    # When The user duplicates the current notebook
    # Then The user validates that the copied notebook is saved with the prefix "Copy of"
# * The user validates that the data is saved in the notebook
# When The user enters text blocks with lengths "30,40,50" to the notebook
# Then The user validates that the data is saved in the notebook
# When The user moves block 0 "down" by 1 positions
# Then The user validates that the data is saved in the notebook
# When The user moves block 2 "up" by 1 positions
# Then The user validates that the data is saved in the notebook
# When The user deletes block 1
# Then The user validates that the data is saved in the notebook
# When The user duplicates the current notebook
# Then The user validates that the data is saved in the notebook
# * The user validates that the copied notebook is saved with the prefix "Copy of Copy of"

# @WKS_Mandatory @TO-DO @INVENT-4740 @INVENT-4742
# Scenario: Validate that the user can copy paste contents from different file formats into a notebook
#   When The user sets a random string of length 10 as the name of the notebook
#   When The user copies the contents of the file "Lorem Ipsum" in the "docx" format into the notebook
#   Then The user validates that the pasted data is saved in the notebook
