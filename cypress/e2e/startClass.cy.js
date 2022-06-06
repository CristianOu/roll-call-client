describe ('Start a class', () => {
    it.only("start a class", () => {
      login("v-kane@yahoo.com", "JmE95osSMM4bYF");
      selectAndStartClass();
    })
})

function login(email, password) {
  cy.visit('http://localhost:3000/login');
  cy.get("input[type='email']").type(email);
  cy.get("input[type='password']").type(password);
  cy.get("button[type='submit']").click();
}

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
