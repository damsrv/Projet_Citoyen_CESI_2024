"use client"

import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    return (
        <DropdownMenuItem className="flex gap-1 text-red-400" onClick={() => signOut({ callbackUrl: "/", redirect: true })}><LogOut className="h-4 w-4" />Déconnexion</DropdownMenuItem>
    )
}