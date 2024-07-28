import OfferForm from '@/components/OfferForm/OfferForm';
import React from 'react';
import H1 from "@/components/ui/Typography/h1";
import Muted from "@/components/ui/Typography/muted";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import UserGetPayload = Prisma.UserGetPayload;
import { Prisma } from "@prisma/client";
import { OfferStatus } from '@/enums/offerStatus';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nouvelle offre",
    description: "Nouvelle offre",
};


const getComTypes = async () => {
    // récupérer les infos du user
    const comTypes = await prisma.comType.findMany(
        {}
    )

    return comTypes.map((comType) => {
        return { id: comType.id, label: comType.name }
    })
}


const getCategories = async () => {
    const categories = await prisma.category.findMany({
        include: {
            categoryType: true
        }
    })
    let categorizedCategories:
        {
            categoryTypeLabel: string,
            children: { id: number, label: string }[]
        }[]
        = [];

    categories.forEach((category) => {
        let categoryTypeID: number = category.categoryTypeId!
        let categoryTypeLabel = category.categoryType!.name
        let child = { id: category.id, label: category.name! }

        if (categorizedCategories[categoryTypeID] === undefined) {
            categorizedCategories[categoryTypeID] = { categoryTypeLabel: categoryTypeLabel!, children: [child] }
        }
        else {
            categorizedCategories[categoryTypeID].children.push(child)
        }
    }
    )
    return categorizedCategories;
}

export default async function NewOfferPage() {

    const session = await getServerSession(authOptions);

    const comTypes = await getComTypes();
    const categories = await getCategories();


    const status = [{ id: 1, label: "Publiée" }, { id: 2, label: "Brouillon" }]


    return (
        <main className="min-h-screen bg-secondary-light">
            <section
                className=" flex flex-col items-center justify-center gap-5  py-10 md:flex-row md:gap-10 container-custom lg:py-20">
                <OfferForm userId={session?.user.id!} defaultData={{
                    id: undefined,
                    content: "",
                    location: "",
                    title: "",
                    status: undefined,
                    categoryId: undefined,
                    offerComTypes: [],
                }}
                    comTypes={comTypes}
                    status={status}
                    categories={categories}
                />
            </section>
        </main>
    )
}