"use client"

import { Report } from "@prisma/client"
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

import ReportGetPayload = Prisma.ReportGetPayload;
import { Prisma } from "@prisma/client";

export const columns: ColumnDef<ReportGetPayload<{
    include: { reporter: true, target: true }
}>>[] = [
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Statut" />
            ),
            cell: ({ row }) => {
                const report = row.original

                return (
                    <span className={"status " + (report.status === 0 ? "status-pending" : "status-draft")}>
                        {report.status === 0 ? "En attente" : "Traité"}
                    </span>
                )
            }
        },
        {
            accessorKey: "reporter",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Reporter" />
            ),
            cell: ({ row }) => {
                const reporter = row.original.reporter

                return (
                    <Link href={`/profil/${reporter.id}`} className=" font-semibold" title="Voir l'offre">
                        {reporter.firstname} {reporter.lastname}
                    </Link>
                )
            }
        },
        {
            accessorKey: "target",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Cible" />
            ),
            cell: ({ row }) => {
                const target = row.original.target

                return (
                    <Link href={`/profil/${target.id}`} className=" font-semibold" title="Voir l'offre">
                        {target.firstname} {target.lastname}
                    </Link>
                )
            }
        },

        {

            accessorKey: "createdAt",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Date du report" />
            ),
            cell: ({ row }) => {
                const report = row.original

                return (
                    <span className="text-sm font-semibold ">
                        {report.createdAt ? new Date(report.createdAt).toLocaleDateString() + " à " + new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Non renseigné"}
                    </span>
                )
            }
        },
        {
            accessorKey: "reason",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Raison" />
            ),
            cell: ({ row }) => {
                const report = row.original

                return (
                    <span className="text-sm font-semibold ">
                        {report.reason}
                    </span>
                )
            }
        },
        {
            accessorKey: "message",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Message" />
            ),
            cell: ({ row }) => {
                const report = row.original

                return (
                    <span className="text-sm font-semibold ">
                        {report.message}
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
