import http from '../../src/services/http.service';

describe('Login Student', () => {
  it.only('logins and logouts student', () => {
    login(
      'Marianna',
      'Przygocka',
      'STUDENT',
      'd-kane@yahoo.com',
      'JmE95osSMMaaaa',
      '1979-01-01',
      1
    );
    logout();
  });
});

function login(email, password) {
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
}

function logout() {
  cy.get("img[id='profilePicture']").click();
  cy.get("button[id='signOut']").click();
}
