describe("Gestion des offres favorites", () => {
    beforeEach(() => {
        cy.visit("/connexion");
        // Connexion de l'utilisateur avant chaque test
        cy.get('input[name="email"]').type("dcote@test.fr");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();
        cy.wait(2000);
    });

    it("should save an offer", () => {
        cy.visit("/offres-mentorat");
        cy.contains("Mentorat en Photographie Artistique")
            .should("be.visible")
            .parent()
            .parent()
            .contains("Voir l'offre")
            .click();
        cy.get("button.add-saved-offer").click();

        cy.get("button.remove-saved-offer").should("be.visible");
    });

    it("should see the saved offer", () => {
        cy.visit("/mon-compte/offres-favorites");
        cy.contains("Mentorat en Photographie Artistique").should("be.visible");
    });

    it("should remove the saved offer", () => {
        cy.visit("/mon-compte/offres-favorites");
        cy.contains("Mentorat en Photographie Artistique")
            .should("be.visible")
            .parent()
            .parent()
            .get("button.remove-saved-offer")
            .click();
        cy.contains("Mentorat en Photographie Artistique")
            .should("be.visible")
            .parent()
            .parent()
            .get("button.add-saved-offer")
            .should("be.visible");
    });

    it("should not see the saved offer", () => {
        cy.visit("/mon-compte/offres-favorites");
        cy.contains("No results").should("be.visible");
    });
});
