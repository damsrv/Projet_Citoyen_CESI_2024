import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {PrismaClientValidationError} from "@prisma/client/runtime/library";
import {pusherServer} from "@/lib/pusher";


export async function POST(req: Request) {

    const {data} = await req.json();
    const {roomId, senderId, content, status} = data;

    try {

        const newMessage = await prisma.message.create({
            data: {
                roomId: parseInt(roomId),
                senderId,
                content,
                status: parseInt(status)
            },
        });

        await pusherServer.trigger(`channel-${roomId}`, 'send_message', newMessage);

        return NextResponse.json(newMessage, {status: 201});

    } catch (e) {

        console.log(e);

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