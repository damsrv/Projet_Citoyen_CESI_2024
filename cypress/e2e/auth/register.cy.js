describe("User Registration", () => {
    beforeEach(() => {
        cy.visit("/inscription"); // URL relative
    });

    it("should register a new user successfully", () => {
        cy.get('input[name="firstname"]').type("John");
        cy.get('input[name="lastname"]').type("Doe");
        cy.get('input[name="email"]').type("john.doe@example.com");
        cy.get('input[name="password"]').type("Password123!");
        cy.get('input[name="passwordConfirm"]').type("Password123!");
        cy.get('button[type="submit"]').click();

        // Vérifier que l'utilisateur est redirigé vers la page de connexion après l'inscription réussie
        cy.url().should("include", "/connexion");
        cy.contains("Connexion").should("be.visible");
    });

    it("should show an error for already registered email", () => {
        cy.get('input[name="firstname"]').type("John");
        cy.get('input[name="lastname"]').type("Doe");
        cy.get('input[name="email"]').type("john.doe@example.com"); // Email déjà utilisé
        cy.get('input[name="password"]').type("Password123!");
        cy.get('input[name="passwordConfirm"]').type("Password123!");
        cy.get('button[type="submit"]').click();

        // Vérifier le message d'erreur
        cy.contains("Utilisateur déjà existant").should("be.visible");
    });

    it("should show an error for non-matching passwords", () => {
        cy.get('input[name="firstname"]').type("Jim");
        cy.get('input[name="lastname"]').type("Beam");
        cy.get('input[name="email"]').type("jim.beam@example.com");
        cy.get('input[name="password"]').type("Password123!");
        cy.get('input[name="passwordConfirm"]').type("DifferentPassword123!");
        cy.get('button[type="submit"]').click();

        // Vérifier le message d'erreur
        cy.contains("Les mots de passe ne correspondent pas.").should(
            "be.visible"
        );
    });

    // modifier mot de passe
    it("should change password successfully", () => {
        cy.visit("/connexion");
        cy.get('input[name="email"]').type("john.doe@example.com");
        cy.get('input[name="password"]').type("Password123!");
        cy.get('button[type="submit"]').click();

        cy.get("button.profile-menu:visible").click();
        cy.contains("Gérer mon compte").click();

        cy.get('input[name="oldPassword"]').type("Password123!");
        cy.get('input[name="newPassword"]').type("NewPassword123!");
        cy.get('input[name="newPasswordConfirm"]').type("NewPassword123!");
        cy.get('button:contains("Enregistrer")').click();

        cy.contains("Votre mot de passe a bien été modifié.").should(
            "be.visible"
        );

        cy.get("button.profile-menu:visible").click();
        cy.contains("Déconnexion").click();

        cy.contains("Se connecter").click();

        cy.get('input[name="email"]').type("john.doe@example.com");
        cy.get('input[name="password"]').type("NewPassword123!");
        cy.get('button[type="submit"]').click();

        cy.get("button.profile-menu:visible").click();
        cy.contains("Déconnexion").should("be.visible");
    });

    // modifier email
    it("should change email successfully", () => {
        cy.visit("/connexion");
        cy.get('input[name="email"]').type("john.doe@example.com");
        cy.get('input[name="password"]').type("NewPassword123!");
        cy.get('button[type="submit"]').click();

        cy.get("button.profile-menu:visible").click();
        cy.contains("Gérer mon compte").click();

        cy.contains("Modifier l'email")
            .should("be.visible")
            .parent()
            .get('button:contains("Modifier")')
            .click();

        cy.get('input[name="email"]').type("john.doe@other.com");
        cy.get('input[name="currentPassword"]').type("NewPassword123!");
        cy.get('button:contains("Modifier l\'email")').click();

        //l'url doit être la page de connexion
        cy.url().should("include", "/connexion");
        cy.contains("Email modifié").should("be.visible");

        // essayer de se connecter avec l'ancien email
        cy.get('input[name="email"]').type("john.doe@example.com");
        cy.get('input[name="password"]').type("NewPassword123!");
        cy.get('button[type="submit"]').click();

        cy.contains("Identifiants incorrects").should("be.visible");

        // essayer de se connecter avec le nouvel email
        cy.get('input[name="email"]').type("john.doe@other.com");
        cy.get('input[name="password"]').type("NewPassword123!");
        cy.get('button[type="submit"]').click();

        cy.get("button.profile-menu:visible").click();
        cy.contains("Déconnexion").should("be.visible");
    });

    // supprimer compte
    it("should delete account successfully", () => {
        cy.visit("/connexion");
        cy.get('input[name="email"]').type("john.doe@other.com");
        cy.get('input[name="password"]').type("NewPassword123!");
        cy.get('button[type="submit"]').click();

        cy.get("button.profile-menu:visible").click();
        cy.contains("Gérer mon compte").click();
        cy.contains("Supprimer mon compte").click();

        cy.get('input[name="currentPassword"]').type("NewPassword123!");
        cy.get(
            'button:contains("Supprimer définitivement mon compte")'
        ).click();

        cy.contains("Se connecter").should("be.visible");
    });
});
