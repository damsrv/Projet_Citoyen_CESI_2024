"use server"

import {pusherServer} from "@/lib/pusher";

export const mockSendMessage = async (message: string) => {
    try {
        await pusherServer.trigger("test__chat", "send_message", message)
        console.log("Message sent", message)
    } catch (e) {
        console.error(e)
    }
}