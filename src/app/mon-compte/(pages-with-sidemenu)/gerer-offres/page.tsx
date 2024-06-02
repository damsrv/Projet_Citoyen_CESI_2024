import FormProfile from "@/components/Profile/FormProfile";
import H1 from "@/components/ui/Typography/h1";
import Muted from "@/components/ui/Typography/muted";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import UserGetPayload = Prisma.UserGetPayload;
import { Prisma } from "@prisma/client";
import ChangePasswordForm from "@/components/ManageAccount/ChangePasswordForm";
import ChangeEmailForm from "@/components/ManageAccount/ChangeEmailForm";
import DeleteAccount from "@/components/ManageAccount/DeleteAccount";


const getData = async (session: Session) => {
    // récupérer les infos du user
    const user: UserGetPayload<{
        include: { offers: true }
    }> | null = await prisma.user.findFirst(
        {
            where: { id: session.user.id },
            include: {
                offers: true
            }
        }
    )

    return user
}

export default async function Profile() {
    const session = await getServerSession(authOptions);
    const user = (await getData(session!))!;

    return (
        <div className="grid lg:grid-cols-2 items-start gap-5 grow ">
            <div className="bg-white p-5 border w-full rounded-lg">
                <H1 className="text-xl lg:text-xl">Gérer mes offres</H1>

                {/* <OfferTable offers={user.offers} /> */}
            </div>
        </div>
    );
}
