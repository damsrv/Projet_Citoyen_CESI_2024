/**
 * @jest-environment node
 */

import {testApiHandler} from "next-test-api-route-handler";
import * as MessageHandler from "@/app/api/messages/route";
import * as MessageIdHandler from "@/app/api/messages/[id]/route";
import {describe, expect, it} from "@jest/globals";
import {Session} from "next-auth"
import {matchers} from 'jest-json-schema';
import {getDefaultMockedSession} from "../../mocks/session";
import {Message} from "@prisma/client";
import {pusherClient, pusherServer} from "@/lib/pusher";

expect.extend(matchers)

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

describe('/api/messages', () => {
    let newMessageId = -1

    it('should return the new message posted', async () => {
        mockedSession = getDefaultMockedSession()

        const newTestMessage = {
            status: 1,
            senderId: 20,
            roomId: 6,
            content: "Message de test",
        }

        await testApiHandler({
            appHandler: MessageHandler,
            test: async ({fetch}) => {
                const response = await fetch({method: "POST", body: JSON.stringify({data: newTestMessage})});
                const json = await response.json() as Message
                expect(json).toMatchObject(newTestMessage);

                newMessageId = json.id
            },
        });
    })

    it('should modify the content of the message with id 7', async () => {
        mockedSession = getDefaultMockedSession()

        const newData = {content: "New Content"}

        await testApiHandler({
            appHandler: MessageIdHandler,
            params: {id: String(newMessageId)},
            test: async ({fetch}) => {
                const response = await fetch({method: "PUT", body: JSON.stringify({data: newData})});
                const modifiedMessage = await response.json() as Message
                expect(response.status).toBe(200);
                expect(modifiedMessage.content).toBe(newData.content);
            },
        });
    })

    it('should delete the message with id 1', async () => {
        mockedSession = getDefaultMockedSession()

        await testApiHandler({
            appHandler: MessageIdHandler,
            params: {id: String(newMessageId)},
            test: async ({fetch}) => {
                const response = await fetch({method: "DELETE"});
                const deletedMessage = await response.json() as Message
                expect(response.status).toBe(200);
                expect(deletedMessage.status).toBe(2);
            },
        });
    })

    afterAll(() => {
        pusherClient.disconnect();
    })
})