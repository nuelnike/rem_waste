/**
 * @fileoverview
 * Cypress test suite for verifying user login functionality.
 * This suite contains both positive and negative test cases to ensure that:
 *  - Valid user credentials result in a successful login.
 *  - Invalid username or password triggers appropriate error messages.
 *  - The password visibility toggle behaves as expected.
 * 
 * @testSuite User Login Test Cases
 * @baseURL https://simple-todo-manager.onrender.com/auth/login
 * 
 * @tests
 * 1. Negative Test - Invalid Username:
 *    - Enters an incorrect username with a valid password.
 *    - Verifies that an error message is displayed.
 * 
 * 2. Negative Test - Invalid Password:
 *    - Enters a correct username with an invalid password.
 *    - Verifies that an error message is displayed.
 * 
 * 3. Positive Test - Valid Credentials and Password Toggle:
 *    - Enters valid username and password.
 *    - Toggles the password visibility and checks input type changes.
 *    - Submits the form and checks for a success message.
 * 
 * @usage
 * Run using Cypress Test Runner in your CI/CD pipeline or local development
 * environment to validate login form behavior against regression or UI issues.
 */
// Define a test suite for user login scenarios
describe('User login test cases', () => {

  // Define constants used throughout the tests
  const url = 'https://simple-todo-manager.onrender.com/auth/login';
  const username_input_identifier = "#username";
  const password_input_identifier = "#password";
  const username = "tester";
  const password = "p@ssword";

  // Visit the login page before each test
  beforeEach(() => cy.visit(url));

  // Test: Login attempt with an invalid username
  it('Negative test using invalid username.', () => { 
    // Type an invalid username into the username input field
    cy.get(username_input_identifier).type("invalid_" + username);
    
    // Type a valid password into the password input field
    cy.get(password_input_identifier).type(password);
    
    // Click the login/submit button
    cy.get("#submit").click();

    // Wait for potential response/render delay (should ideally use cy.intercept instead of cy.wait)
    cy.wait(1000);

    // Assert that an error message is visible
    cy.contains("Error").should("be.visible");
    cy.screenshot('login-with-invalid-username');
  });

  // Test: Login attempt with an invalid password
  it('Negative test using invalid password.', () => { 
    // Type a valid username
    cy.get(username_input_identifier).type(username);
    
    // Type an invalid password
    cy.get(password_input_identifier).type("invalid_" + password);
    
    // Click the submit button
    cy.get("#submit").click();

    // Wait for response
    cy.wait(1000);

    // Assert that an error message appears
    cy.contains("Error").should("be.visible");
    cy.screenshot('login-with-invalid-password');
  });

  // Test: Successful login with valid credentials and password toggle behavior
  it('Positive test using valid data.', () => { 
    // Type a valid username and password
    cy.get(username_input_identifier).type(username);
    cy.get(password_input_identifier).type(password);

    // Toggle password visibility ON
    cy.get('.toggle-btn').click(); 
    // Assert that password input field type is now "text"
    cy.get('#password').should('have.attr', 'type', 'text');

    // Toggle password visibility OFF
    cy.get('.toggle-btn').click(); 
    // Assert that password input field type is back to "password"
    cy.get('#password').should('have.attr', 'type', 'password');

    // Click the login button
    cy.get("#submit").click();

    // Wait for response
    cy.wait(1000);

    // Assert that a success message is visible on successful login
    cy.contains("Success").should("be.visible");
    cy.screenshot('login-with-valid-data');
  });

});