import prisma from "@/lib/prisma";
import { Offer, Room, User } from "@prisma/client";
import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Key } from "react";
import { isUserOrAdmin } from "@/services/check-authorization";

interface Params {
    params: {
        id: string[];
    };
}

// Change le status donc pas besoin de DELETE method.
export async function PUT(req: Request, params: Params) {
    const { data } = await req.json();

    const studentId = parseInt(params.params.id[0]);
    const mentorId = parseInt(params.params.id[1]);
    const offerId = parseInt(params.params.id[2]);
    let newRoom: Room;

    if (!(await isUserOrAdmin(mentorId))) {
        return NextResponse.json(
            {
                message:
                    "Vous n'êtes pas autorisé à répondre à une demande de contact pour cet utilisateur.",
            },
            { status: 401 }
        );
    }

    try {
        const updatedOfferStudent = await prisma.offerStudent.update({
            where: {
                offerId_studentId: {
                    studentId: studentId,
                    offerId: offerId,
                },
            },
            data: {
                status: data.status,
            },
        });

        if (data.status === 1) {
            const userIds = [studentId, mentorId];

            const offer = await prisma.offer.findFirst({
                where: {
                    id: offerId
                }
            })

            const newRoom = await prisma.room.create({
                data: {
                    userRooms: {
                        create: [
                            { user: { connect: { id: studentId } } },
                            { user: { connect: { id: mentorId } } },
                        ],
                    },
                    name: offer!.title,
                    offer: {
                        connect: { id: offerId },
                    },
                },
                include: {
                    userRooms: {
                        include: {
                            user: true,
                        },
                    },
                },
            });

            return NextResponse.json(newRoom, { status: 201 });
        }

        return NextResponse.json(updatedOfferStudent, { status: 201 });
    } catch (e) {
        console.log(e);

        if (e instanceof PrismaClientValidationError) {
            return NextResponse.json(
                { error: e, message: "Erreur de validation prisma" },
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
