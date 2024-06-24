import prisma from "@/lib/prisma";
import { Offer, User } from "@prisma/client";
import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Key } from "react";

interface Params {
    params: {
        id: string[];
    };
}

export async function PUT(req: Request, params: Params) {
    const { data } = await req.json();

    const studentId = parseInt(params.params.id[0]);
    const offerId = parseInt(params.params.id[1]);

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
