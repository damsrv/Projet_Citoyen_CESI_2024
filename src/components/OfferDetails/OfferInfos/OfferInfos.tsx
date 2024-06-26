import { Offer, Prisma } from "@prisma/client";
import H4 from "@/components/ui/Typography/h4";
import H2 from "@/components/ui/Typography/h2";
import Muted from "@/components/ui/Typography/muted";
import OfferGetPayload = Prisma.OfferGetPayload;
import ComTypeBadge from "@/components/OfferDetails/OfferInfos/ComTypeBadge/ComTypeBadge";
import { Button } from "@/components/ui/button";
import ContactDialog from "@/components/OfferDetails/OfferInfos/ContactDialog/ContactDialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Underlined } from "@/components/ui/Typography/underlined";
import A from "@/components/ui/Typography/a";
import SaveOffer from "@/components/SaveOffer/SaveOffer";

interface OfferInfosProps {
    offer: OfferGetPayload<{
        include: {
            offerComTypes: { include: { comType: true } }, mentor: {
                include: { offers: true, userSkills: { include: { skill: true } } }
            }
        }
    }>
}

async function userHasAlreadySendContactRequestForOffer(userId: number, offerId: number) {
    const offer = await prisma.offer.findFirst({
        where: {
            id: offerId
        },
        include: {
            offerStudents: true
        }
    })

    if (!offer) {
        throw new Error("Impossible de trouver une offre avec cet id");
    }

    return offer.offerStudents.some((offerStudent) => offerStudent.studentId === userId)
}

export default async function OfferInfos({ offer }: OfferInfosProps) {
    const session = await getServerSession(authOptions);
    const alreadySend = await userHasAlreadySendContactRequestForOffer(session!.user.id, offer.id)

    return (
        <div className="p-5 py-10 lg:py-5 lg:bg-white lg:border lg:rounded-lg flex flex-1 flex-col space-y-2">
            <header className="mb-4 flex justify-between items-center">
                <div>
                    <H2>{offer.title}</H2>
                    <Muted>Publiée le {offer.createdAt.toLocaleDateString()}</Muted></div>
                <SaveOffer offerId={offer.id} userId={session!.user.id} />
            </header>
            <main className="space-y-4 flex grow flex-col">
                <section className="flex flex-col">
                    <H4 className="mb-1.5">Description</H4>
                    <p>{offer.content}</p>
                </section>
                {offer.offerComTypes.length > 0 &&
                    (
                        <section>
                            <H4 className="mb-1.5">Moyens de communication</H4>
                            <ul className="flex flex-wrap gap-3">
                                {offer.offerComTypes.map((comType, idx) => {
                                    return (
                                        <ComTypeBadge comType={comType.comType} key={idx} />
                                    )
                                })}
                            </ul>
                        </section>
                    )
                }
            </main>
            <section className="flex justify-end">
                {alreadySend
                    ?
                    (
                        <Alert>
                            <Info className="h-5 w-5" />
                            <AlertTitle>Demande envoyée !</AlertTitle>
                            <AlertDescription>
                                Vous avez déja envoyé une demande pour cette offre. Consultez-la depuis l'onglet <A href="/mon-compte/suivi-demandes">Mes demandes</A>
                            </AlertDescription>
                        </Alert>
                    )
                    :
                    (
                        <ContactDialog offer={offer} />
                    )
                }
            </section>
        </div>
    )
}