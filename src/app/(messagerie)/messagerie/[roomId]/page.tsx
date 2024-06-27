import Chat from "@/components/Chat/Chat";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {permanentRedirect} from "next/navigation";
import prisma from "@/lib/prisma";
import {User, UserRoom} from "@prisma/client";
import toast from "react-hot-toast";

function isConnectedUserInUserRooms(user: User, userRooms: UserRoom[]) {
    let isUserAllowed = false
    userRooms.forEach((userRoom) => {
        if (userRoom.userId === user.id) {
            isUserAllowed = true
        }
    })

    return isUserAllowed
}

export default async function ChatRoomById({params}: { params: { roomId: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) permanentRedirect('/login');

    const user = await prisma.user.findFirst({
        where: {
            id: session.user.id,
        }
    })

    if (!user) permanentRedirect("/login");

    const room = await prisma.room.findFirst({
        where: {
            id: parseInt(params.roomId),
        },
        include: {
            messages: true
        }
    })

    if (!room) {
        toast.error("Impossible d'accéder à cette conversation")
        permanentRedirect('/login');
    }

    const userRooms = await prisma.userRoom.findMany({
        where: {
            roomId: parseInt(params.roomId),
        }
    })

    if(userRooms.length !== 2 || !isConnectedUserInUserRooms(user, userRooms)) {
        toast.error("Impossible d'accéder à cette conversation")
        permanentRedirect("/login")
    }

    const otherUserRoom = await prisma.userRoom.findFirst({
        where: {
            roomId: parseInt(params.roomId),
            AND: {
                NOT: {
                    userId: user.id
                }
            }
        },
    })


    const otherUser = await prisma.user.findFirst({
        where: {
            id: otherUserRoom!.userId
        }
    })

    return (
        <div className="flex grow bg-white rounded-md">
            <Chat user={user} room={room} interlocutor={otherUser!}/>
        </div>
    )
}