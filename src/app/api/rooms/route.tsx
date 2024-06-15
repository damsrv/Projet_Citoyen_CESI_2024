import prisma from "@/lib/prisma";
import { Offer, Room, User } from "@prisma/client";
import { PrismaClient, Prisma } from '@prisma/client'
import { NextResponse } from "next/server";
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import { PrismaClientValidationError } from "@prisma/client/runtime/library";



export async function POST(req: Request) {

    const { data } = await req.json();
    const { name, userIds } = data;

    try {

        const newRoom = await prisma.room.create({
            data: {
              name,
              userRooms: {
                create: userIds.map((userId: number) => ({
                  user: {
                    connect: { id: userId },
                  },
                })),
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