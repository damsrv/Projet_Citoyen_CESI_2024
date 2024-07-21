describe("Navigation mentoré", () => {
    beforeEach(() => {
        cy.visit("/connexion");
        // Connexion de l'utilisateur avant chaque test
        cy.get('input[name="email"]').type("dcote@test.fr");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();
        cy.wait(2000);

        cy.contains("Suivi demandes").should("be.visible");
    });

    it("should access the offers page", () => {
        cy.get('a:contains("Offres")').click();
        cy.url().should("include", "/offres-mentorat");
    });

    it("should access the messaging page", () => {
        cy.get('a:contains("Messagerie")').click();
        cy.url().should("include", "/messagerie");
    });

    it("should access the following demands page", () => {
        cy.get('a:contains("Suivi demandes")').click();
        cy.url().should("include", "/mon-compte/suivi-demandes");
    });
});
