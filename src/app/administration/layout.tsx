import AdminNav from "@/components/AdminNav/AdminNav";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Administration",
    description: "Administration",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <main className="bg-secondary-background grow flex flex-col lg:flex-row gap-10 h-full">
            <AdminNav />
            <div className="grow p-4 lg:p-10 flex flex-col gap-5">
                {children}
            </div>
        </main>
    );
}
