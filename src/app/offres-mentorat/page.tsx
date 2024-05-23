import H2 from "@/components/ui/Typography/h2";
import OfferCard from "@/components/OfferCard/OfferCard";
import prisma from "@/lib/prisma";

export default async function MentoringPage() {
    const offers = await prisma.offer.findMany({
        include: {
            mentor: true
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