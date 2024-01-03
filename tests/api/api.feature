Feature: Api testing

    @API
    Scenario: I can login to the application by API and data return correct
        Given I Login to the application by API and get the token
        When I use the token to get the user profile by API
        Then the '/users' API returns status code 200 with message 'OK'
        And the Users API returns data correct as in the database

    @API
    Scenario: I can get the Sale Opportunities of User by API and data return correct
        Given I Login to the application by API and get the token
        When I get the Sale Opportunities of current user by API
        Then the '/getSalesOpportunities' API returns status code 200 with message 'OK'
        And the Sale Opportunities API returns data correct as in the database

    @API
    Scenario: I can not get the User Profile by API without token
        Given I get the user profile by API without token
        Then the '/users' API returns status code 500 with message 'Internal Server Error'