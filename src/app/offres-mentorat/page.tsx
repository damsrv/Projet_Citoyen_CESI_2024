import OfferCard from "@/components/OfferCard/OfferCard";
import prisma from "@/lib/prisma";
import H3 from "@/components/ui/Typography/h3";
import FilterForm from "@/components/FilterForm/FilterForm";

export default async function MentoringPage() {
    const offers = await prisma.offer.findMany({
        include: {
            mentor: true,
            category: {
                include: {categoryType: true},
            }
        }
    })

    const categoryTypes = await prisma.categoryType.findMany({include: {categories: true}});
    const categories = await prisma.category.findMany();

    return (
        <div className="container-custom">
            <section>
                <H3>Filtres</H3>
                <FilterForm categoryTypes={categoryTypes} categories={categories}/>
            </section>

            <ul className="grid grid-cols-2 lg:grid-cols-3 my-5 gap-3">
                {offers.map((offer) => {
                    return (
                        <OfferCard offer={offer} key={offer.id}/>
                    )
                })}
            </ul>
        </div>
    )
}