# Cypress Automated Test Suite

This project contains Cypress end-to-end test automation for validating:
1. User login functionality
2. TODO list features (authenticated user flow)

These test scripts simulate real user behavior to ensure that core features of your web application are functioning correctly.

---

## Project Structure
- API/
- └── postman_collection.json
- cypress/
- └── e2e/
- ├── login.cy.js
- └── todo.cy.js

---

## Getting Started

## UI Setup

### 1. Clone the Repository
- git clone https://github.com/nuelnike/rem_waste.git
- cd rem_waste

### 2. Install Dependencies
- npm install

### 3. Open Cypress Test Runner
- npx cypress open
- npx cypress run

## Credentials Used for Testing
- BaseURL: http://qa.nuelnike.com:5000
- Username: tester
- Password: p@ssword

## API Setup
- Run Postman
- Import collection from API folder
- After import, click on the colletion to run

## Test Coverage

### 1. Login Test Suite (login.cy.js)
This test suite validates the login form behavior for valid and invalid inputs.

#### Tests Included:
- Invalid Username	# Inputs an incorrect username and checks for error feedback.
- Invalid Password	# Inputs a wrong password and checks for error feedback.
- Valid Login, Password Toggle Tests & Successful login # Verify login & password toggle visibility 

### 2. TODO Test Suite (todo.cy.js)
This test suite validates the TODO list features, which require user authentication before access.

#### Tests Included:
- Add Empty Item	# Ensures empty task input is rejected and error is shown.
- Clear All Items	# Clears the TODO list and verifies success.
- Add Items	        # Adds multiple new TODO tasks and verifies their appearance.
- Remove Items	    # Deletes tasks and confirms their removal.
- Logout	        # Logs the user out and confirms redirect + message.
