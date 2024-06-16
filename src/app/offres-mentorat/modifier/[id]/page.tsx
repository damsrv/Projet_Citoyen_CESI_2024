import OfferForm from '@/components/OfferForm/OfferForm';
import React from 'react';
import H1 from "@/components/ui/Typography/h1";
import Muted from "@/components/ui/Typography/muted";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { OfferStatus } from '@/enums/offerStatus';
import OfferGetPayload = Prisma.OfferGetPayload;


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

const getOfferData = async (id: number) => {
    const offer: OfferGetPayload<{
        include: { offerComTypes: { include: { comType: true } } }
    }> | null = await prisma.offer.findFirst({
        where: {
            id: id
        },
        include: {
            offerComTypes: {
                include: {
                    comType: true
                }
            }
        }
    })

    if (offer === null) {
        return undefined
    }
    return {
        id: offer.id,
        content: offer.content || "",
        location: offer.location || "",
        title: offer.title || "",
        status: offer.status.toString(),
        categoryId: offer.categoryId.toString(),
        offerComTypes: offer.offerComTypes.map((offerComType) => {
            return offerComType.comTypeId
        })
    }
}


export default async function EditOfferPage({ params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);

    const comTypes = await getComTypes();
    const categories = await getCategories();

    const offerData = await getOfferData(parseInt(params.id));

    const status = [{ id: 1, label: "Publiée" }, { id: 2, label: "Brouillon" }, { id: 3, label: "Archivée" }]


    return (
        <main className="min-h-screen bg-secondary-light">
            <section
                className=" flex flex-col items-center justify-center gap-5  py-10 md:flex-row md:gap-10 container-custom lg:py-20">
                <OfferForm userId={session?.user.id!} defaultData={offerData!}
                    comTypes={comTypes}
                    status={status}
                    categories={categories}
                />
            </section>
        </main>
    )
}