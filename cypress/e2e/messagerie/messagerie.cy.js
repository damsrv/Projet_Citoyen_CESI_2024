let randomMessage = "";
for (let i = 0; i < 50; i++) {
    randomMessage += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

describe("Messagerie", () => {
    beforeEach(() => {
        cy.visit("/connexion");
        cy.wait(500);
        // Connexion de l'utilisateur avant chaque test
        cy.get('input[name="email"]').type("j-moulin@test.fr");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();
        cy.wait(2000);
    });

    it("should access the messaging page", () => {
        cy.get('a:contains("Messagerie")').click();
        cy.url().should("include", "/messagerie");
    });

    it("should access the messaging page of a conversation", () => {
        cy.get('a:contains("Messagerie")').click();
        cy.url().should("include", "/messagerie");
        cy.contains("Apprendre la couture").click();
        cy.url().should("include", "/messagerie/7");
    });

    it("should send a message", () => {
        cy.get('a:contains("Messagerie")').click();
        cy.url().should("include", "/messagerie");
        cy.contains("Apprendre la couture").click();
        cy.url().should("include", "/messagerie/7");

        // générer un message de 50 caractères aléatoires de long avec des espaces

        cy.get('input[name="message"]').type(randomMessage);
        cy.contains("Envoyer").click();
        cy.wait(2000);

        cy.contains(randomMessage).should("be.visible");
    });

    it("should see the message when it's other user", () => {
        cy.visit("/connexion");
        cy.wait(500);
        // Connexion de l'utilisateur avant chaque test
        cy.get('input[name="email"]').type("jcvd@test.fr");
        cy.get('input[name="password"]').type("password");
        cy.get('button[type="submit"]').click();
        cy.wait(2000);

        cy.visit("/messagerie/7");
        cy.url().should("include", "/messagerie/7");
        cy.wait(2000);

        cy.contains(randomMessage).should("be.visible");
    });
});
