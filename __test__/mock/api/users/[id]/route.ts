import { NextResponse } from 'next/server';
import userListMock from '../../../../mock/mock-data'
import { exclude } from "../../../../../src/lib/utils";
import { User } from '@prisma/client';

interface Params {
    params: {
        id: string;
    }
}

// GET BY ID UNIT TEST
export async function GET(req: Request, params: Params) {

    const userId = parseInt(params.params.id);

    try {

        console.log("userId", userId);
        
        // on apppelle prisma pour GET ALL USERS (FAKER)
        const user: User | undefined = userListMock.find(user => user.id === userId)

        console.log(user);
        if (user == undefined) {
            throw new Error;
        }

        // on exclut le password
        const userWithoutPassword = exclude(user, ['password']);

        return NextResponse.json(userWithoutPassword, { status: 200 });

    } catch (e) {
        console.log(e);

        if (e instanceof Error) {
            return NextResponse.json({ error: e, message: "Le User n'existe pas." }, { status: 404 });
        } else {
            return NextResponse.json({
                error: e,
                message: "Une erreur est survenue, veuillez réessayer plus tard."
            }, { status: 500 });
        }
    }
}
