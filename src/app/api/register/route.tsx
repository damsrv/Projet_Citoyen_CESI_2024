import prisma from "@/lib/prisma";
import {Prisma, User} from "@prisma/client";
import {NextResponse} from "next/server";
import * as bcrypt from 'bcrypt';
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;


export async function POST(req: Request) {
    const user: User = await req.json();

    try {
        // hashage password user
        const pass = user.password;
        user.password = await bcrypt.hash(pass!, 10);

        const newUser = await prisma.user.create({
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                birthdate: user.birthdate ? new Date(user.birthdate) : new Date(Date.now()),
                status: 1,
                roleId: 2,
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