Feature: Notebook validations for content of type Bullet List

    Background: User logs in and navigates to notebook
        When User creates a project
        And User navigates to the notebook
        When The user sets a random string of length 50 as the name of the notebook

    @WKS_Mandatory
    Scenario: Tests to validate bullet list blocks addition, editing, re-ordering, copying & deleting to/from a notebook
        When I add 2 list blocks of type "Bulleted List" each containing 3 random strings of length 15 into the notebook
        Then I validate that the added list blocks are saved in the notebook
        When I proceed to add the next set of blocks in the notebook
        * I add 2 list blocks of type "Numbered List" each containing 3 random strings of length 20 into the notebook
        Then I validate that the added list blocks are saved in the notebook
        When I edit list block 1 to block type "Numbered List" with 4 new random strings of length 20 each
        Then I validate that the added list blocks are saved in the notebook
        When I edit list block 3 to block type "Bulleted List" with 5 new random strings of length 5 each
        Then I validate that the added list blocks are saved in the notebook

    # @WKS_Mandatory
    # Scenario: Tests to validate checked list blocks addition, editing, re-ordering, copying & deleting
    #     When I add 2 list blocks of type "Checklist" each containing 3 random strings of length 25 into the notebook
    #     Then I validate that the added checked list blocks are saved in the notebook