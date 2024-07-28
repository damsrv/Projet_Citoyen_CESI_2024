import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportHeight: 900, // Hauteur de la fenêtre du navigateur
    viewportWidth: 1600, // Largeur de la fenêtre du navigateur
    chromeWebSecurity: false, // Désactiver la sécurité Web de Chrome
    defaultCommandTimeout: 10000, // Délais d'attente par défaut augmentés
    requestTimeout: 10000, // Délais d'attente pour les requêtes augmentés
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
