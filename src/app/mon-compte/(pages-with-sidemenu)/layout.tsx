import type { Metadata } from "next";
import { ReactNode } from "react";
import ProfileNav from "@/components/ProfileNav/ProfileNav";

export const metadata: Metadata = {
    title: "Mon compte",
    description: "Mon compte",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <main className="bg-secondary-background grow py-10">
            <div className="container-custom flex flex-col lg:flex-row gap-10 px-5 justify-start">
                <ProfileNav />
                {children}
            </div>
        </main>
    );
}
