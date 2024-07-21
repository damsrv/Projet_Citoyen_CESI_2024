describe("Navigation mentor", () => {
    beforeEach(() => {
        cy.visit("/connexion");
        // Connexion de l'utilisateur avant chaque test
        cy.get('input[name="email"]').type("dcote@test.fr");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();
        cy.wait(2000);

        cy.contains("Vue mentoré").click();
        // Trouver le texte "Vue mentor" et cliquer dessus, attention on doit trouver exactement ce texte, Vue mentoré ne doit pas être cliqué
        cy.contains(/^Vue mentor$/).click();
        // Il doit y avoir un bouton "Nouvelle offre"
        cy.contains("Nouvelle offre").should("be.visible");
    });

    it("should create a new offer", () => {
        cy.get('a:contains("Nouvelle offre")').click();
        cy.url().should("include", "/offres-mentorat/nouveau");
    });

    it("should access the messaging page", () => {
        cy.get('a:contains("Messagerie")').click();
        cy.url().should("include", "/messagerie");
    });

    it("should access the follow offers page", () => {
        cy.get('a:contains("Suivi offres")').click();
        cy.url().should("include", "/mon-compte/suivi-offres");
    });
});
