# Automation testing UI + API + DB with Cucumber

### Techstack: Cucumberjs + Playwright + Nodejs (Javascript) + MongoDB

## Introduction

- The project combined both ui, api and DB automation testing for Milana Web Application

## Installation

- Use Node v16+ (should 18 in my suggestion)
- Install yarn
- Clone the project & run yarn install

## Scripts

1. `yarn test-ui-dev:chrome` for run test UI with Playwright - Chrome
2. `yarn test-api-dev` for run test API using bundled Playwright API request
3. `yarn test-db-dev` for connect DB and run test DB
4. `yarn test-dev` for run all tests
   ... and more in `package.json`

## Reporter

- After run any tests, there will be 2 reporter generated: Cucumber and Allure

1. For Cucumber HTML report, just check the `test-results` folder
2. For Allure report, please run `yarn show-report` to display it
