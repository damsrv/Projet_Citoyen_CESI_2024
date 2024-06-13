import {Offer, Prisma} from "@prisma/client";
import H4 from "@/components/ui/Typography/h4";
import H2 from "@/components/ui/Typography/h2";
import Muted from "@/components/ui/Typography/muted";
import OfferGetPayload = Prisma.OfferGetPayload;
import ComTypeBadge from "@/components/OfferDetails/OfferInfos/ComTypeBadge/ComTypeBadge";
import {Button} from "@/components/ui/button";

interface OfferInfosProps {
    offer: OfferGetPayload<{ include: { offerComTypes: { include: { comType: true } } } }>
}

export default async function OfferInfos({offer}: OfferInfosProps) {
    return (
        <div className="p-4 bg-secondary-light flex flex-1 flex-col rounded-md space-y-2">
            <header>
                <H2>{offer.title}</H2>
                <Muted>Publiée le {offer.createdAt.toLocaleDateString()}</Muted>
            </header>
            <main className="space-y-2 flex grow flex-col">
                <section className="flex flex-col">
                    <H4>Description :</H4>
                    <p>{offer.content}</p>
                </section>
                <section>
                    <H4 className="mb-1">Moyens de communication :</H4>
                    <ul className="flex flex-wrap gap-3">
                        {offer.offerComTypes.map((comType, idx) => {
                            return (
                                <ComTypeBadge comType={comType.comType} key={idx}/>
                            )
                        })}
                    </ul>
                </section>
            </main>
            <section className="flex justify-end">
                <Button>
                    Envoyer une demande
                </Button>
            </section>
        </div>
    )
}