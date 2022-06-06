import http from '../../src/services/http.service';

describe('Login Teacher', () => {
  it.only('logins and logouts teacher', () => {
    cy.login('teacher1@gmail.com', '123$');
    cy.logout();
  });
});
