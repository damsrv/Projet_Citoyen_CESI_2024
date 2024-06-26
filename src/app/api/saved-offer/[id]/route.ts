import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";


interface Params {
    params: {
        id: string;
    };
}

export async function GET(req: Request, params: Params) {
    const offerId = parseInt(params.params.id);
    const session = await getServerSession(authOptions);
    const userId = session?.user.id ;

    try {
        if (userId) {
            const savedOffer = await prisma.savedOffer.findUniqueOrThrow({
                where: {
                    userId_offerId: {
                        userId: userId,
                        offerId: offerId,
                    },
                },
            });
            return NextResponse.json(savedOffer, { status: 200 });
        }
        else {
            return NextResponse.json(
                { error: "No user id found", message: "L'utilisateur n'existe pas." },
                { status: 404 }
            );
        }
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



export async function POST(req: Request,  params: Params) {

    const offerId = parseInt(params.params.id);
    const session = await getServerSession(authOptions);
    const userId = session?.user.id ;

    try {
        if (userId) {
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
        }
        else {
            return NextResponse.json(
                { error: "No user id found", message: "L'utilisateur n'existe pas." },
                { status: 404 }
            );
        }
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


export async function DELETE(req: Request, params: Params) {

    const offerId = parseInt(params.params.id);
    const session = await getServerSession(authOptions);
    const userId = session?.user.id ;

    try {

        if (userId) {
            const deleteSavedOffer = await prisma.savedOffer.delete({
                where: {
                    userId_offerId: {
                        userId: userId,
                        offerId: offerId,
                    },
                },
            });        
            return NextResponse.json({ status: 204 });
        }
        else {
            return NextResponse.json(
                { error: "No user id found", message: "L'utilisateur n'existe pas." },
                { status: 404 }
            );
        }
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
