import FormProfile from "@/components/Profile/FormProfile";
import H1 from "@/components/ui/Typography/h1";
import Muted from "@/components/ui/Typography/muted";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import UserGetPayload = Prisma.UserGetPayload;
import { Prisma } from "@prisma/client";
import { CircleCheck } from "lucide-react";


export default async function Supression() {

    return (
        <div className="flex flex-col justify-center items-center gap-5 grow ">
            <CircleCheck className="text-positive" size={100} />
            <H1 className="font-semibold">Compte supprimé avec succès</H1>
            <p className=" text-xl">Votre compte et toutes vos informations ont été supprimées</p>

        </div>
    );
}
