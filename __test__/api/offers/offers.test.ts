/**
 * @jest-environment node
 */

import {testApiHandler} from "next-test-api-route-handler";
import {describe, expect, it} from "@jest/globals";
import {getDefaultMockedSession} from "../../mocks/session";
import * as AppHandler from "@/app/api/offers/route";
import {matchers} from "jest-json-schema";
import {Session} from "next-auth";

expect.extend(matchers)


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

let mockedSession: Session | null = null

describe('/api/offers', () => {
    it('should get all the offers', async () => {
        mockedSession = getDefaultMockedSession()

        await testApiHandler({
            appHandler: AppHandler,
            test: async ({fetch}) => {
                const response = await fetch({method: "GET"});
                expect(response.status).toBe(200);
            },
        });
    })
})

