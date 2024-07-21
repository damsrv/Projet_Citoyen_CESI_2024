describe("User Authentication", () => {
    beforeEach(() => {
        cy.visit("/connexion"); // URL relative
    });

    it("should log in successfully with valid credentials", () => {
        cy.get('input[name="email"]').type("dcote@test.fr");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        // vérifier que l'utilisateur est connecté en vérifiant la présence du bouton avec la class profile-menu, attention ce bouton existe deux fois dans la page, une fois en mode mobile et une fois en mode desktop, au moins l'un des deux doit être visible
        cy.get(".profile-menu:visible").should("be.visible");
    });

    it("should show an error for incorrect password", () => {
        cy.get('input[name="email"]').type("dcote@test.fr");
        cy.get('input[name="password"]').type("password1542");
        cy.get('button[type="submit"]').click();

        // Vérifier le message d'erreur
        cy.contains("Identifiants incorrects").should("be.visible");
    });

    it("should show an error for non-existing email", () => {
        cy.get('input[name="email"]').type("non.existant@example.com");
        cy.get('input[name="password"]').type("Password123!");
        cy.get('button[type="submit"]').click();

        // Vérifier le message d'erreur
        cy.contains("Identifiants incorrects").should("be.visible");
    });

    it("should log out successfully", () => {
        cy.get('input[name="email"]').type("dcote@test.fr");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();

        // vérifier que l'utilisateur est connecté en vérifiant la présence du bouton avec la class profile-menu, attention ce bouton existe deux fois dans la page, une fois en mode mobile et une fois en mode desktop, au moins l'un des deux doit être visible
        cy.get("button.profile-menu:visible").click();
        cy.get(".profile-menu-content").should("be.visible");
        cy.contains("Déconnexion").click();

        // vérifier que l'utilisateur est déconnecté en vérifiant la présence du bouton de connexion
        cy.contains("Se connecter").should("be.visible");
    });
});
