Feature: Tests to validate login page checks

  Background: I logout of maya
    When I logout of maya

  Scenario: Validate that the warning message is displayed when the user tries to login to the application with an invalid email ID
    When I click on Add New Account
    And I enter the following "email ID" " "
    And I click on the Continue button
    Then I validate that the error message "Invalid email. Try again with a valid email." is displayed in the page
    When I enter the following "email ID" "appstore@"
    And I click on the Continue button
    When User waits for 1 seconds
    Then I validate that the error message "Invalid email. Try again with a valid email." is displayed in the page
    When I enter the following "email ID" "appstore@albertinvent"
    And I click on the Continue button
    When User waits for 1 seconds
    Then I validate that the error message "Account with this email does not exist. Contact support." is displayed in the page
    When I enter the following "email ID" ".com"
    And I click on the Continue button
    When User waits for 1 seconds
    Then I validate that the error message "Invalid email. Try again with a valid email." is displayed in the page

  Scenario: Validate that the warning message is displayed when the user tries to enter incorrect MFA code
    When I enter the email ID in the login page and hit continue
    * User waits for 2 seconds
    * I click on the Sign in with Authenticator button
    * I enter the following "pass code" " "
    * I click on the Continue button after entering the MFA code
    Then I validate that the error message "should NOT be shorter than 6 characters. Try another code or Resend Activation Email" is displayed in the page
    When I enter the following "pass code" "123457"
    And I click on the Continue button after entering the MFA code
    When User waits for 1 seconds
    Then I validate that the error message "Invalid auth code. Try another code or Resend Activation Email" is displayed in the page
    When I enter the following "pass code" ".... 1231!!!"
    And I click on the Continue button after entering the MFA code
    When User waits for 1 seconds
    Then I validate that the error message "Invalid auth code. Try another code or Resend Activation Email" is displayed in the page
    When I enter the following "pass code" "1234"
    And I click on the Continue button after entering the MFA code
    When User waits for 1 seconds
    Then I validate that the error message "should NOT be shorter than 6 characters. Try another code or Resend Activation Email" is displayed in the page
    When I enter the following "pass code" "654321"
    And I click on the Continue button after entering the MFA code
    When User waits for 1 seconds
    Then I validate that the error message "Invalid auth code. Try another code or Resend Activation Email" is displayed in the page
    When I enter the following "pass code" "122456"
    And I click on the Continue button after entering the MFA code
    When User waits for 1 seconds
    Then I validate that the error message "Your account has been locked due to exceeding 5 failed login attempts. Try another code or Resend Activation Email" is displayed in the page

  Scenario: Validate the UI elements in login, authenticator & passcode entering page
    Then I validate the UI elements in the login page
    When I enter the email ID in the login page and hit continue
    * User waits for 2 seconds
    Then I validate the UI elements in the sign in options page
    When I click on the Sign in with Authenticator button
    Then I validate the UI elements in the authenticator page

  Scenario: Validate that the user name is stored automatically after a login
    Then I validate the UI elements in the login page
    * I validate that the logged in user name is saved
    # Challenges in clicking on the maya-button element inside shadow dom
    # When I delete the saved user name
    # Then I validate that the logged in user name is not saved anymore