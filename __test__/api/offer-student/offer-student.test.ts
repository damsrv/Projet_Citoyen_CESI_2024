/**
 * @jest-environment node
 */

import {testApiHandler} from "next-test-api-route-handler";
import {describe, expect, it} from "@jest/globals";
import {getDefaultMockedSession} from "../../mocks/session";
import * as OfferStudentHandler from "@/app/api/offer-student/route";
import * as OfferStudentIdHandler from "@/app/api/offer-student/[...id]/route";
import {matchers} from "jest-json-schema";
import {Message, OfferStudent} from "@prisma/client";
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

const USER_ID = 20
const MENTOR_ID = 11
const OFFER_ID = 6

describe('POST /api/offer-student', () => {
    let offerStudentData = {
        offerId: -1,
        studentId: -1,
    };

    it('should create an offer student between ', async () => {
        mockedSession = getDefaultMockedSession()

        const newOfferStudentData = {
            offerId: OFFER_ID,
            userId: USER_ID,
            message: "Nouveau message d'offre"
        }

        await testApiHandler({
            appHandler: OfferStudentHandler,
            test: async ({fetch}) => {
                const response = await fetch({method: "POST", body: JSON.stringify({data: newOfferStudentData})});
                expect(response.status).toBe(201);

                const result = await response.json() as OfferStudent;
                offerStudentData = {
                    offerId: result.offerId,
                    studentId: result.studentId,
                };
            },
        });
    })

    it('should modify the status of the offer', async () => {
        mockedSession = getDefaultMockedSession()

        const newOfferStudentData = {
            status: 2
        }

        await testApiHandler({
            appHandler: OfferStudentIdHandler,
            params: {
                id: [String(USER_ID), String(MENTOR_ID), String(OFFER_ID)],
            },
            test: async ({fetch}) => {
                const response = await fetch({method: "PUT", body: JSON.stringify({data: newOfferStudentData})});
                expect(response.status).toBe(201);
            },
        });
    })
})

