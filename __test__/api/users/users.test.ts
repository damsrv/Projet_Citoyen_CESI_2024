/**
 * @jest-environment node
 */

import {testApiHandler} from "next-test-api-route-handler";
import {describe, expect, it} from "@jest/globals";
import {getDefaultMockedSession} from "../../mocks/session";
import * as UsersHandler from "@/app/api/users/route";
import * as UsersIdHandler from "@/app/api/users/[id]/route";
import {matchers} from "jest-json-schema";
import {Session} from "next-auth";
import {User} from "@prisma/client";
import {GET} from "@/app/api/users/[id]/route";
import {schema} from "@/lib/utils";

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

describe('/api/users', () => {
    let createdUserData: User
    it('should get all the users', async () => {
        mockedSession = getDefaultMockedSession()

        await testApiHandler({
            appHandler: UsersHandler,
            test: async ({fetch}) => {
                const response = await fetch({method: "GET"});
                expect(response.status).toBe(200);

                const result = await response.json()
                expect(result.length).toBeGreaterThanOrEqual(0);
            },
        });
    })

    it('should create a user', async () => {
        mockedSession = getDefaultMockedSession()

        const newUserData = {
            firstname: "Damien",
            lastname: "COTE",
            email: "dcote76@test.fr",
            password: "password",
            avatar: null,
            status: 1,
            description: "blablabla",
            birthdate: '1990-11-08T00:00:00.000Z',
            experiences: null,
            roleId: 1,
            registerAt: '2024-05-24T09:47:19.265Z'
        }

        await testApiHandler({
            appHandler: UsersHandler,
            test: async ({fetch}) => {
                const response = await fetch({method: "POST", body: JSON.stringify({data: newUserData})});
                expect(response.status).toBe(201);

                const {password, ...expectedResponseData} = newUserData

                const result = await response.json() as User;

                createdUserData = structuredClone(result);

                expect(result).toMatchObject(expectedResponseData);
            },
        });
    })

    it('should return the created user infos', async () => {
        mockedSession = getDefaultMockedSession()

        await testApiHandler({
            appHandler: UsersIdHandler,
            params: {
                id: String(createdUserData.id)
            },
            test: async ({fetch}) => {
                const response = await fetch({method: "GET"});
                expect(response.status).toBe(200);

                const result = await response.json()

                expect(result).toMatchObject(createdUserData);
            },
        });
    });

    it('should return 404 when item not found', async () => {
        mockedSession = getDefaultMockedSession()

        await testApiHandler({
            appHandler: UsersIdHandler,
            params: {
                id: "999999"
            },
            test: async ({fetch}) => {
                const response = await fetch({method: "GET"});
                expect(response.status).toBe(404);
            },
        });

    });
})





