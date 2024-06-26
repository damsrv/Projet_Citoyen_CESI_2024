"use server"

import {pusherServer} from "@/lib/pusher";
import {Message} from "@prisma/client";

export const mockSendMessage = async (roomId: string, message: Message) => {
    try {
        await pusherServer.trigger(`${roomId}`, "send_message", message)
        console.log("Message sent", message)
    } catch (e) {
        console.error(e)
    }
}