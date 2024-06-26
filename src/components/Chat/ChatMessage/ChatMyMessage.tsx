"use client"

import {Message} from "@prisma/client";
import {format} from "date-fns";

interface ChatMyMessageProps {
    message: Message
}
export default function ChatMyMessage({ message }: ChatMyMessageProps) {
    return (
        <div className="flex flex-col w-full h-max items-end">
            <p className="flex w-max h-max bg-primary-light py-1 px-2 rounded-md">
                {message.content}
            </p>
            <p className="text-xs pr-2">
                {format(message.sentAt, "HH:mm")}
            </p>
        </div>
    )
}