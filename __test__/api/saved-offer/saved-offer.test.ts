/**
 * @jest-environment node
 */

import { testApiHandler } from "next-test-api-route-handler";
import { describe, expect, it } from "@jest/globals";
import { getDefaultMockedSession } from "../../mocks/session";
import * as SavedOfferHandler from "@/app/api/saved-offer/[id]/route";
import { Session } from "next-auth";

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

describe("/api/save-offer/[id]", () => {
    it("should return 404 if saved offer does not exist", async () => {
        mockedSession = {
            ...getDefaultMockedSession(),
            user: {
                id: 1,
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@example.com",
                roleId: 2,
                avatar: null,
                status: 1,
                description: "User description",
                birthdate: new Date("1992-01-01"),
                experiences: "Some experience",
                registerAt: new Date("2024-06-01T10:00:00.000Z"),
            },
        };

        await testApiHandler({
            appHandler: SavedOfferHandler,
            params: { id: "999999" }, // Non-existent saved offer ID
            test: async ({ fetch }) => {
                const response = await fetch({ method: "GET" });
                expect(response.status).toBe(404);

                const result = await response.json();
                expect(result.message).toBe(
                    "L'offre n'est pas un favoris utilisateur."
                );
            },
        });
    });

    it("should save an offer for the user", async () => {
        mockedSession = {
            ...getDefaultMockedSession(),
            user: {
                id: 9,
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@example.com",
                roleId: 2,
                avatar: null,
                status: 1,
                description: "User description",
                birthdate: new Date("1992-01-01"),
                experiences: "Some experience",
                registerAt: new Date("2024-06-01T10:00:00.000Z"),
            },
        };

        await testApiHandler({
            appHandler: SavedOfferHandler,
            params: { id: "5" }, // Offer ID to save
            test: async ({ fetch }) => {
                const response = await fetch({ method: "POST" });
                expect(response.status).toBe(201);

                const result = await response.json();
                expect(result).toHaveProperty("offerId", 5);
            },
        });
    });

    it("should return saved offer details if it exists", async () => {
        mockedSession = {
            ...getDefaultMockedSession(),
            user: {
                id: 9, // Valid user ID
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@example.com",
                roleId: 2,
                avatar: null,
                status: 1,
                description: "User description",
                birthdate: new Date("1992-01-01"),
                experiences: "Some experience",
                registerAt: new Date("2024-06-01T10:00:00.000Z"),
            },
        };

        await testApiHandler({
            appHandler: SavedOfferHandler,
            params: { id: "5" }, // Assuming saved offer ID 5 exists
            test: async ({ fetch }) => {
                const response = await fetch({ method: "GET" });
                expect(response.status).toBe(200);

                const result = await response.json();
                expect(result).toHaveProperty("offerId", 5);
            },
        });
    });

    it("should delete saved offer for the user", async () => {
        mockedSession = {
            ...getDefaultMockedSession(),
            user: {
                id: 9,
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@example.com",
                roleId: 2,
                avatar: null,
                status: 1,
                description: "User description",
                birthdate: new Date("1992-01-01"),
                experiences: "Some experience",
                registerAt: new Date("2024-06-01T10:00:00.000Z"),
            },
        };

        await testApiHandler({
            appHandler: SavedOfferHandler,
            params: { id: "5" }, // Assuming saved offer ID 5 exists
            test: async ({ fetch }) => {
                const response = await fetch({ method: "DELETE" });
                expect(response.status).toBe(200);
            },
        });
    });

    it("should return 404 if saved offer does not exist for deletion", async () => {
        mockedSession = {
            ...getDefaultMockedSession(),
            user: {
                id: 1,
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@example.com",
                roleId: 2,
                avatar: null,
                status: 1,
                description: "User description",
                birthdate: new Date("1992-01-01"),
                experiences: "Some experience",
                registerAt: new Date("2024-06-01T10:00:00.000Z"),
            },
        };

        await testApiHandler({
            appHandler: SavedOfferHandler,
            params: { id: "999999" }, // Non-existent saved offer ID
            test: async ({ fetch }) => {
                const response = await fetch({ method: "DELETE" });
                expect(response.status).toBe(404);

                const result = await response.json();
                expect(result.message).toBe(
                    "L'offre n'est pas un favoris utilisateur."
                );
            },
        });
    });
});
