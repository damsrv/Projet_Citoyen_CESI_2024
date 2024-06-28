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
import OfferListItems from "@/components/OfferList/OfferItems/OfferItems";
import {QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";

interface OfferListProps {
    nbOfPages: number;
}

export default function OfferList({nbOfPages}: OfferListProps) {
    const searchParams = useSearchParams()

    const {setCanFilter} = useContext(OffersListContext)

    const offersQuery = useQuery({
        queryKey: ["offers"], queryFn: async () => {
            const params = new URLSearchParams(searchParams);
            const res = await fetch(`/api/offers?${searchParams.toString()}`)
            if (!res.ok) {
                toast.error("Filtres invalides")
                push("/offres-mentorat?page=1")
            } else {
                return await res.json()
            }
        }
    })

    useEffect(() => {
        offersQuery.refetch().then()
    }, [searchParams]);

    const pathname = usePathname()
    const {replace, push} = useRouter()

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

    if (offersQuery.isLoading || offersQuery.isRefetching) {
        return (
            <div className="flex grow w-full justify-center items-center">
                <Loader2 className="w-7 h-7 animate-spin"/>
            </div>
        )
    }

    if (offersQuery.error) {
        return (
            <Button onClick={() => offersQuery.refetch()}>Réessayer</Button>
        )
    }

    return (
        <div>
            <OfferListItems offers={offersQuery.data}/>
            <Pagination className="py-4">
                <PaginationContent>
                    {nbOfPages > 1 && (
                        <>
                            {parseInt(searchParams.get("page")!) !== 1 &&
                                (
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href={`/offres-mentorat?${getPreviousPageSearchParams(searchParams, parseInt(searchParams.get("page")!))}`}/>
                                    </PaginationItem>
                                )}
                            {Array(nbOfPages).fill(0).map((_, idx) => {
                                const position = idx + 1
                                const params = new URLSearchParams(searchParams);
                                params.set("page", position.toString());
                                if (position < 3) {
                                    return (
                                        <PaginationItem key={idx}>
                                            <PaginationLink href={`${pathname}?${params}`}
                                                            className={position === parseInt(searchParams.get('page')!) ? "opacity-50 pointer-events-none" : ""}>{position}</PaginationLink>
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
                            {parseInt(searchParams.get("page")!) !== nbOfPages &&
                                (
                                    <PaginationItem>
                                        <PaginationNext
                                            href={`/offres-mentorat?${getNextPageSearchParams(searchParams, parseInt(searchParams.get("page")!))}`}/>
                                    </PaginationItem>
                                )
                            }
                        </>
                    )}
                </PaginationContent>
            </Pagination>

        </div>
    )
}
