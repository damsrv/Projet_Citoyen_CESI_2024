import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { permanentRedirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ChatNav from "@/components/Chat/ChatNav/ChatNav";
import { ReactNode } from "react";
import CurrentConversationIdProvider from "@/components/Providers/CurrentConversationIdProvider/CurrentConversationIdProvider";

export default async function ChatLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await getServerSession(authOptions);
    if (!session) permanentRedirect("/login");

    return (
        <main className="flex flex-col lg:flex-row grow bg-secondary-light p-4 lg:p-10 lg:gap-10 min-h-[80vh] lg:max-h-[calc(100vh-56px)]">
            <CurrentConversationIdProvider>
                {children}
            </CurrentConversationIdProvider>
        </main>
    );
}
