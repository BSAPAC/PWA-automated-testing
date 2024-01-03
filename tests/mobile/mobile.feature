Feature: Native Mobile testing

    @Mobile @skip
    Scenario: I open the Mobile application and the correct content is rendered
        Given I open the Application
        When the application loaded
        Then I can see the login form
        And I can see the register button