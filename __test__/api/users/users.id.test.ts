/**
 * @jest-environment node
 */
import { GET } from "@/app/api/users/[id]/route"
import { matchers } from 'jest-json-schema';
import { schema } from "@/lib/utils";
import {describe, expect} from '@jest/globals'

interface Params {
    params: {
        id: string;
    }
}

expect.extend(matchers);

describe('/api/users/id', () => { //OK

  // GET ONE USER BY ID.
  it('should return data with status 200 and match schema and id to be 1 ', async () => {

    const requestObj = {} as any;

    const response = await GET(requestObj, {params:{id: "1"}} );
    const body = await response.json();  

    expect(response.status).toBe(200);
    expect(body[0]).toMatchObject(schema);
    expect(body.id).toBe(1);
  });
  
  it('should return error with status 404 when item not found', async () => {
    
    const requestObj = {} as any;

    const response = await GET(requestObj, {params:{id: "100000"}});
    const body = await response.json();

    expect(response.status).toBe(404);

  });

});

  