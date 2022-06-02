import http from '../../src/services/http.service';

describe ('Login Teacher', () => {

    it.only("logins and logouts teacher", () => {
      login("Dagmara", "Przygocka", "TEACHER", "v-kane@yahoo.com", "JmE95osSMM4bYF", "1979-01-01", null);
      logout();
    })
})

function login(firstName, lastName, userRole, email, password, dateOfBirth, classId) {
  cy.visit('http://localhost:3000/login').then(async () => await register(firstName, lastName, userRole, email, password, dateOfBirth, classId));
  cy.get("input[type='email']").type(email);
  cy.get("input[type='password']").type(password);
}

function logout() {
  cy.get("button[type='submit']").click();
  cy.get("img[id='profilePicture']").click();
  cy.get("div[id='signOut']").click();
}

async function register(firstName, lastName, userRole, email, password, dateOfBirth, classId) {
  const response = await http.post(`http://localhost:8080/api/users/register`, {
    firstName: firstName,
    lastName: lastName,
    userRole: userRole,
    email: email,
    password: password, 
    dateOfBirth: dateOfBirth,
    classId: classId,
  })
}