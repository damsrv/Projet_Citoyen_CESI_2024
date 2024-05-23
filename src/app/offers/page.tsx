import H2 from "@/components/ui/Typography/h2";
import OfferCard from "@/components/OfferCard/OfferCard";
import prisma from "@/lib/prisma";
import {Offers, Prisma, Users} from "@prisma/client";
import OffersGetPayload = Prisma.OffersGetPayload;

type OfferWithUser = OffersGetPayload<{ include: { users: true } }>

export default async function MentoringPage() {
    const offers: OfferWithUser[] = await prisma.offers.findMany({
        where: {
            id: 1,
        },
        include: {
            users: true
        }
    })
    return (
        <div>
            <H2>Liste des offres de mentorat</H2>
            <ul>
                {offers.map((offer) => {
                    return (
                        <OfferCard offer={offer} key={offer.id}/>
                    )
                })}
            </ul>
        </div>
    )
}