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
import FollowDemands from "@/components/FollowDemands/FollowDemands";
import OfferStudentGetPayload = Prisma.OfferStudentGetPayload;



const getData = async (session: Session) => {
    // récupérer les infos du user
    const user: UserGetPayload<{
        include: { offerStudents: { include: { student: true, offer: { include: { mentor: true } } } } }
    }> | null = await prisma.user.findFirst(
        {
            where: { id: session.user.id },
            include: {
                offerStudents: {
                    include: {
                        student: true,
                        offer: { include: { mentor: true } }
                    }
                },
            }

        }
    )

    return user
}

export default async function Profile() {
    const session = await getServerSession(authOptions);
    const user = (await getData(session!))!;

    let offerStudents: OfferStudentGetPayload<{
        include: { offer: { include: { mentor: true } }, student: true }
    }>[] = user.offerStudents || [];

    // Trier les offerStudents par la date
    offerStudents = offerStudents.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })


    return (
        <div className="items-start gap-5 grow">
            <div className="bg-white p-5 border w-full rounded-lg">
                <div className="flex flex-col gap-2 md:flex-row md:justify-between mb-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between md:gap-4">
                        <H1 className="text-xl lg:text-xl">Suivi de mes demandes de contact</H1>
                        <Muted>{user.offerStudents.length} demande(s) de contact</Muted>
                    </div>
                </div>
                <p className="text-gray-600 mb-5">
                    Cet écran vous permet de suivre l'état des demandes de contact que vous avez envoyées aux mentors et les demandes de contact que vous avez reçues des mentors suite à vos demandes de mentorat.
                </p>
                <FollowDemands offerStudents={offerStudents} />
            </div>
        </div>
    );
}
