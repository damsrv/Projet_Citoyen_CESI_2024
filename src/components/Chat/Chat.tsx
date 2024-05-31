"use client"

import {useEffect, useState} from "react";
import {pusherClient, pusherServer} from "@/lib/pusher";
import {Button} from "@/components/ui/button";
import {mockSendMessage} from "@/lib/mocks-pusher";

export default function Chat() {
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        pusherClient.subscribe("test__chat")

        const messageHandler = (message: string) => {
            setMessages((prev) => [...prev, message]);
        }

        pusherClient.bind('send_message', messageHandler);

        return () => {
            pusherClient.unsubscribe("test__chat")
            pusherClient.unbind('send_message', messageHandler);
        }
    }, [])

    return (
        <>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value) }/>
            <Button type="button" onClick={() => mockSendMessage(message)}>Envoyer</Button>
            <ul>
                {messages.map((message, idx) => {
                    return (
                        <li key={idx}>{message}</li>
                    )
                })}
            </ul>
        </>
    )
}