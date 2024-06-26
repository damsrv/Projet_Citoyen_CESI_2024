import SavedOfferTable from "@/components/SavedOfferTable/SavedOfferTable";
import H1 from "@/components/ui/Typography/h1";
import Muted from "@/components/ui/Typography/muted";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import UserGetPayload = Prisma.UserGetPayload;
import { Prisma } from "@prisma/client";



const getData = async (session: Session) => {
    // récupérer les infos du user
    const user: UserGetPayload<{
        include: {
            savedOffers: {
                include: {
                    offer: true
                }
            }
        }
    }> | null = await prisma.user.findFirst(
        {
            where: { id: session.user.id },
            include: {
                savedOffers: {
                    include: {
                        offer: true
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

    return (
        <div className=" items-start gap-5 grow ">
            <div className="bg-white p-5 border w-full rounded-lg">
                <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                    <div className="flex items-center justify-between gap-4">
                        <H1 className="text-xl lg:text-xl">Mes offres favorites</H1>
                        <Muted>{user.savedOffers.length} offre(s)</Muted>
                    </div>

                </div>

                <SavedOfferTable savedOffers={user.savedOffers} />
            </div>
        </div>
    );
}
