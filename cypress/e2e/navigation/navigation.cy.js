describe("Navigation profil", () => {
    before(() => {
        cy.visit("/connexion");
        // Connexion de l'utilisateur avant chaque test
        cy.get('input[name="email"]').type("dcote@test.fr");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();
        cy.wait(2000);
    });

    it("should display the profile menu", () => {
        cy.get("button.profile-menu:visible").click();
        cy.wait(2000);
        cy.get(".profile-menu-content").should("be.visible");
    });
});
