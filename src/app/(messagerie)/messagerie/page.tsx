import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { permanentRedirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ChatNav from "@/components/Chat/ChatNav/ChatNav";

export default async function ChatPage() {
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

    return (
        <>
            <div className="flex grow lg:grow-0 min-h-full">
                <ChatNav rooms={user.userRooms} />
            </div>
            <section className="hidden lg:flex grow bg-white border rounded-lg">
                <div className="flex items-center rounded-lg justify-center w-full h-full bg-white px-2 text-center">
                    <p>Commencez par selectionner une conversation</p>
                </div>
            </section>
        </>
    );
}
