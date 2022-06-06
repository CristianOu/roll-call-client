// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Reusable commands
Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:3000/login');
  cy.get("input[type='email']").type(email);
  cy.get("input[type='password']").type(password);
  cy.get("button[type='submit']").click();

  //check whether neccessary data is loaded
  cy.get("div[class='side-bar-container']");
  cy.get("div[class='options-container']");
  cy.get("div[class='logo']");
  cy.get("div[class='top-bar-container']");
  cy.get("div[class='utility-bar']");
  cy.get("div[class='students-section empty']");
});

Cypress.Commands.add('logout', () => {
  cy.get("img[id='profilePicture']").click();
  cy.get("button[id='signOut']").click();
  cy.url().should('be.equal', `${Cypress.config('baseUrl')}/login`);
});
