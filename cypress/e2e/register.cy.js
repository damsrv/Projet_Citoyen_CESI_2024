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
});
