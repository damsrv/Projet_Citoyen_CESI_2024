import {Prisma} from "@prisma/client";
import ChatNavItem from "@/components/Chat/ChatNav/ChatNavItem/ChatNavItem";
import {ScrollArea} from "@/components/ui/scroll-area";
import UserRoomGetPayload = Prisma.UserRoomGetPayload;
import Link from "next/link";
import {Underline} from "lucide-react";
import {Underlined} from "@/components/ui/Typography/underlined";
import A from "@/components/ui/Typography/a";

interface ChatNavProps {
    rooms: UserRoomGetPayload<{ include: { room: { include: { messages: true } } } }>[],
}

export default function ChatNav({rooms}: ChatNavProps) {
    return (
        <>
            {
                rooms.length > 0 ?
                    (
                        <ScrollArea className="flex flex-col rounded-md bg-white w-60">
                            {
                                rooms.map((userRoom, idx) => {
                                    return (
                                        <ChatNavItem key={idx} room={userRoom.room}/>
                                    )
                                })
                            }
                        </ScrollArea>
                    )
                    :
                    (
                        <div className="flex items-center rounded-md justify-center w-60 bg-white px-2 text-center">
                            <p>Aucune conversation disponible, commencez par <A href="/offres-mentorat">chercher une
                                offre</A>
                            </p>
                        </div>
                    )
            }
        </>
    )
}