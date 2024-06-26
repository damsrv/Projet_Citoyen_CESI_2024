import prisma from "@/lib/prisma";
import { Offer, User } from "@prisma/client";
import { PrismaClient, Prisma } from '@prisma/client'
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Key } from "react";
import { exclude } from "@/lib/utils";

interface Params {
    params: {
        id: string;
    }
}

// GET BY ID. Contient tous les messages associés à la ROOM.
export async function GET(req: Request, params: Params) { // OK

    const roomId = parseInt(params.params.id);

    try {

        const room = await prisma.room.findUniqueOrThrow({
            where: {
                id: roomId,
            },
            include: {
                userRooms: true,
                messages:true
            },
        });

        return NextResponse.json(room, { status: 200 });

    } catch (e) {
        console.log(e);

        if (e instanceof PrismaClientKnownRequestError) {
            return NextResponse.json({ error: e, message: "La room n'existe pas." }, { status: 404 });
        } else {
            return NextResponse.json({
                error: e,
                message: "Une erreur est survenue, veuillez réessayer plus tard."
            }, { status: 500 });
        }
    }
}

export async function DELETE(req: Request, params: Params) { //OK

    const roomId = parseInt(params.params.id);
    
    try {
        const deletedRoom = await prisma.room.delete({
            where: {
                id: roomId,
            },
        })
        return NextResponse.json({ status: 204 });
    } catch (e) {
        console.log(e);

        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
            return NextResponse.json({ error: e, message: "La Room n'existe pas." }, { status: 404 });
        } else {
            return NextResponse.json({
                error: e,
                message: "Une erreur est survenue, veuillez réessayer plus tard."
            }, { status: 500 });
        }
    }

}