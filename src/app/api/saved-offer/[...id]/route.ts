import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import { isOfferOwner, isUserOwner } from "@/services/check-authorization";

interface Params {
    params: {
        id: string;
    };
}

export async function DELETE(req: Request, params: Params) {

    const userId = parseInt(params.params.id[0]);
    const offerId = parseInt(params.params.id[1]);

    try {

        if (!(await isUserOwner(userId))) {
            return NextResponse.json(
                {
                    message:
                        "Vous n'êtes pas autorisé à supprimer cette offre des favoris.",
                },
                { status: 401 }
            );
        }
        

        const deleteSavedOffer = await prisma.savedOffer.delete({
            where: {
                userId_offerId: {
                    userId: userId,
                    offerId: offerId,
                },
            },
        });        

        return NextResponse.json({ status: 204 });
    } catch (e) {
        console.log(e);

        if (
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === "P2025"
        ) {
            return NextResponse.json(
                { error: e, message: "L'offre n'est pas un favoris utilisateur." },
                { status: 404 }
            );
        } else {
            return NextResponse.json(
                {
                    error: e,
                    message:
                        "Une erreur est survenue, veuillez réessayer plus tard.",
                },
                { status: 500 }
            );
        }
    }
}
