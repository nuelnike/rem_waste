# QA Automation Script written with Playwright for a Simple TODO App

This project is an end-to-end (E2E) test automation suite using [Playwright](https://playwright.dev/) for a sample TODO web application. It includes tests for the login functionality and the protected TODO list page.

## Features Tested

- Login with valid credentials
- Prevent access to TODO page without authentication
- Access TODO list after successful login
- View sample TODO items
- Add new item
- Remove existing item
- Mark completed.

---

## Sample Test User

Use the following test credentials to perform login operations:
- Url: http://qa.nuelnike.com:5000/
- Username: tester
- Password: p@ssword

## Project Structure
- test-suite/
- │
- ├── tests/
- │ ├── login.spec.ts # Tests login scenarios
- │ └── todo.spec.ts # Tests todo list access and visibility
- │
- ├── playwright.config.ts # Playwright test runner config
- ├── package.json
- └── README.md

## Getting Started

### 1. Clone the Repository

- git clone https://github.com/nuelnike/rem_waste.git
- cd rem_waste

### 2. Install Packages
- npm install

### 3. Run Playwright
- npx playwright test

### Playwright Test Command Options
- npx playwright test --headed            # Run tests with UI
- npx playwright test --project=chromium  # Run only on Chromium
- npx playwright show-report              # Show last test run report