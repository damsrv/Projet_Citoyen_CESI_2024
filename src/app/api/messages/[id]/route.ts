import prisma from "@/lib/prisma";
import { PrismaClient, Prisma } from '@prisma/client'
import { NextResponse } from "next/server";
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;

interface Params {
    params: {
        id: string;
    }
}

export async function PUT(req: Request, params: Params) { 

    const messageId = parseInt(params.params.id);
    const { data } = await req.json();
    const { content } = data;
    
    try {
        const deletedUser = await prisma.message.update({
            where: {
                id: messageId,
            },
            data: { 
                content,
                status: 1 
            },
        })
        return NextResponse.json(deletedUser, {status: 200});

    } catch (e) {
        console.log(e);

        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
            return NextResponse.json({ error: e, message: "Le Message n'existe pas." }, { status: 404 });
        } else {
            return NextResponse.json({
                error: e,
                message: "Une erreur est survenue, veuillez réessayer plus tard."
            }, { status: 500 });
        }
    }

}

export async function DELETE(req: Request, params: Params) { 

    const messageId = parseInt(params.params.id);
    const status  = 2; // deleted status.
    
    try {
        const deletedUser = await prisma.message.update({
            where: {
                id: messageId,
            },
            data: { status },
        })
        return NextResponse.json(deletedUser, { status: 200 });

    } catch (e) {
        console.log(e);

        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
            return NextResponse.json({ error: e, message: "Le Message n'existe pas." }, { status: 404 });
        } else {
            return NextResponse.json({
                error: e,
                message: "Une erreur est survenue, veuillez réessayer plus tard."
            }, { status: 500 });
        }
    }

}