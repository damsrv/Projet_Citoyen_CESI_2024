"use client"

import {Offer, Prisma} from "@prisma/client";
import OfferGetPayload = Prisma.OfferGetPayload;
import OfferCard from "@/components/OfferCard/OfferCard";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {permanentRedirect, redirect, useParams, usePathname, useRouter, useSearchParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import prisma from "@/lib/prisma";
import toast from "react-hot-toast";
import {OffersListContext} from "@/context/OffersListContext";

interface OfferListProps {
    nbOfPages: number;
}

export default function OfferList() {
    const [nbOfPages, setNbOfPages] = useState<number>(1)

    const {offers, setOffers} = useContext(OffersListContext)
    const searchParams = useSearchParams()

    const pathname = usePathname()
    const {replace, push} = useRouter()

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (params.get("page") === null || parseInt(params.get("page")!) <= 0 || isNaN(parseInt(params.get("page")!)) || parseInt(params.get('page')!) > nbOfPages) {
            params.set("page", "1")
        }

        replace(`${pathname}?${params.toString()}`)

        async function getPaginatedOffers() {
            try {
                const res = await fetch(`/api/offers?${params.toString()}`)
                if (!res.ok) {
                    toast.error("Filtres invalides")
                    push("/offres-mentorat")
                } else {
                    const data = await res.json();
                    setOffers(data)
                }
            } catch (e) {

            }
        }

        getPaginatedOffers()
    }, [searchParams])

    return (
        <>
            {offers.length > 0 ? (
                <>
                    <ul className="grid grid-cols-2 lg:grid-cols-3 my-5 gap-3">
                        {offers.map((offer) => {
                            return (
                                <OfferCard offer={offer} key={offer.id}/>
                            )
                        })}
                    </ul>

                    <Pagination>
                        <PaginationContent>
                            {nbOfPages >= 1 && (
                                <>
                                    <PaginationItem>
                                        <PaginationPrevious href={`/offres-mentorat?page=${searchParams.get("page")}`}/>
                                    </PaginationItem>
                                    {Array(nbOfPages).fill(0).map((_, idx) => {
                                        const position = idx + 1

                                        if (position < 3) {
                                            return (
                                                <PaginationItem key={idx}>
                                                    <PaginationLink href="#">1</PaginationLink>
                                                </PaginationItem>
                                            )
                                        }

                                        if (position === 3) {
                                            return (
                                                <PaginationItem key={idx}>
                                                    <PaginationEllipsis/>
                                                </PaginationItem>
                                            )
                                        }

                                    })}
                                    <PaginationItem>
                                        <PaginationNext href="#"/>
                                    </PaginationItem>
                                </>
                            )}
                        </PaginationContent>
                    </Pagination>
                </>
            )
            :
                (
                    <div className="flex h-full w-full">
                        Aucun résultat ne correspond à votre recherche.
                    </div>
                )
            }

        </>
    )
}