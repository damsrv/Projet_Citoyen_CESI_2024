import { NextResponse } from 'next/server';
import userListMock from '../../../mock/mock-data'
import { exclude } from "../../../../src/lib/utils";
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { prismaMock } from '../../../../singleton';
import prisma from "../../../../src/lib/prisma";
import { createUser } from '../../../mock/functions-without-context';

// GET ALL USER BY ID UNIT TEST
export async function GET() {

    try {

        // on apppelle prisma pour GET ALL USERS
        const userList = userListMock;        

        // on exclut les passwords
        const usersWithoutPassword =  userListMock.map((user)=>{
            return exclude(user, ['password']);
        })

        return NextResponse.json(userList, { status: 200 });

    } catch (e) {
        console.log(e);

        return NextResponse.json({
            error: e,
            message: "Une erreur est survenue, veuillez réessayer plus tard."
        }, { status: 500 });
    }
}

export async function POST(req: Request) { //OK

    const { data } = await req.json();
    const newUser: User = data;

    try {

        // hasher password
        const pass = newUser.password;
        
        newUser.password = await bcrypt.hash(pass!, 10);

        // Si ca passe ici c'est que Prisma est OK
        prismaMock.user.create.mockResolvedValue(newUser);

        return NextResponse.json(newUser, { status: 201 });

    } catch (e) {

        console.log(e);

        return NextResponse.json({
            error: e,
            message: "Une erreur est survenue, veuillez réessayer plus tard."
        }, { status: 500 });
    }
}

