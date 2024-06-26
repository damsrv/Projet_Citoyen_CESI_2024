import prisma from "@/lib/prisma";
import React from "react";
import UserOfferList from "@/components/UserProfile/UserOfferList";
import UserProfil from "@/components/UserProfile/UserProfile";
import H1 from "@/components/ui/Typography/h1";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profil",
    description: "Profil",
};


const getData = async (id: number) => {
    const user = await prisma.user.findFirst({
        where: { id: id },
        include: {
            offers: {
                include: {
                    mentor: true,
                    category: {
                        include: { categoryType: true },
                    },
                },
            },
            userSkills: {
                include: {
                    skill: true,
                },
            },
        },
    });
    return user;
};

const ProfilPage = async ({ params }: { params: { id: string } }) => {


    const user = await getData(parseInt(params.id));
    metadata.title = user?.firstname + " " + user?.lastname;
    metadata.description = user?.description;

    if (!user) {
        return (
            <div>
                <H1>Utilisateur non trouvé</H1>
            </div>
        );
    }

    return (
        <div className="bg-primary-background grow px-4">
            <div className="container-custom py-10 flex flex-col gap-5 grow w-full">
                <UserProfil user={user} />
                <UserOfferList offers={user.offers} />
            </div>
        </div>
    );
};

export default ProfilPage;
