import prisma from "@/lib/prisma";
import { Offer, User } from "@prisma/client";
import { PrismaClient, Prisma } from '@prisma/client'
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { isUserOrAdmin } from "@/services/check-authorization";

interface Params {
    params: {
        id: string;
    }
}
export async function DELETE(req: Request, params: Params) { //OK

    const { data } = await req.json();
    const userId = parseInt(params.params.id);

    const { currentPassword} =  data;

    if (!(await isUserOrAdmin(userId))) {
        return NextResponse.json(
            {
                message:
                    "Vous n'êtes pas autorisé à supprimer cet utilisateur.",
            },
            { status: 401 }
        );
    }
    
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: { password: true },
        });
        if (user == null){
            return NextResponse.json({ message: "L'utilisateur n'existe pas." }, { status: 404 });
        }
        const storedPassword = user.password;
        if (await bcrypt.compare(currentPassword, storedPassword)) {
            await prisma.user.delete({
                where: {
                    id: userId,
                }
            });
            return NextResponse.json({ status: 200 });
        } else {
            return NextResponse.json({ message: "Le mot de passe n'est pas correct." }, { status: 400 });
        }

    }
    catch(e){
        console.log(e);
        return NextResponse.json({ message: "Une erreur est survenue, veuillez réessayer plus tard." }, { status: 500 });
    }

}