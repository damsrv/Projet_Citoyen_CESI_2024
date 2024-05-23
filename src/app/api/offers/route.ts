import prisma from "@/lib/prisma";
import { Offer, User } from "@prisma/client";
import { PrismaClient, Prisma } from '@prisma/client'
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';
import { OfferStatus } from '../../../enums/offerStatus'
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;

export async function GET() {

    try {

        const offers = await prisma.offer.findMany();

        return NextResponse.json(offers, { status: 200 });

    } catch (e) {
        console.log(e);

        return NextResponse.json({
            error: e,
            message: "Une erreur est survenue, veuillez réessayer plus tard."
        }, { status: 500 });
    }
}


export async function POST(req: Request) {

    const { data } = await req.json();
    const offer: Offer = data;

    try {

        const newOffer = await prisma.offer.create({
            data: offer
        });

        return NextResponse.json(newOffer, { status: 201 });

    } catch (e) {

        console.log(e);

        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return NextResponse.json({ error: e, message: "Utilisateur déjà existant" }, { status: 404 });
            }
        } else {
            return NextResponse.json({
                error: e,
                message: "Une erreur est survenue, veuillez réessayer plus tard."
            }, { status: 500 });
        }
    }

}

export async function DELETE(req: Request) {

    const { data } = await req.json();
    const offerId = data.id;

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