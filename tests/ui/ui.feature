Feature: UI Testing

    @UI
    Scenario: I can login to the dashboard page to see the content
        Given I navigate to the home page
        When I go to the Sign in page by click button Sign in on Home page
        Then I can see the Login Form on the Sign in Page
        And I login with a valid credential
        Then I can access the dashboard page to see the content

    @UI
    Scenario: I can logout to the application and back to the home page
        Given I navigate to the home page
        When I go to the Sign in page by click button Sign in on Home page
        Then I can see the Login Form on the Sign in Page
        And I login with a valid credential
        Then I can access the dashboard page to see the content
        And I logout the application
        Then I am landing on the homepage

    @UI
    Scenario: I can see the validation on the Login page
        Given I navigate to the home page
        When I go to the Sign in page by click button Sign in on Home page
        Then I can see the Login Form on the Sign in Page
        And I click the Sign in button on the Sign in page
        Then I can see the Username and Password Error validation shown