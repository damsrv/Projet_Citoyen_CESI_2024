describe("Gestion des demandes sur les offres de mentorat", () => {
    before(() => {
        cy.visit("/connexion");
        // Connexion de l'utilisateur avant chaque test
        cy.get('input[name="email"]').type("dcote@test.fr");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();
        cy.wait(2000);

        // Créer une offre de mentorat
        cy.visit("/mon-compte/gerer-offres");
        cy.wait(5000);
        cy.contains("Créer une nouvelle offre").click();
        cy.wait(1000);
        cy.url().should("include", "/offres-mentorat/nouveau");
        cy.get('input[name="title"]').type(
            "Offre de test du management des offres de mentorat"
        );
        cy.get('textarea[name="content"]').type(
            "Description de l'offre de test du management des offres de mentorat"
        );
        cy.get("#select-category").click();
        cy.get('[role="option"]').contains("Informatique").click();

        cy.contains("Visio").click();
        cy.contains("Téléphone").click();

        // selectionner le label avec "Publiée" et cliquer dessus
        cy.contains("Publiée").click();

        cy.contains("Enregistrer l'offre").click();

        // Vérifier que l'offre a été créée avec succès
        cy.contains("L'offre a bien été enregistrée.").should("be.visible");
        cy.visit("/mon-compte/gerer-offres");
        cy.contains(
            "Offre de test du management des offres de mentorat"
        ).should("be.visible");
    });

    it("should see the offers and create a demand", () => {
        // se connecter avec un autre utilisateur
        cy.visit("/connexion");
        // Connexion de l'utilisateur avant chaque test
        cy.get('input[name="email"]').type("j-moulin@test.fr");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();
        cy.wait(2000);

        cy.visit("/offres-mentorat");

        cy.contains("Page suivante").click();
        cy.contains("Offre de test du management des offres de mentorat")
            .should("be.visible")
            .parent()
            .parent()
            .contains("Voir l'offre")
            .click();
        // cliquer sur le bouton Envoyer une demande
        cy.contains("Envoyer une demande").click();
        // écrire dans l'input Message et cliquer sur envoyer
        cy.get('textarea[name="message"]').type(
            "Message de test pour la demande de mentorat"
        );
        // get le bouton submit "Envoyer" et cliquer dessus
        cy.get('button[type="submit"]').click();
        // message :  de confirmation "Demande envoyée avec succès"
        cy.contains("Demande envoyée avec succès").should("be.visible");

        // Aller dans /mon-compte/suivi-demandes
        cy.visit("/mon-compte/suivi-demandes");
        // Vérifier que la demande est affichée
        cy.contains(
            "Vous avez demandé un contact avec Damien COTE pour l'offre Offre de test du management des offres de mentorat"
        ).should("be.visible");
    });

    it("should see the demand and accept it", () => {
        // se connecter avec un autre utilisateur
        cy.visit("/connexion");
        // Connexion de l'utilisateur avant chaque test
        cy.get('input[name="email"]').type("dcote@test.fr");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();
        cy.wait(2000);

        // Aller dans /mon-compte/suivi-offres
        cy.visit("/mon-compte/suivi-offres");
        // Vérifier que la demande est affichée
        cy.contains(
            "Vous avez reçu une demande de contact de Jean MOULIN pour l'offre Offre de test du management des offres de mentorat"
        )
            .should("be.visible")
            .parent()
            .parent()
            .parent()
            .contains("Accepter")
            .click();
        // cliquer sur le bouton Accepter la demande dans la modal, ce n'est pas un bouton submit, attention "Accepter la demande" existe aussi en test, il faut cliquer sur le bouton
        cy.get('button:contains("Accepter la demande")').click();

        //La demande de contact a été acceptée
        cy.contains(
            "Vous avez accepté la demande de contact de Jean MOULIN pour l'offre Offre de test du management des offres de mentorat"
        ).should("be.visible");
        // Cliquer sur le bouton Contacter Damien
        cy.contains("Contacter Jean").click();
        cy.wait(2000);
        // Dans le bloc de Conversations on doit avoir un lien contentant "Offre de test du management des offres de mentorat" et cliquer dessus
        cy.contains("Offre de test du management des offres de mentorat")
            .should("be.visible")
            .click();

        // Supprimer l'offre de mentorat
        cy.visit("/mon-compte/gerer-offres");
        // trouver l'offre à modifier, remonter à la ligne du tableau avec <tr> et chercher le bouton pour ouvrir les actions (3e colonne) puis cliquer sur le lien modifier l'offre
        cy.contains("Offre de test du management des offres de mentorat")
            .parent()
            .parent()
            .find("button.trigger-actions")
            .click();
        cy.contains("Supprimer l'offre").click();
        // cliquer sur le bouton de confirmation de suppression
        cy.get('button:contains("Valider")').click();
        // Vérifier que l'offre a été supprimée
        cy.contains("L'offre a bien été supprimée").should("be.visible");
    });
});
