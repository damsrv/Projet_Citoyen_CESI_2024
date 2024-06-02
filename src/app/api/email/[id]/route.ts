import prisma from "@/lib/prisma";
import { Offer, User } from "@prisma/client";
import { PrismaClient, Prisma } from '@prisma/client'
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

interface Params {
    params: {
        id: string;
    }
}

export async function PUT(req: Request, params: Params) { 

    const { data } = await req.json();
    const userId = parseInt(params.params.id);

    const { email, currentPassword} =  data;

    try {
        // récup ancien password en base.
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
            select: { password: true },
        });

        const storedPassword = user.password;
        
        // compare ancien et celui en base.
        if (await bcrypt.compare(currentPassword, storedPassword)) {
            // Si le mot de passe est correct, on met à jour l'email en base.
            await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                email,
            },
            });
        } else {
            return NextResponse.json({ message: "Le mot de passe n'est pas correct." }, { status: 400 });
        }
            

        // TODO : envoyer mail à l'ancien mail pour confirmer le changement et à l'utilisateur pour confirmer le changement.

        return NextResponse.json({ status: 201 });

    } catch (e) {

        console.log(e);

        if (e instanceof PrismaClientValidationError) {
            return NextResponse.json({ error: e, message: "Erreur de validation prisma" }, { status: 404 });
        } else {
            return NextResponse.json({
                error: e,
                message: "Une erreur est survenue, veuillez réessayer plus tard."
            }, { status: 500 });
        }
    }
}
