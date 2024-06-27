import { Prisma } from "@prisma/client";
import ChatNavItem from "@/components/Chat/ChatNav/ChatNavItem/ChatNavItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserRoomGetPayload = Prisma.UserRoomGetPayload;
import Link from "next/link";
import { Underline } from "lucide-react";
import { Underlined } from "@/components/ui/Typography/underlined";
import A from "@/components/ui/Typography/a";
import H4 from "@/components/ui/Typography/h4";

interface ChatNavProps {
    rooms: UserRoomGetPayload<{
        include: { room: { include: { messages: true } } };
    }>[];
}

export default function ChatNav({ rooms }: ChatNavProps) {
    return (
        <>
            {rooms.length > 0 ? (
                <div className="h-full rounded-lg bg-white w-72 border py-2 ">
                    <H4 className=" px-4 !mb-2">Conversations</H4>
                    <ScrollArea className="flex flex-col ">
                        {rooms.map((userRoom, idx) => {
                            return (
                                <ChatNavItem key={idx} room={userRoom.room} />
                            );
                        })}
                    </ScrollArea>
                </div>
            ) : (
                <div className="h-full flex items-center rounded-lg justify-center w-60 bg-white px-2 text-center">
                    <p>
                        Aucune conversation disponible, commencez par{" "}
                        <A href="/offres-mentorat">chercher une offre</A>
                    </p>
                </div>
            )}
        </>
    );
}
