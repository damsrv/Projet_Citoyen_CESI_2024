/**
 * @jest-environment node
 */

import { testApiHandler } from "next-test-api-route-handler";
import { describe, expect, it } from "@jest/globals";
import { getDefaultMockedSession } from "../../mocks/session";
import * as RoomHandler from "@/app/api/rooms/[id]/route";
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

describe("/api/rooms/[id]", () => {
    it("should return room details with messages", async () => {
        mockedSession = getDefaultMockedSession();

        await testApiHandler({
            appHandler: RoomHandler,
            params: { id: "6" }, // Assuming room ID 6 exists
            test: async ({ fetch }) => {
                const response = await fetch({ method: "GET" });
                expect(response.status).toBe(200);

                const result = await response.json();
                expect(result).toHaveProperty("id", 6);
                expect(result).toHaveProperty("userRooms");
                expect(result).toHaveProperty("messages");
            },
        });
    });

    it("should return 404 if room does not exist", async () => {
        mockedSession = getDefaultMockedSession();

        await testApiHandler({
            appHandler: RoomHandler,
            params: { id: "999999" }, // Non-existent room ID
            test: async ({ fetch }) => {
                const response = await fetch({ method: "GET" });
                expect(response.status).toBe(404);

                const result = await response.json();
                expect(result.message).toBe("La room n'existe pas.");
            },
        });
    });

    it("should delete an existing room", async () => {
        mockedSession = getDefaultMockedSession();

        await testApiHandler({
            appHandler: RoomHandler,
            params: { id: "7" }, // Assuming room ID 6 exists
            test: async ({ fetch }) => {
                const response = await fetch({ method: "DELETE" });
                expect(response.status).toBe(200);
            },
        });
    });

    it("should return 404 if room does not exist for deletion", async () => {
        mockedSession = getDefaultMockedSession();

        await testApiHandler({
            appHandler: RoomHandler,
            params: { id: "999999" }, // Non-existent room ID
            test: async ({ fetch }) => {
                const response = await fetch({ method: "DELETE" });
                expect(response.status).toBe(404);

                const result = await response.json();
                expect(result.message).toBe("La Room n'existe pas.");
            },
        });
    });
});
