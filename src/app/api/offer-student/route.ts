import prisma from "@/lib/prisma";
import { OfferStudentStatus } from "@/enums/offerStatus";
import { NextResponse } from "next/server";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { isUserOrAdmin } from "@/services/check-authorization";

export async function POST(req: Request) {
    const { data } = await req.json();
    console.log(data);
    const { offerId, userId, message } = data;


    if (!(await isUserOrAdmin(userId))) {
        return NextResponse.json(
            {
                message:
                    "Vous n'êtes pas autorisé à envoyer une demande de contact pour cet utilisateur.",
            },
            { status: 401 }
        );
    }

    try {
        const newOfferStudent = await prisma.offerStudent.create({
            data: {
                message: message,
                offerId: offerId,
                studentId: userId,
                status: OfferStudentStatus.Pending,
            },
        });

        return NextResponse.json(newOfferStudent, { status: 201 });
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
