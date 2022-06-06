describe('loads from server and displays student statistics ', () => {
    it("with some data ", () => {
        cy.visit('http://localhost:3000/login');
        cy.get("input[type='email']").type("student1@gmail.com");
        cy.get("input[type='password']").type("123$");
        cy.get("button[type='submit']").click();
        cy.get('[data-cy="Statistics"]').click();
        cy.get('tbody > tr > :nth-child(1)').should('contain', 'Development of Large Systems');
        cy.get('tbody > tr > :nth-child(2)').should('contain', 100);
    })

    it("with no data ", () => {
        cy.visit('http://localhost:3000/login');
        cy.get("input[type='email']").type("student4@gmail.com");
        cy.get("input[type='password']").type("123$");
        cy.get("button[type='submit']").click();
        cy.get('[data-cy="Statistics"]').click();
        cy.get('text').should('contain', 'No courses to show.');
    })
});
