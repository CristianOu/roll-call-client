describe('Attend lecture', () => {
  it('logs in the student', () => {
    cy.login('john_doe@gmail.com', 'pass'); //custom command -> found in /support/command.js
  });

  it('attends lecture', () => {
    const code = 'B1phRMpkbz';

    cy.get("input[id='code']").type(code);
    cy.get("button[id='join-class']").click();
    cy.get("div[class='student-box']");
  });

  it('logs out the student', () => {
    cy.logout(); //custom command -> found in /support/command.js
  });
});
