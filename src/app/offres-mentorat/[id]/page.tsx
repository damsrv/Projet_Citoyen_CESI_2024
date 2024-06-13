import prisma from "@/lib/prisma";
import OfferInfos from "@/components/OfferDetails/OfferInfos/OfferInfos";
import MentorInfos from "@/components/OfferDetails/MentorInfos/MentorInfos";

export default async function OfferIdPage({params}: { params: { id: string } }) {

    const offer = await prisma.offer.findFirst({
        where: {id: parseInt(params.id)},
        include: {
            mentor: true,
            offerComTypes: {
                include: {
                    comType: true
                }
            }
        }
    })

    return (
        <main className="container-custom py-5 flex grow w-full">
            {offer ? (
                    <section className="flex gap-10 w-full">
                        <OfferInfos offer={offer}/>
                        <MentorInfos mentor={offer.mentor}/>
                    </section>
                )
                :
                (
                    <section>
                        Chargement...
                    </section>
                )
            }
        </main>
    )
}