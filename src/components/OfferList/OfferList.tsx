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
import {Loader2} from "lucide-react";

interface OfferListProps {
    nbOfPages: number;
}

export default function OfferList() {
    const {offers, setOffers, nbOfPages, setNbOfPages} = useContext(OffersListContext)
    const searchParams = useSearchParams()

    const pathname = usePathname()
    const {replace, push} = useRouter()

    async function getPaginatedOffers(params: URLSearchParams) {
        try {
            const res = await fetch(`/api/offers?${params.toString()}`)
            if (!res.ok) {
                toast.error("Filtres invalides")
                push("/offres-mentorat")
            } else {
                return await res.json()
            }
        } catch (e) {

        }
    }

    async function getCount(params: URLSearchParams) {
        try {
            const res = await fetch(`/api/offers?count=true&${params.toString()}`)
            if (!res.ok) {
                toast.error("Filtres invalides")
                push("/offres-mentorat")
            } else {
                return await res.json()
            }
        } catch (e) {

        }
    }

    function getPreviousPageSearchParams(params: URLSearchParams, currentPageNumber: number) {
        const newParams = new URLSearchParams(params);

        if (currentPageNumber > 1) {
            newParams.set('page', String(currentPageNumber - 1))
        }
        return newParams;
    }

    function getNextPageSearchParams(params: URLSearchParams, currentPageNumber: number) {
        const newParams = new URLSearchParams(params);

        if (currentPageNumber < nbOfPages) {
            newParams.set('page', String(currentPageNumber + 1))
        }

        return newParams;
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (params.get("page") === null || parseInt(params.get("page")!) <= 0 || isNaN(parseInt(params.get("page")!)) || parseInt(params.get('page')!) > nbOfPages) {
            params.set("page", "1")
        }

        replace(`${pathname}?${params.toString()}`)

        getCount(params).then(data => {
            setNbOfPages(Math.ceil(data / 20))
        })

        getPaginatedOffers(params).then(data => {
            setOffers(data)
        })
    }, [searchParams])

    return (
        <>
            {offers.length > 0 ? (
                    <ul className="grid grid-cols-1 px-4 md:px-0 md:grid-cols-2 lg:grid-cols-3 my-5 gap-3">
                        {offers.map((offer) => {
                            return (
                                <OfferCard offer={offer} key={offer.id}/>
                            )
                        })}
                    </ul>
                )
                :
                (
                    <div>
                        <p>Aucun résultat ne correspond à votre recherche</p>
                    </div>
                )
            }


            <Pagination className="py-4">
                <PaginationContent>
                    {nbOfPages > 1 && (
                        <>
                            {parseInt(searchParams.get("page")!) !== 1 &&
                                (
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href={`/offres-mentorat?page=${getPreviousPageSearchParams(searchParams, parseInt(searchParams.get("page")!))}`}/>
                                    </PaginationItem>
                                )}
                            {Array(nbOfPages).fill(0).map((_, idx) => {
                                const position = idx + 1
                                const params = new URLSearchParams(searchParams);
                                params.set("page", position.toString());
                                if (position < 3) {
                                    return (
                                        <PaginationItem key={idx}>
                                            <PaginationLink href={`${pathname}?${params}`} className={position === parseInt(searchParams.get('page')!) ? "opacity-50 pointer-events-none" : ""}>{position}</PaginationLink>
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
                                <PaginationNext href={`/offres-mentorat?${getNextPageSearchParams(searchParams, parseInt(searchParams.get("page")!))}`} />
                            </PaginationItem>
                        </>
                    )}
                </PaginationContent>
            </Pagination>
        </>
    )
}
