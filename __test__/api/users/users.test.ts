/**
 * @jest-environment node
 */

import { GET, POST } from "@/app/api/users/route"

import {expect} from "@jest/globals";
import { matchers } from 'jest-json-schema';
import { schema } from "@/lib/utils";

expect.extend(matchers);

describe('/api/users', () => { //OK 

  // GET ALL USERS
  test('returns a list of users with status 200', async () => {

    const response = await GET();
    expect(response.status).toBe(200)

    const body = await response.json();

    expect(body.length).toBeGreaterThanOrEqual(0);

    if(body.length > 0) {
      expect(body[0]).toMatchObject(schema);
    }

  });

  // POST USER
  test('return a newly created user with status 201', async () => {

    const user = {
      id:5000,
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

    const requestObj = {
      json: async () => ({data: user}),
    } as any;

    const response = await POST(requestObj);
    const newUser = await response!.json(); 
    
    console.log(response);
    
    
    expect(response!.status).toBe(201);
    
   });
  
  
});





