Feature: CRUD test for Batch Parameter Group

  @smoke_tests
  Scenario: User must be able to create a property parameter group
    When User waits for 2 seconds
    * I click on the "Create" button
    * I click on "Parameter Group" menu option
    * I set the name of the "Property PG"
    * I validate that "App Store" is the default owner
    * I set "3" "existing" tags
    * I set the description of the "Parameter Group"
    * I set "Template, Formulas, Equipment, Consumables, Raw Materials" as parameters
    * I set the "1" value in the "template" field
    * I set the "1" value in the "Formulas" field
    * I set the "1" value in the "Equipment" field
    * I set the "1" value in the "Consumables" field
    * I set the "1" value in the "RawMaterials" field
    * I click on the "Create" button
    * User waits for 2 seconds
    Then I validate that the "parametergroups" details page is displayed
    When I fetch the code of the parameter group from the URL 
    * I validate that the "property" parameter group is "created" with the right details passed
    When I goto the "parametergroups" list page
    # * I search for the parameter group I just "created"
    # Then I validate that the parameter group is "created" successfully

  @smoke_tests
  Scenario: User must be able to delete the property parameter group
    Then I delete the parameter group
    
