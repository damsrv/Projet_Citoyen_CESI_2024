import prisma from "@/lib/prisma";
import { Offer, User } from "@prisma/client";
import { PrismaClient, Prisma } from '@prisma/client'
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';
import { OfferStatus } from '../../../enums/offerStatus'
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Key } from "react";
import { exclude } from "@/lib/utils";

export async function GET() { //OK

    try {

        const users = await prisma.user.findMany();

        // on exclut les passwords
        const usersWithoutPassword =  users.map((user)=>{
           return exclude(user, ['password']);
        })

        return NextResponse.json(usersWithoutPassword, { status: 200 });

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
    const user: User = data;

    try {

        // hasher password
        const pass = user.password;
        user.password = await bcrypt.hash(pass!, 10);

        const newUser = await prisma.user.create({
            data: user
        });

        const newUserWithoutPassword = exclude(newUser, ['password']);

        return NextResponse.json(newUserWithoutPassword, { status: 201 }); // omit password

    } catch (e) {

        console.log(e);

        if (e instanceof PrismaClientValidationError) {

            return NextResponse.json({ error: e, message: "Erreur de validation prisma" }, { status: 404 });

        } else if (e instanceof PrismaClientKnownRequestError) {

            if (e.code === "P2002") return NextResponse.json({ error: e, message: "Utilisateur déjà existant" }, { status: 404 });

        } else {

            return NextResponse.json({
                error: e,
                message: "Une erreur est survenue, veuillez réessayer plus tard."
            }, { status: 500 });

        }

    }

}