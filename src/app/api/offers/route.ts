import prisma from "@/lib/prisma";
import { Offer, User } from "@prisma/client";
import { PrismaClient, Prisma } from '@prisma/client'
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';
import { OfferStatus } from '../../../enums/offerStatus'
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

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
    const { offerComTypes, ...offer } = data;

    let comTypesArray = [];

    if (offerComTypes != null) {
        comTypesArray = offerComTypes.map((comTypeId: number) => {
            return {
                comType: {
                    connect: {
                        id: comTypeId
                    }
                }
            };
        });
    }

    try {
        const newOffer = await prisma.offer.create({
            data: {
                ...offer,
                offerComTypes: {
                    create: [...comTypesArray]
                }
            }
        });
        return NextResponse.json(newOffer, { status: 201 });
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
