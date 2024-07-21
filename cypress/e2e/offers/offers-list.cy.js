describe("Liste des offres", () => {
    beforeEach(() => {
        cy.visit("/connexion");
        // Connexion de l'utilisateur avant chaque test
        cy.get('input[name="email"]').type("dcote@test.fr");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();
        cy.wait(2000);
    });

    it("should see the offers list", () => {
        cy.visit("/offres-mentorat");
        cy.contains("Mentorat en Photographie Artistique").should("be.visible");
    });

    it("should see the offer details", () => {
        cy.visit("/offres-mentorat");
        cy.contains("Mentorat en Photographie Artistique")
            .should("be.visible")
            .parent()
            .parent()
            .contains("Voir l'offre")
            .click();
        cy.contains("Mentorat en Photographie Artistique").should("be.visible");
    });

    // vérifier que la pagination marche
    it("should paginate the offers", () => {
        cy.visit("/offres-mentorat");
        cy.wait(1000);
        cy.contains("Page suivante").click();
        cy.contains("Mentorat en Sculpture sur Bois").should("be.visible");
    });

    // // vérifier que le filtre marche
    // it("should filter the offers", () => {
    //     cy.visit("/offres-mentorat");

    //     cy.get("#select-categorytype").click();
    //     cy.get('[role="option"]').contains("PARTAGE COMPETENCES").click();

    //     cy.contains("Aide à la création d'entreprise").should("not.exist");
    //     cy.contains("Mentorat en Peinture à l'Huile").should("be.visible");
    // });
});
