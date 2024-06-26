import prisma from "@/lib/prisma";
import H3 from "@/components/ui/Typography/h3";
import FilterForm from "@/components/FilterForm/FilterForm";
import OfferList from "@/components/OfferList/OfferList";
import OffersListProvider from "@/components/Providers/OffersListProvider/OffersListProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Liste des offres",
    description: "Trouvez un mentor pour vous accompagner dans votre projet professionnel.",
};

export default async function MentoringPage({ searchParams }: {
    searchParams?: { [key: string]: string | string[] | undefined }
}) {
    const categoryTypes = await prisma.categoryType.findMany({ include: { categories: true } });
    const categories = await prisma.category.findMany();
    return (
        <div className="container-custom">
            <OffersListProvider>
                <section>
                    <H3>Filtres</H3>
                    <FilterForm categoryTypes={categoryTypes} categories={categories} />
                </section>
                <OfferList />
            </OffersListProvider>
        </div>
    )
}