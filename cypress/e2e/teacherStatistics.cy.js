describe('loads from server and displays teacher statistics ', () => {
    it("with some data ", () => {
        cy.visit('http://localhost:3000/login');
        cy.get("input[type='email']").type("teacher1@gmail.com");
        cy.get("input[type='password']").type("123$");
        cy.get("button[type='submit']").click();
        cy.get('[data-cy="Statistics"]').click();
        cy.get('.css-b62m3t-container').type('Development of Large Systems{enter}{enter}');
        cy.get('[data-cy="statisticsTable"]').find('tr').should('have.length', 5);
    })

    it("with no data ", () => {
        cy.visit('http://localhost:3000/login');
        cy.get("input[type='email']").type("teacher2@gmail.com");
        cy.get("input[type='password']").type("123$");
        cy.get("button[type='submit']").click();
        cy.get('[data-cy="Statistics"]').click();
        cy.get('.css-tlfecz-indicatorContainer').click();
        cy.get('span > input').should("have.attr", "placeholder", "0 records...");
    })
});
