import prisma from "@/lib/prisma";
import { Offer, User } from "@prisma/client";
import { PrismaClient, Prisma } from '@prisma/client'
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Key } from "react";
import { exclude } from "@/lib/utils";

interface Params {
    params: {
        id: string;
    }
}

// GET BY ID
export async function GET(req: Request, params: Params) { // OK

    const userId = parseInt(params.params.id);

    try {

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
        });

        const userWithoutPassword = exclude(user, ['password']);        

        return NextResponse.json(userWithoutPassword, { status: 200 });

    } catch (e) {
        console.log(e);

        if (e instanceof PrismaClientKnownRequestError) {
            return NextResponse.json({ error: e, message: "Le user n'existe pas." }, { status: 404 });
        } else {
            return NextResponse.json({
                error: e,
                message: "Une erreur est survenue, veuillez réessayer plus tard."
            }, { status: 500 });
        }
    }
}

export async function PUT(req: Request, params: Params) { //OK

    const { data } = await req.json();
    const userId = parseInt(params.params.id);

    let skillsArray = [];

    const { skills, ...updatedData } = data;
    if(skills!=null) {
        skillsArray = skills.map((skillId: Number) => {
            return (
                {
                    skill: {
                        connect: {
                            id: skillId
                        }
                    }
                }
            )
        });
    }
    
    try {

        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },  
            data: {
                ...updatedData,
                userSkills: {
                    deleteMany: {},
                    create: [
                        ...skillsArray
                    ],                    
                }
            }
        });

        const updatedUserWithoutPassword = exclude(updatedUser, ['password']);        

        return NextResponse.json(updatedUserWithoutPassword, { status: 201 });

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

export async function DELETE(req: Request, params: Params) { //OK

    const userId = parseInt(params.params.id);
    
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId,
            },
        })
        return NextResponse.json({ status: 204 });
    } catch (e) {
        console.log(e);

        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
            return NextResponse.json({ error: e, message: "Le User n'existe pas." }, { status: 404 });
        } else {
            return NextResponse.json({
                error: e,
                message: "Une erreur est survenue, veuillez réessayer plus tard."
            }, { status: 500 });
        }
    }

}