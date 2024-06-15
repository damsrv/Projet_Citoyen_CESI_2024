import FormProfile from "@/components/Profile/FormProfile";
import H1 from "@/components/ui/Typography/h1";
import Muted from "@/components/ui/Typography/muted";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import UserGetPayload = Prisma.UserGetPayload;
import { Prisma } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FollowOffers from "@/components/FollowOffers/FollowOffers";
import OfferStudentGetPayload = Prisma.OfferStudentGetPayload;



const getData = async (session: Session) => {
    // récupérer les infos du user
    const user: UserGetPayload<{
        include: { offers: { include: { offerStudents: { include: { student: true, offer: true } } } } }
    }> | null = await prisma.user.findFirst(
        {
            where: { id: session.user.id },
            include: {
                offers: {
                    include: {
                        offerStudents: {
                            include: {
                                student: true,
                                offer: true
                            }
                        },
                    }
                }
            }

        }
    )

    return user
}

export default async function Profile() {
    const session = await getServerSession(authOptions);
    const user = (await getData(session!))!;

    let offerStudents: OfferStudentGetPayload<{
        include: { offer: true, student: true }
    }>[] = [];

    // Récupérer les demandes de contact
    user.offers.forEach((offer) => {
        offer.offerStudents.map((offerStudent) => {
            offerStudents.push(offerStudent)
        })
    })

    // Trier les offerStudents par la date
    offerStudents = offerStudents.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })


    return (
        <div className=" items-start gap-5 grow ">
            <div className="bg-white p-5 border w-full rounded-lg">
                <div className="flex flex-col gap-2 md:flex-row md:justify-between mb-5">
                    <div className="flex items-center justify-between gap-4">
                        <H1 className="text-xl lg:text-xl">Suivi de mes offres</H1>
                        <Muted>{user.offers.length} offre(s)</Muted>
                    </div>

                </div>

                {/* Afficher la liste des demandes de contact & TODO pour plus tard (demandes de mentorat) : liste des réponses à mes propositions de mentorat et leur statut */}

                <FollowOffers offerStudents={offerStudents} />

            </div>
        </div>
    );
}
