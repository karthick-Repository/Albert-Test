Feature: Data Template CRUD Tests

  Background: User logs into the application
    When I click on the "Create" button
    * I click on "Data Template" menu option

  @Delete_Data_Templates @smoke_tests
  Scenario: User validates the creation of data templates
    When User waits for 2 seconds
    * I set the name of the data template
    * I set "ASTM" as the organization of the data template
    * I set "A1003/A1003M" as the ID of the data template
    Then I validate that "App Store" is the default owner
    When I set "3" "existing" tags
    * I set "Test description for the data template" as the description of the data template
    * I click on the "Create" button
    Then I validate that "Edit Data Template" dialog is displayed
    When I set "APHA Color,APHA Color 70/30 IPA,Color (delta E),% dilution (v/v%)" as the Results of the data template
    * I set "tonne,volt (V),picoliter (pL),mmH2O" as units for the results added to the data template
    * I set "Test EDR1,Test EDR2,Test EDR3,Test EDR4,Test Final Comments" as the example data row entries for all the results added to the data template
    * I click on the "Save" button
    Then I validate that "Data Template,Notes,Usage Data" tabs are displayed in the data template details page
    # * I validate that the data template details in the details page is correct
    # * I validate that the results added to the data template are displayed correctly in the details page
    # When I click on the close icon
