"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import SaveOffer from "@/components/SaveOffer/SaveOffer";
import type { SavedOfferTableType } from "@/types/types.d.ts";


export const columns: ColumnDef<SavedOfferTableType>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Titre" />
        ),
        cell: ({ row }) => {
            const savedOffer = row.original

            return (
                <Link href={`/offres-mentorat/${savedOffer.offer.id}`} className=" font-semibold" title="Voir l'offre">
                    {savedOffer.offer.title}
                </Link>
            )
        }
    },
    {

        accessorKey: "saved",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Favoris" />
        ),
        cell: ({ row }) => {
            const savedOffer = row.original

            return (
                <SaveOffer offerId={savedOffer.offerId} userId={savedOffer.userId} />
            )
        }
    },
    // {
    //     accessorKey: "updatedAt",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Date de modification" />
    //     ),
    //     cell: ({ row }) => {
    //         const offer = row.original

    //         return (
    //             <span className="text-sm font-semibold ">
    //                 {new Date(offer.updatedAt).toLocaleDateString()} à {new Date(offer.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    //             </span>
    //         )
    //     }
    // },
    // {
    //     id: "actions",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Actions" />
    //     ),
    //     cell: ({ row }) => {
    //         const offer = row.original

    //         return (
    //             <><Dialog>
    //                 <DropdownMenu>
    //                     <DropdownMenuTrigger asChild>
    //                         <Button variant="ghost" className="h-8 w-8 p-0">
    //                             <span className="sr-only">Ouvrir le menu</span>
    //                             <MoreHorizontal className="h-4 w-4" />
    //                         </Button>
    //                     </DropdownMenuTrigger>
    //                     <DropdownMenuContent align="end">
    //                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                         <DropdownMenuItem >
    //                             <Link href={`/offres-mentorat/${offer.id}`}>
    //                                 Voir l'offre
    //                             </Link>
    //                         </DropdownMenuItem>
    //                         <DropdownMenuSeparator />
    //                         <DropdownMenuItem>
    //                             <Link href={`/offres-mentorat/modifier/${offer.id}`}>
    //                                 Modifier l'offre
    //                             </Link>
    //                         </DropdownMenuItem>
    //                         <DropdownMenuItem>
    //                             <DialogTrigger className="text-destructive">Supprimer l'offre</DialogTrigger>
    //                         </DropdownMenuItem>
    //                     </DropdownMenuContent>
    //                 </DropdownMenu>
    //                 <ModalDelete
    //                     objectToDelete={row.original.id}
    //                     label="l'offre"
    //                     labelSuccess="L'offre a bien été supprimée"
    //                     url="/api/offers/"
    //                 />
    //             </Dialog>
    //             </>
    //         )
    //     },
    // },
]
