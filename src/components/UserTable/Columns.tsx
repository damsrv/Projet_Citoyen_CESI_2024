"use client"

import { User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import ModalDelete from "@/components/ModalDelete/ModalDelete";
import {
    Dialog, DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";

import UserGetPayload = Prisma.UserGetPayload;
import { Prisma } from "@prisma/client";

export const columns: ColumnDef<UserGetPayload<{
    include: { role: true, offers: true }
}>>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Nom" />
            ),
            cell: ({ row }) => {
                const user = row.original

                return (
                    <Link href={`/profil/${user.id}`} className=" font-semibold" title="Voir l'offre">
                        {user.firstname} {user.lastname}
                    </Link>
                )
            }
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),

        },
        {
            accessorKey: "role",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Role" />
            ),
            cell: ({ row }) => {
                const user = row.original

                return (
                    <span className={"status " + (user.role.name === "ADMIN" ? "status-archived" : "status-draft")}>
                        {user.role.name}
                    </span>
                )
            }
        },
        {

            accessorKey: "registerAt",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Date d'inscription" />
            ),
            cell: ({ row }) => {
                const user = row.original

                return (
                    <span className="text-sm font-semibold ">
                        {user.registerAt ? new Date(user.registerAt).toLocaleDateString() + " à " + new Date(user.registerAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Non renseigné"}
                    </span>
                )
            }
        },
        {
            id: "actions",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Actions" />
            ),
            cell: ({ row }) => {
                const user = row.original

                return (
                    <><Dialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Ouvrir le menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem >
                                    <Link href={`/profil/${user.id}`}>
                                        Voir l'utilisateur
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href={`/administration/utilisateurs/modifier/${user.id}`}>
                                        Modifier l'utilisateur
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <DialogTrigger className="text-destructive">Supprimer l'utilisateur</DialogTrigger>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <ModalDelete
                            objectToDelete={row.original.id}
                            label="l'utilisateur"
                            labelSuccess="L'utilisateur a bien été supprimé"
                            url="/api/users/"
                        />
                    </Dialog>
                    </>
                )
            },
        },
    ]
