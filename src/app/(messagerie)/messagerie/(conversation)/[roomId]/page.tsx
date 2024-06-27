import Chat from "@/components/Chat/Chat";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { permanentRedirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { useContext } from "react";
import { CurrentConversationContext } from "@/context/CurrentConversationContext";
import ChatNav from "@/components/Chat/ChatNav/ChatNav";

export default async function ChatRoomById({
    params,
}: {
    params: { roomId: string };
}) {
    const session = await getServerSession(authOptions);

    if (!session) permanentRedirect("/login");

    const user = await prisma.user.findFirst({
        where: {
            id: session.user.id,
        },
        include: {
            userRooms: {
                include: {
                    room: {
                        include: {
                            messages: true,
                        },
                    },
                },
            },
        },
    });

    if (!user) permanentRedirect("/login");

    const userRoom = await prisma.room.findFirst({
        where: {
            id: parseInt(params.roomId),
        },
        include: {
            messages: true,
        },
    });

    if (!userRoom) permanentRedirect("/login");

    const otherUserRoom = await prisma.userRoom.findFirst({
        where: {
            roomId: parseInt(params.roomId),
            AND: {
                NOT: {
                    userId: user.id,
                },
            },
        },
    });

    const otherUser = await prisma.user.findFirst({
        where: {
            id: otherUserRoom!.userId,
        },
    });

    return (
        <>
            <div className="hidden lg:flex">
                <ChatNav rooms={user.userRooms} />
            </div>
            <section className=" grow bg-white border rounded-lg">
                <div className="flex grow bg-white rounded-md h-full">
                    <Chat
                        user={user}
                        room={userRoom}
                        interlocutor={otherUser!}
                    />
                </div>
            </section>
        </>
    );
}
