import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Topbar from "@/components/Topbar/Topbar";
import { ReactNode } from "react";
import Footer from "@/components/Footer/Footer";
import { SessionProvider } from "@/components/Providers/SessionProvider/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import RoleContextProvider from "@/components/Providers/RoleContextProvider/RoleContextProvider";
import { Toaster } from "react-hot-toast";

const inter = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "LeBonMentor",
    description:
        "LeBonMentor est une plateforme de mentorat en ligne. Trouvez un mentor ou devenez mentor.",
    manifest: "/manifest.json",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="fr">
            <body
                className={cn(
                    "flex flex-col min-h-screen bg-background font-sans antialiased",
                    inter.variable
                )}
            >
                <SessionProvider session={session}>
                    <RoleContextProvider>
                        <Toaster position="bottom-right" reverseOrder={false} />
                        <Topbar />
                        {children}
                        <Footer />
                    </RoleContextProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
