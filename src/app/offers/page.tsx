import H2 from "@/components/ui/Typography/h2";
import OfferCard from "@/components/OfferCard/OfferCard";
import prisma from "@/lib/prisma";

export default async function MentoringPage() {
    const offer = await prisma.offers.findFirst({
        where: {
            id: 1,
        },
        include: {
            users: true
        }
    })
    console.log(offer);
    return (
        <div>
            <H2>Liste des offres de mentorat</H2>
            <ul>
                {/*<OfferCard offer={offer}/>*/}
            </ul>
        </div>
    )
}