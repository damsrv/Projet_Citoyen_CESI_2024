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
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gérer mon compte",
    description: "Gérer mon compte",
};


export default async function Profile() {
    const session = await getServerSession(authOptions);

    return (
        <div className="grid lg:grid-cols-2 items-start gap-5 grow ">
            <div className="bg-white p-5 border w-full rounded-lg">
                <div className="flex flex-col lg:flex-row items-start lg:justify-between lg:items-center mb-5">
                    <H1 className="text-xl lg:text-xl">Modifier le mot de passe</H1>
                    <Muted>* champs obligatoires</Muted>
                </div>

                <ChangePasswordForm userId={session?.user.id!} />
            </div>
            <div className="flex flex-col justify-start gap-5 grow ">
                {/* TODO : Cacher la modification d'email quand l'utilisateur s'est inscrit avec Google/Facebook */}
                <div className="bg-white p-5 border w-full rounded-lg">
                    <H1 className="text-xl lg:text-xl mb-5">Modifier l'email</H1>
                    <ChangeEmailForm defaultData={{ email: session?.user.email ?? "" }} userId={session?.user.id!} />
                </div>
                <div className="bg-white p-5 border w-full rounded-lg">
                    <H1 className="text-xl lg:text-xl mb-5">Supprimer le compte</H1>

                    <DeleteAccount userId={session?.user.id!} />
                </div>
            </div>
        </div>
    );
}
