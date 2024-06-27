import prisma from "@/lib/prisma";
import H3 from "@/components/ui/Typography/h3";
import FilterForm from "@/components/FilterForm/FilterForm";
import OfferList from "@/components/OfferList/OfferList";
import OffersListProvider from "@/components/Providers/OffersListProvider/OffersListProvider";
import type {Metadata} from "next";
import {Suspense} from "react";
import {Loader2} from "lucide-react";

export const metadata: Metadata = {
    title: "Liste des offres",
    description: "Trouvez un mentor pour vous accompagner dans votre projet professionnel.",
};

export default async function MentoringPage({searchParams}: {
    searchParams?: { [key: string]: string | string[] | undefined }
}) {
    const categoryTypes = await prisma.categoryType.findMany({include: {categories: true}});
    const categories = await prisma.category.findMany();

    return (
        <div className="bg-secondary-light">
            <OffersListProvider>
                <section className="px-4 md:px-0 py-5 md:py-10 bg-white">
                    <div className="container-custom">
                        <H3>Filtres</H3>
                        <FilterForm categoryTypes={categoryTypes} categories={categories}/>
                    </div>
                </section>
                <section className="py-3 container-custom">
                    <Suspense fallback={
                        <div className="flex grow">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin text-black"/>
                        </div>
                    }>
                        <OfferList/>
                    </Suspense>
                </section>
            </OffersListProvider>
        </div>
    )
}