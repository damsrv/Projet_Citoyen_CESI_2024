import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {permanentRedirect} from "next/navigation";
import prisma from "@/lib/prisma";
import ChatNav from "@/components/Chat/ChatNav/ChatNav";
import {ReactNode} from "react";
import CurrentConversationIdProvider
    from "@/components/Providers/CurrentConversationIdProvider/CurrentConversationIdProvider";

export default async function ChatLayout({children}: { children: ReactNode }) {
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
                            messages: true
                        }
                    }
                }
            }
        }
    })

    if (!user) permanentRedirect('/login')

    return (
        <main className="flex grow bg-secondary-light p-10 gap-10 max-h-[calc(100vh-56px)]">
            <CurrentConversationIdProvider>
                <ChatNav rooms={user.userRooms} />
                <section className="flex grow bg-white rounded-md">
                    {children}
                </section>
            </CurrentConversationIdProvider>
        </main>
    )
}