"use client";

import { useContext, useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { Message, Prisma, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMyMessage from "@/components/Chat/ChatMessage/ChatMyMessage";
import ChatAnotherMessage from "@/components/Chat/ChatMessage/ChatAnotherMessage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CurrentConversationContext } from "@/context/CurrentConversationContext";
import RoomGetPayload = Prisma.RoomGetPayload;
import toast from "react-hot-toast";

interface ChatProps {
    user: User;
    room: RoomGetPayload<{ include: { messages: true } }>;
    interlocutor: User;
}

export default function Chat({ user, room, interlocutor }: ChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { setCurrentConversationId } = useContext(CurrentConversationContext);

    function handleNewMessage(message: Message) {
        setMessages((messages) => [...messages, message]);
    }

    useEffect(() => {
        setCurrentConversationId(room.id);
        setMessages(room.messages);

        pusherClient.subscribe(`channel-${room.id}`);
        pusherClient.bind("send_message", handleNewMessage);

        return () => {
            pusherClient.unsubscribe(`${room.id}`);
            pusherClient.unbind("send_message", handleNewMessage);
        };
    }, []);

    async function postMessage(message: string) {
        const newMessage = {
            roomId: room.id,
            senderId: user.id,
            content: message,
            status: 0,
        } as Message;

        setMessage("");

        try {
            setLoading(true);
            const res = await fetch("/api/messages", {
                method: "POST",
                body: JSON.stringify({ data: newMessage }),
            });

            setLoading(false);
        } catch (e) {
            setLoading(false);
            toast.error("Une erreur est survenue lors de l'envoi du message");
        }
    }

    return (
        <main className="flex flex-col w-full">
            <header className="flex items-center gap-2 p-3 border-b">
                <Avatar>
                    {!!interlocutor.avatar && (
                        <AvatarImage src={interlocutor.avatar} />
                    )}
                    <AvatarFallback>
                        {interlocutor.firstname.charAt(0).toUpperCase()}
                        {interlocutor.lastname.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <p>
                    {interlocutor.firstname} {interlocutor.lastname}
                </p>
            </header>
            <div className="flex grow overflow-auto">
                <ul className="flex grow flex-col px-4 lg:px-8 py-2 gap-3 justify-end h-full">
                    {messages.map((message, idx) => {
                        return (
                            <div key={idx}>
                                {user.id === message.senderId ? (
                                    <ChatMyMessage message={message} />
                                ) : (
                                    <ChatAnotherMessage message={message} />
                                )}
                            </div>
                        );
                    })}
                </ul>
            </div>
            <div className="flex gap-2 py-4  px-4 lg:px-8">
                <Input
                    placeholder="Entrez votre message ..."
                    className="flex grow"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                    type="button"
                    disabled={loading}
                    onClick={() => postMessage(message)}
                >
                    Envoyer
                </Button>
            </div>
        </main>
    );
}
