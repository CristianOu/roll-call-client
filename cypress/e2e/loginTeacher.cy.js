import http from '../../src/services/http.service';

describe ('Login Teacher', () => {

    it.only("logins and logouts teacher", () => {
      login("teacher2@gmail.com", "123$");
      logout();
    })
})

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
  cy.get("div[id='signOut']").click();
  cy.get("div[class=authentication-form-container]");//should include this div after logout
}
