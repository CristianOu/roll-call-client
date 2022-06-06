import http from '../../src/services/http.service';

describe('Login Student', () => {
  it.only('logins and logouts student', () => {
    cy.login('student1@gmail.com', '123$');
    cy.logout();
  });
});
