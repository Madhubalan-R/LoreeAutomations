Feature: Access the Loree editor

Scenario: Login should be success
  Given user on the Loree homepage
  When user enter the username
  And user enter the password
  And user click on the Login button
  Then Login should be success

Scenario: validate the Advance checkbox
  Given user on the Loree landing page
  When user click the Admin button and click on Roles and Features 
  Then user should see the advance checkbox is checked
