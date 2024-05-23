import prisma from "@/lib/prisma";
import {Prisma, Users} from "@prisma/client";
import {NextResponse} from "next/server";
import * as bcrypt from 'bcrypt';
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;


export async function POST(req: Request) {
    const user: Users = await req.json();

    try {
        // hashage password user
        const pass = user.password;
        user.password = await bcrypt.hash(pass!, 10);

        const newUser = await prisma.users.create({
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                birthdate: user.birthdate ? new Date(user.birthdate) : new Date(Date.now()),
                is_active: true,
            }
        });

        return NextResponse.json(newUser, {status: 201});
    } catch (e) {
        console.log(e);

        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return NextResponse.json({error: e, message: "Utilisateur déjà existant"}, {status: 404});
            }
        } else {
            return NextResponse.json({
                error: e,
                message: "Une erreur est survenue, veuillez réessayer plus tard."
            }, {status: 500});
        }

    }
}