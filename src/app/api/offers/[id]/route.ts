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

export async function GET(req: Request, params: Params) { //OK

    const offerId = parseInt(params.params.id);

    try {

        const offer = await prisma.offer.findUniqueOrThrow({
            where: {
                id: offerId,
            },
        })

        return NextResponse.json(offer, { status: 200 });

    } catch (e) {
        console.log(e);

        if (e instanceof PrismaClientKnownRequestError) {
            return NextResponse.json({ error: e, message: "L'id de l'offre fourni ne correspond à aucune offre." }, { status: 404 });
        } else {
            return NextResponse.json({
                error: e,
                message: "Une erreur est survenue, veuillez réessayer plus tard."
            }, { status: 500 });
        }
    }
}

export async function PUT(req: Request, params: Params) { // OK

    const { data } = await req.json();
    const offerId = parseInt(params.params.id);

    try {

        const updatedOffer = await prisma.offer.update({
            where: {
                id: offerId,
            },
            data: {...data}
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

export async function DELETE(req: Request, params: Params) { // OK

    const { data } = await req.json();
    const offer: Offer = data;
    const offerId = parseInt(params.params.id);

    try {

        const deleteOffer = await prisma.offer.delete({
            where: {
                id: offerId,
            },
        })

        return NextResponse.json({ status: 204 });

    } catch (e) {
        console.log(e);

        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
            return NextResponse.json({ error: e, message: "L'offre n'existe pas." }, { status: 404 });
        } else {
            return NextResponse.json({
                error: e,
                message: "Une erreur est survenue, veuillez réessayer plus tard."
            }, { status: 500 });
        }
    }

}