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
        include: { userSkills: { include: { skill: true } } }
    }> | null = await prisma.user.findFirst(
        {
            where: { email: session.user.email },
            include: {
                userSkills: {
                    include: {
                        skill: true
                    }
                }
            }
        }
    )

    if (user === null) {
        return undefined
    }

    return {
        email: user.email ?? "",
        id: user.id
    }
}

export default async function Profile() {
    const session = await getServerSession(authOptions);

    console.log(await getData(session!))
    const { id, ...userData } = (await getData(session!))!;

    return (
        <div className="grid lg:grid-cols-2 items-start gap-5 grow ">
            <div className="bg-white p-5 border w-full rounded-lg">
                <div className="flex flex-col lg:flex-row items-start lg:justify-between lg:items-center mb-5">
                    <H1 className="text-xl lg:text-xl">Modifier le mot de passe</H1>
                    <Muted>* champs obligatoires</Muted>
                </div>

                <ChangePasswordForm userId={id} />
            </div>
            <div className="flex flex-col justify-start gap-5 grow ">
                {/* TODO : Cacher la modification d'email quand l'utilisateur s'est inscrit avec Google/Facebook */}
                <div className="bg-white p-5 border w-full rounded-lg">
                    <H1 className="text-xl lg:text-xl mb-5">Modifier l'email</H1>
                    <ChangeEmailForm defaultData={userData} userId={id} />
                </div>
                <div className="bg-white p-5 border w-full rounded-lg">
                    <H1 className="text-xl lg:text-xl mb-5">Supprimer le compte</H1>

                    <DeleteAccount userId={id} />
                </div>
            </div>
        </div>
    );
}
