Feature: Database testing

    @DB
    Scenario: I access the Users table and validate data correct as my expect
        Given I get the database config and generate connection string
        When I query the 'Users' table with query '{ "username": "iampranavtyagi" }'
        Then the data returns from Users table correct as my expect

    @DB
    Scenario: I access the Profiles table and validate data correct as my expect
        Given I get the database config and generate connection string
        When I query the 'Profiles' table with query '{ "displayName": "AAAA" }'
        Then the data returns from Profiles table correct as my expect

    @DB
    Scenario: I can get Users have gender Female in Database
        Given I get the database config and generate connection string
        When I query the 'Profiles' table with query '{"personalInformation.gender": "female"}'
        Then the data get all Female Users returns from Profiles table correct as my expect