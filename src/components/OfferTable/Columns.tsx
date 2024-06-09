"use client"

import { Offer } from "@prisma/client"
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
import { DataTableColumnHeader } from "@/components/Datatable/DataTableColumnHeader";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Offer>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Titre" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Statut" />
        ),
    },
    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => {
            const offer = row.original

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
                                <Link href={`/offres-mentorat/${offer.id}`}>
                                    Voir l'offre
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href={`/offres-mentorat/modifier/${offer.id}`}>
                                    Modifier l'offre
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <DialogTrigger className="text-destructive">Supprimer l'offre</DialogTrigger>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ModalDelete
                        objectToDelete={row.original.id}
                        label="l'offre"
                        labelSuccess="L'offre a bien été supprimée"
                        url="/api/offers/"
                    />
                </Dialog>
                </>
            )
        },
    },
]
