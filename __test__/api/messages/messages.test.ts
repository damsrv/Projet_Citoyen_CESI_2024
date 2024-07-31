/**
 * @jest-environment node
 */

import { testApiHandler } from "next-test-api-route-handler";
import * as MessageHandler from "@/app/api/messages/route";
import * as MessageIdHandler from "@/app/api/messages/[id]/route";
import { describe, expect, it } from "@jest/globals";
import { Session } from "next-auth";
import { matchers } from "jest-json-schema";
import { getDefaultMockedSession } from "../../mocks/session";
import { Message } from "@prisma/client";
import { pusherClient, pusherServer } from "@/lib/pusher";

expect.extend(matchers);

let mockedSession: Session | null = null;

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

describe("/api/messages", () => {
    let newMessageId = -1;

    it("should return the new message posted", async () => {
        mockedSession = {
            ...getDefaultMockedSession(),
            user: {
                id: 19,
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
        const newTestMessage = {
            status: 1,
            senderId: 19,
            roomId: 6,
            content: "Message de test",
        };

        await testApiHandler({
            appHandler: MessageHandler,
            test: async ({ fetch }) => {
                const response = await fetch({
                    method: "POST",
                    body: JSON.stringify({ data: newTestMessage }),
                });
                const json = (await response.json()) as Message;
                expect(json).toMatchObject(newTestMessage);

                newMessageId = json.id;
            },
        });
    });

    it("should modify the content of the message with id 7", async () => {
        mockedSession = {
            ...getDefaultMockedSession(),
            user: {
                id: 19,
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

        const newData = { content: "New Content" };

        await testApiHandler({
            appHandler: MessageIdHandler,
            params: { id: "7" },
            test: async ({ fetch }) => {
                const response = await fetch({
                    method: "PUT",
                    body: JSON.stringify({ data: newData }),
                });
                const modifiedMessage = (await response.json()) as Message;
                expect(response.status).toBe(200);
                expect(modifiedMessage.content).toBe(newData.content);
            },
        });
    });

    it("should delete the message with id 8", async () => {
        mockedSession = {
            ...getDefaultMockedSession(),
            user: {
                id: 19,
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
            appHandler: MessageIdHandler,
            params: { id: "8" },
            test: async ({ fetch }) => {
                const response = await fetch({ method: "DELETE" });
                const deletedMessage = (await response.json()) as Message;
                expect(response.status).toBe(200);
                expect(deletedMessage.status).toBe(2);
            },
        });
    });

    afterAll(() => {
        pusherClient.disconnect();
    });
});
