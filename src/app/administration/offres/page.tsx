import H1 from '@/components/ui/Typography/h1'
import React from 'react'
import prisma from '@/lib/prisma'
import UserTable from '@/components/UserTable/UserTable'
import OfferGetPayload = Prisma.OfferGetPayload;
import { Prisma } from "@prisma/client";
import OfferTable from "@/components/OfferTable/OfferTable";



const getData = async () => {
    // récupérer les infos du user
    const offers: OfferGetPayload<{ include: { mentor: true, category: { include: { categoryType: true } } } }>[] = await prisma.offer.findMany(
        {
            include: {
                mentor: true,
                category: {
                    include: {
                        categoryType: true
                    }
                },
                offerComTypes: {
                    include: {
                        comType: true
                    }
                }
            }
        }
    )

    return offers
}


const page = async () => {

    const offers = await getData();

    return (
        <>
            <H1>Offres</H1>
            <div className="bg-white px-5 border rounded-lg" >

                <OfferTable offers={offers} />

            </div>
        </>
    )
}

export default page