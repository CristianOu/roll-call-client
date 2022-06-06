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

function login(firstName, lastName, userRole, email, password, dateOfBirth, classId) {
  cy.visit('http://localhost:3000/login').then(
    async () =>
      await register(firstName, lastName, userRole, email, password, dateOfBirth, classId)
  );
  cy.get("input[type='email']").type(email);
  cy.get("input[type='password']").type(password);
}

function logout() {
  cy.get("button[type='submit']").click();
  cy.get("img[id='profilePicture']").click();
  cy.get("button[id='signOut']").click();
}

async function register(
  firstName,
  lastName,
  userRole,
  email,
  password,
  dateOfBirth,
  classId
) {
  const response = await http.post(`http://localhost:8080/api/users/register`, {
    firstName: firstName,
    lastName: lastName,
    userRole: userRole,
    email: email,
    password: password,
    dateOfBirth: dateOfBirth,
    classId: classId
  });
}
