/**
 * @jest-environment node
 */

import { GET, POST } from "../mock/api/users/route"
import { matchers } from 'jest-json-schema';
expect.extend(matchers);
import { schema } from "../../src/lib/utils";
import * as bcrypt from 'bcrypt';
import { prismaMock } from '../../singleton';
import { createUser } from '../mock/functions-without-context';
import prisma from "../../src/lib/prisma";



describe('/api/users', () => { //OK 

  // GET ALL USERS
  test('returns a list of users with status 200', async () => {

    const response = await GET();
    const body = await response.json();
    
    expect(response.status).toBe(200)
    expect(body[0]).toMatchSchema(schema);
  });

  // POST USER
  // NOK ne fonctionne pas.
  test('return a newly created user with status 201', async () => {

    const user = {
      id: 1,
      firstname: "Damien",
      lastname: "COTE",
      email: "dcote12@test.fr",
      password: "password",
      avatar: null,
      status: 1,
      description: "blablabla",
      birthdate: new Date("1990-11-08T00:00:00.000Z"),
      experiences: null,
      roleId: 1,
      registerAt: new Date("2024-05-24T09:47:19.265Z")
    }

    const requestObj = {
      json: async () => ({data: user}),
    } as any;

    const response = await POST(requestObj);
    const newUser = await response.json();   
    
    expect(response.status).toBe(201);

    await expect(createUser(newUser)).resolves.toEqual({
      id: 1,
      firstname: "Damien",
      lastname: "COTE",
      email: "dcote12@test.fr",
      password: newUser.password,
      avatar: null,
      status: 1,
      description: "blablabla",
      birthdate: new Date("1990-11-08T00:00:00.000Z"),
      experiences: null,
      roleId: 1,
      registerAt: new Date("2024-05-24T09:47:19.265Z")
    })

   });
  
  
});





