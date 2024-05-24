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
    const offer: Offer = data;
    const orderId = parseInt(params.params.id);

    try {

        const updatedOffer = await prisma.offer.update({
            where: {
                id: orderId,
            },
            data: offer
        })

        return NextResponse.json(updatedOffer, { status: 201 });

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