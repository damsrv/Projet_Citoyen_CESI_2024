import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {PrismaClientValidationError} from "@prisma/client/runtime/library";
import { isUserOwner } from "@/services/check-authorization";

export async function POST(req: Request) {
    const {data} = await req.json()
    const {userId, offerId} = data;

    if (!(await isUserOwner(userId))) {
        return NextResponse.json(
            {
                message: "Vous n'êtes pas autorisé à ajouter cette offre en favoris.",
            },
            { status: 401 }
        );
    }

    try {
        const newSavedOffer = await prisma.savedOffer.create({
            data: {
                offer: {
                    connect: {id: offerId}
                },
                user: {
                    connect: {id: userId}
                },
            }
        })

        return NextResponse.json(newSavedOffer, {status: 201})
    } catch (e) {
        if (e instanceof PrismaClientValidationError) {
            return NextResponse.json({error: e, message: "Erreur de validation prisma"}, {status: 404});
        } else {
            return NextResponse.json({
                error: e,
                message: "Une erreur est survenue, veuillez réessayer plus tard."
            }, {status: 500});
        }
    }
}