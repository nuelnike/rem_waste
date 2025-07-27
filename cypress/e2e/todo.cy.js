/**
 * @fileoverview
 * Cypress end-to-end test suite for the TODO list application functionality.
 * These tests verify that the TODO features work as expected after a successful login.
 * The suite includes negative and positive tests covering adding, deleting, and clearing tasks,
 * as well as checking logout behavior.
 *
 * @testSuite Todo Test Cases
 * @baseURL http://localhost:5000
 *
 * @setup
 * Before each test:
 * - Navigate to the login page.
 * - Perform user login with valid credentials.
 * - Assert that the login is successful.
 *
 * @tests
 * 1. Negative Test - Add Empty Item:
 *    - Tries to submit an empty task.
 *    - Verifies an error message is shown.
 *
 * 2. Positive Test - Clear All Items:
 *    - Clicks the "Clear All" button.
 *    - Verifies that the task list is empty.
 *
 * 3. Positive Test - Add New Items:
 *    - Clears existing tasks.
 *    - Adds multiple new items from a predefined array.
 *    - Verifies each task appears in the list.
 *
 * 4. Positive Test - Remove Items:
 *    - Removes the first two tasks in the list.
 *    - Verifies success message appears.
 *
 * 5. Positive Test - Logout:
 *    - Clicks the logout button.
 *    - Verifies redirection to login page and displays logout message.
 *
 * @usage
 * Run using Cypress CLI or Test Runner for automated regression testing of the TODO feature.
 * Helps validate key user flows in authenticated sessions.
 */

// Define a test suite for verifying TODO list features after user login
describe('Todo test cases', () => {

    // Define constants for use in multiple tests
    const url = 'http://localhost:5000';
    const username_input_identifier = "#username";
    const password_input_identifier = "#password";
    const username = "tester";
    const password = "p@ssword";
    const todo_item_arr = [
        "Buy groceries", 
        "Pay electricity bill", 
        "Clean the kitchen",  
        "Workout for 30 mins",
        "Call mom"
    ];

    // Run before each test case
    beforeEach(() => {
        cy.visit(url); // Visit the base URL (login page)

        // Perform login
        cy.get(username_input_identifier).type(username);
        cy.get(password_input_identifier).type(password);
        cy.get("#submit").click();

        // Wait for login response and verify success
        cy.wait(1000);
        cy.contains("Success").should("be.visible");
    });

    // Test: User tries to add an empty TODO item
    it('Negative test - Add empty item to the todo list.', () => { 
        // Try submitting without typing any text
        cy.get("#newItem").should("be.visible").type("{enter}");

        // Wait for response and verify error message
        cy.wait(1000);
        cy.contains("Enter text to add item").should("be.visible");
    });

    // Test: User clears all items from the TODO list
    it('Positive test - Clear all todo items.', () => { 
        // Click the "Clear All" button
        cy.get('#clearBtn')
            .should("be.visible")
            .click();

        // Confirm that the list is empty
        cy.contains("No tasks available, create new task.").should("be.visible");
    });

    // Test: Add multiple new TODO items to the list
    it('Positive test - Add new items to the todo list.', () => { 
        // First clear any existing items
        cy.get('#clearBtn')
            .should("be.visible")
            .click();

        // Confirm list is empty before adding new items
        cy.contains("No tasks available, create new task.").should("be.visible");

        // Loop through the item array and add each one
        for (let i = 0; i < todo_item_arr.length; i++) {
            cy.get("#newItem")
                .should("be.visible")
                .type(todo_item_arr[i])
                .type("{enter}");

            // Assert that each added item is now visible in the list
            cy.get(`.todo-list > :nth-child(${i+1})`).should("be.visible");
        }
    });

    // Test: Remove two items from the TODO list
    it('Positive test - Remove item from todo list.', () => {  
        // Click the delete button on the first two items
        for (let i = 0; i < 2; i++) {
            cy.get(`:nth-child(${i+1}) > .todo-right > button`).click();
        }

        // Confirm item removal message
        cy.contains("item removed successfully").should("be.visible");
    });

    // Test: Logout functionality
    it('Positive test - user logout.', () => {  
        // Click the logout button
        cy.get('#logoutBtn').click();

        // Assert redirection to login page
        cy.url().should('include', 'login');

        // Confirm logout success message is shown
        cy.contains("logout was successfully").should("be.visible");
    });

});