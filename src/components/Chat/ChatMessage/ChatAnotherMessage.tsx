"use client"

import {Message} from "@prisma/client";
import {format} from "date-fns";

interface ChatAnotherMessageProps {
    message: Message
}
export default function ChatAnotherMessage({ message }: ChatAnotherMessageProps) {
    return (
        <div className="flex flex-col w-full h-max justify-start">
            <p className="flex w-max h-max bg-secondary-light py-1 px-2 rounded-md">
                {message.content}
            </p>
            <p className="text-xs pl-2">
                {format(message.sentAt, "HH:mm")}
            </p>
        </div>
    )
}