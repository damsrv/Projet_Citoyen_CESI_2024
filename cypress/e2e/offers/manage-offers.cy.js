describe("Gestion des offres de mentorat", () => {
    beforeEach(() => {
        cy.visit("/connexion");
        // Connexion de l'utilisateur avant chaque test
        cy.get('input[name="email"]').type("dcote@test.fr");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();
        cy.wait(2000);
    });

    it("should create a new offer", () => {
        // attendre 3 secondes pour que l'utilisateur soit connecté

        cy.visit("/mon-compte/gerer-offres");
        cy.contains("Créer une nouvelle offre").click();
        cy.url().should("include", "/offres-mentorat/nouveau");

        cy.get('input[name="title"]').type(
            "Offre de mentorat en développement web"
        );
        cy.get('textarea[name="content"]').type(
            "Description de l'offre de mentorat en développement web"
        );
        cy.get("#select-category").click();
        cy.get('[role="option"]').contains("Informatique").click();

        cy.contains("Visio").click();
        cy.contains("Téléphone").click();

        cy.get('input[name="location"]').type("Paris");

        // selectionner le label avec "Publiée" et cliquer dessus
        cy.contains("Publiée").click();

        cy.contains("Enregistrer l'offre").click();

        // Vérifier que l'offre a été créée avec succès
        cy.contains("L'offre a bien été enregistrée.").should("be.visible");
        cy.visit("/mon-compte/gerer-offres");
        cy.contains("Offre de mentorat en développement web").should(
            "be.visible"
        );
    });

    it("should display existing offers", () => {
        cy.visit("/mon-compte/gerer-offres");
        // Vérifier que les offres sont affichées
        cy.contains("Offre de mentorat en développement web").should(
            "be.visible"
        );
    });

    it("should edit an existing offer", () => {
        cy.visit("/mon-compte/gerer-offres");
        // trouver l'offre à modifier, remonter à la ligne du tableau avec <tr> et chercher le bouton pour ouvrir les actions (3e colonne) puis cliquer sur le lien modifier l'offre
        cy.contains("Offre de mentorat en développement web")
            .get("tr")
            .find("button.trigger-actions")
            .click();
        cy.contains("Modifier l'offre").click();

        cy.url().should("include", "/offres-mentorat/modifier");

        cy.get('input[name="title"]')
            .clear()
            .type("Offre de mentorat en développement web avancé");
        cy.contains("Enregistrer l'offre").click();

        // Vérifier que l'offre a été modifiée avec succès
        cy.contains("L'offre a bien été enregistrée.").should("be.visible");
        cy.url().should("include", "/mon-compte/gerer-offres");

        // il faut refresh la page pour voir les changements
        cy.reload();
        cy.contains("Offre de mentorat en développement web avancé").should(
            "be.visible"
        );
    });

    // it("should delete an existing offer", () => {
    //     cy.visit("/mon-compte/gerer-offres");
    //     cy.contains("Offre de mentorat en développement web avancé")
    //         .parent()
    //         .find("button[title='Supprimer l'offre']")
    //         .click();

    //     // Confirmer la suppression
    //     cy.contains("Valider").click();

    //     // Vérifier que l'offre a été supprimée avec succès
    //     cy.contains("Offre supprimée avec succès").should("be.visible");
    //     cy.contains("Offre de mentorat en développement web avancé").should(
    //         "not.exist"
    //     );
    // });
});
