/**
 * @jest-environment node
 */

import { testApiHandler } from "next-test-api-route-handler";
import { describe, expect, it } from "@jest/globals";
import { getDefaultMockedSession } from "../../mocks/session";
import * as OffersHandler from "@/app/api/offers/route";
import * as OffersIdHandler from "@/app/api/offers/[id]/route";
import { matchers } from "jest-json-schema";
import { Session } from "next-auth";

expect.extend(matchers);

jest.mock("@/lib/authOptions", () => ({
    authOptions: {
        adapter: {},
        providers: [],
        callbacks: {},
    },
}));

// This mocks calls to getServerSession
jest.mock("next-auth/next", () => ({
    getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));

let mockedSession: Session | null = null;

describe("/api/offers", () => {
    it("should get all the offers", async () => {
        mockedSession = getDefaultMockedSession();

        await testApiHandler({
            appHandler: OffersHandler,
            test: async ({ fetch }) => {
                const response = await fetch({ method: "GET" });
                expect(response.status).toBe(200);

                const result = await response.json();
                expect(result.length).toBeGreaterThanOrEqual(0);
                result.forEach((offer: any) => {
                    expect(offer).toHaveProperty("id");
                    expect(offer).toHaveProperty("title");
                    expect(offer).toHaveProperty("content");
                    // Add more assertions based on the structure of the returned offer object
                });
            },
        });
    });

    it("should create a new offer", async () => {
        mockedSession = getDefaultMockedSession();

        const newOfferData = {
            mentorId: 20, // Use a valid mentor ID from seed data
            title: "New Offer",
            content: "Offer description",
            location: "Paris",
            status: 1,
            categoryId: 7, // Assuming 'Développement web' category
        };

        await testApiHandler({
            appHandler: OffersHandler,
            test: async ({ fetch }) => {
                const response = await fetch({
                    method: "POST",
                    body: JSON.stringify({ data: newOfferData }),
                });
                expect(response.status).toBe(201);

                const result = await response.json();
                expect(result).toHaveProperty("title", "New Offer");
                expect(result).toHaveProperty("content", "Offer description");
                expect(result).toHaveProperty("location", "Paris");
                expect(result).toHaveProperty("status", 1);
            },
        });
    });

    it("should return 401 if user is not authorized to create an offer", async () => {
        mockedSession = {
            ...getDefaultMockedSession(),
            user: {
                id: 21, // ID de l'utilisateur
                firstname: "John", // Prénom de l'utilisateur
                lastname: "Doe", // Nom de l'utilisateur
                email: "john.doe@example.com", // Email de l'utilisateur
                roleId: 2, // Role de l'utilisateur (USER dans ce cas)
                avatar: null, // Avatar de l'utilisateur (null si non défini)
                status: 1, // Statut de l'utilisateur (1 pour actif, par exemple)
                description: "Sample user description", // Description de l'utilisateur
                birthdate: new Date("1990-01-01"), // Date de naissance de l'utilisateur
                experiences: "Sample experiences", // Expériences de l'utilisateur
                registerAt: new Date("2024-05-23T11:44:09.735Z"), // Date d'enregistrement
            },
        }; // Assuming roleId 2 is not authorized

        const newOfferData = {
            mentorId: 22, // Use a different mentor ID
            title: "Unauthorized Offer",
            content: "Offer description",
            location: "Paris",
            status: 1,
            categoryId: 7,
        };

        await testApiHandler({
            appHandler: OffersHandler,
            test: async ({ fetch }) => {
                const response = await fetch({
                    method: "POST",
                    body: JSON.stringify({ data: newOfferData }),
                });
                expect(response.status).toBe(401);
            },
        });
    });
});

describe("/api/offers/[id]", () => {
    it("should return the offer details", async () => {
        mockedSession = getDefaultMockedSession();

        await testApiHandler({
            appHandler: OffersIdHandler,
            params: { id: "5" }, // Assuming offer ID 5 exists
            test: async ({ fetch }) => {
                const response = await fetch({ method: "GET" });
                expect(response.status).toBe(200);

                const result = await response.json();
                expect(result).toHaveProperty("id", 5);
                // Add more assertions based on the structure of the returned offer object
            },
        });
    });

    it("should return 404 if offer is not found", async () => {
        mockedSession = getDefaultMockedSession();

        await testApiHandler({
            appHandler: OffersIdHandler, // Le module complet contenant les handlers
            params: { id: "999999" }, // Les paramètres doivent être définis ici
            test: async ({ fetch }) => {
                const response = await fetch({ method: "GET" });
                expect(response.status).toBe(404);
            },
        });
    });

    it("should update an existing offer", async () => {
        mockedSession = getDefaultMockedSession();

        const updatedOfferData = {
            title: "Updated Offer Title",
            content: "Updated description",
            location: "Lyon",
            status: 2,
        };

        await testApiHandler({
            appHandler: OffersIdHandler, // Le module complet contenant les handlers
            params: { id: "5" }, // Paramètre id pour spécifier l'offre
            test: async ({ fetch }) => {
                const response = await fetch({
                    method: "PUT",
                    body: JSON.stringify({ data: updatedOfferData }),
                });
                expect(response.status).toBe(201);

                const result = await response.json();
                expect(result).toHaveProperty("title", "Updated Offer Title");
                expect(result).toHaveProperty("content", "Updated description");
                expect(result).toHaveProperty("location", "Lyon");
                expect(result).toHaveProperty("status", 2);
            },
        });
    });

    it("should return 401 if user is not authorized to update the offer", async () => {
        mockedSession = {
            ...getDefaultMockedSession(),
            user: {
                id: 2, // Identifiant de l'utilisateur
                firstname: "Jane", // Prénom de l'utilisateur
                lastname: "Doe", // Nom de l'utilisateur
                email: "jane.doe@example.com", // Email de l'utilisateur
                roleId: 2, // Role de l'utilisateur (USER dans ce cas)
                avatar: null, // Avatar de l'utilisateur (null si non défini)
                status: 1, // Statut de l'utilisateur (1 pour actif)
                description: "User description", // Description de l'utilisateur
                birthdate: new Date("1992-05-12"), // Date de naissance
                experiences: "Some experience", // Expériences de l'utilisateur
                registerAt: new Date("2024-06-01T10:00:00.000Z"), // Date d'enregistrement
            },
        };

        const updatedOfferData = {
            title: "Unauthorized Update",
            content: "Unauthorized description",
            location: "Paris",
            status: 1,
        };

        await testApiHandler({
            appHandler: OffersIdHandler, // Module complet avec les handlers
            params: { id: "5" }, // Spécifie l'offre à mettre à jour
            test: async ({ fetch }) => {
                const response = await fetch({
                    method: "PUT",
                    body: JSON.stringify({ data: updatedOfferData }),
                });
                expect(response.status).toBe(401); // Attendu pour un utilisateur non autorisé
            },
        });
    });

    it("should delete an existing offer", async () => {
        mockedSession = getDefaultMockedSession();

        await testApiHandler({
            appHandler: OffersIdHandler, // Module complet avec les handlers
            params: { id: "5" }, // Spécifie l'offre à supprimer
            test: async ({ fetch }) => {
                const response = await fetch({ method: "DELETE" });
                console.log(response);
                expect(response.status).toBe(200); // Vérifie que la suppression est réussie
            },
        });
    });

    it("should return 401 if user is not authorized to delete the offer", async () => {
        mockedSession = {
            ...getDefaultMockedSession(),
            user: {
                id: 3, // ID de l'utilisateur simulé
                firstname: "Unauthorized",
                lastname: "User",
                email: "unauthorized@example.com",
                roleId: 2, // Rôle non administrateur
                avatar: null,
                status: 1,
                description: "Description",
                birthdate: new Date("1992-01-01"),
                experiences: "Some experience",
                registerAt: new Date("2024-06-01T10:00:00.000Z"),
            },
        };

        await testApiHandler({
            appHandler: OffersIdHandler, // Module complet avec les handlers
            params: { id: "6" }, // Spécifie l'offre à supprimer
            test: async ({ fetch }) => {
                const response = await fetch({ method: "DELETE" });
                expect(response.status).toBe(401); // Vérifie que l'utilisateur n'est pas autorisé
            },
        });
    });

    it("should return 404 if offer is not found for deletion", async () => {
        mockedSession = getDefaultMockedSession();

        await testApiHandler({
            appHandler: OffersIdHandler, // Module complet avec les handlers
            params: { id: "999999" }, // ID d'une offre non existante
            test: async ({ fetch }) => {
                const response = await fetch({ method: "DELETE" });
                expect(response.status).toBe(404); // Vérifie que l'offre n'existe pas
            },
        });
    });
});
