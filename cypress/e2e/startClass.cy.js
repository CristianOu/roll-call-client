describe('Start a class', () => {
  it.only('start a class', () => {
    cy.login('teacher1@gmail.com', '123$');
    selectAndStartClass();
  });
});

function selectAndStartClass() {
  // clicks on the classes dropdown
  cy.get('.drop-down div:first').click();

  //clicks on the first existing class
  cy.get('.drop-down div:first div:last-child div:last-child div:first').click();

  // clicks on the start button
  cy.get('.btn-wrapper-small').click();

  // checks if generated code exists
  cy.get('.code-label').find('.code');
}
