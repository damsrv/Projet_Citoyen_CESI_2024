import prisma from "@/lib/prisma";
import H3 from "@/components/ui/Typography/h3";
import FilterForm from "@/components/FilterForm/FilterForm";
import OfferList from "@/components/OfferList/OfferList";
import OffersListProvider from "@/components/Providers/OffersListProvider/OffersListProvider";
import type {Metadata} from "next";
import {Prisma} from "@prisma/client";
import OfferFindManyArgs = Prisma.OfferFindManyArgs;

export const metadata: Metadata = {
    title: "Liste des offres",
    description: "Trouvez un mentor pour vous accompagner dans votre projet professionnel.",
};

export default async function MentoringPage({searchParams}: {
    searchParams?: URLSearchParams
}) {
    const categoryTypes = await prisma.categoryType.findMany({include: {categories: true}});
    const categories = await prisma.category.findMany();

    const params = new URLSearchParams(searchParams);

    const OFFERS_BY_PAGE = 20;

    let prismaArgs: OfferFindManyArgs = {
        include: {
            mentor: true,
            category: {
                include: {
                    categoryType: true
                }
            }
        }
    }

    if (params) {
        if (params.get("page") !== null) {
            let value = parseInt(params.get("page")!);
            if (isNaN(value) || value <= 0) {
                value = 1
            }

            prismaArgs = {
                ...prismaArgs,
                skip: (value - 1) * OFFERS_BY_PAGE,
                take: OFFERS_BY_PAGE,
            }
        }

        if (params.get("category") !== null) {
            const value = parseInt(params.get("category")!);

            try {
                await prisma.category.findFirst({
                    where: {
                        id: value
                    }
                })

                prismaArgs.where = {
                    categoryId: value,
                }
            } catch (e) {
                params.delete("category")
            }
        }

        if (params.get("categoryType") !== null) {
            const value = parseInt(params.get("categoryType")!);

            try {
                await prisma.categoryType.findFirst({
                    where: {
                        id: value
                    }
                })

                prismaArgs.where = {
                    ...prismaArgs.where,
                    AND: {
                        category: {
                            categoryTypeId: value
                        }
                    }
                }
            } catch (e) {
                params.delete("categoryType")
            }
        }
    }

    const numberOfRows = await prisma.offer.count({
        where: prismaArgs.where,
    })

    const nbOfPages = Math.ceil(numberOfRows / OFFERS_BY_PAGE);

    return (
        <div className="bg-secondary-light">
            <OffersListProvider>
                <section className="px-4 md:px-0 py-5 md:py-10 bg-white">
                    <div className="container-custom">
                        <H3>Filtres</H3>
                        <FilterForm categoryTypes={categoryTypes} categories={categories}/>
                    </div>
                </section>
                <section className="flex w-full grow py-3 container-custom min-h-80">
                    <OfferList nbOfPages={nbOfPages}/>
                </section>
            </OffersListProvider>
        </div>
    )
}