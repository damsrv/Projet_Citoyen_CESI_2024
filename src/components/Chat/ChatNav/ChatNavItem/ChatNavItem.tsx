"use client"

import {Prisma} from "@prisma/client";
import {useContext, useState} from "react";
import Link from "next/link";
import Small from "@/components/ui/Typography/small";
import {CurrentConversationContext} from "@/context/CurrentConversationContext";
import RoomGetPayload = Prisma.RoomGetPayload;

interface ChatNavItemProps {
    room: RoomGetPayload<{ include: { messages: true } }>
}

export default function ChatNavItem({room}: ChatNavItemProps) {
    const [newMessage, setNewMessage] = useState<boolean>(false);

    const { currentConversationId, setCurrentConversationId } = useContext(CurrentConversationContext)
    return (
        <div className={`h-full w-full cursor-pointer p-2 ${currentConversationId === room.id ? "bg-primary-light" : ""}`}>
            <Link href={`/messagerie/${room.id}`} onClick={() => setCurrentConversationId(room.id)}>
                <p>{room.name}</p>
                <Small className="opacity-60">{room.messages[room.messages.length - 1] ? room.messages[room.messages.length - 1].content : "Aucun message récent"}</Small>
            </Link>
        </div>
    )
}