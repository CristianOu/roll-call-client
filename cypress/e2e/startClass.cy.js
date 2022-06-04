import http from '../../src/services/http.service';

describe ('Start a class', () => {

    it.only("start a class", () => {
      login("John", "Doe", "TEACHER", "v-kane@yahoo.com", "JmE95osSMM4bYF", "1979-01-01", null);
      selectAndStartClass();
    })
})

function login(firstName, lastName, userRole, email, password, dateOfBirth, classId) {
  cy.visit('http://localhost:3000/login')
    .then(async() => {
      await executeApiLogin(firstName, lastName, userRole, email, password, dateOfBirth, classId)
    });
  cy.get("input[type='email']").type(email);
  cy.get("input[type='password']").type(password);
  cy.get("button[type='submit']").click();
}

async function executeApiLogin(firstName, lastName, userRole, email, password, dateOfBirth, classId) {
  await http.post(`http://localhost:8080/api/users/login`, {
    email: email,
    password: password
  })
}

function selectAndStartClass() {
  cy.get('.drop-down div:first').click();
  cy.get('.drop-down div:first div:last-child div:last-child div:first').click();
  cy.get('.btn-wrapper-small').click();
  // checks if generated code exists
  cy.get('.code-label').find('.code');
}
