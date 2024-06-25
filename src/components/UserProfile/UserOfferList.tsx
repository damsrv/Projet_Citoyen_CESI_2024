import React from "react";
import H2 from "@/components/ui/Typography/h2";
import OfferCard from "@/components/OfferCard/OfferCard";
import { Prisma } from "@prisma/client";
import OfferGetPayload = Prisma.OfferGetPayload;

const UserOfferList = ({
    offers,
}: {
    offers: OfferGetPayload<{
        include: {
            mentor: true;
            category: { include: { categoryType: true } };
        };
    }>[];
}) => {
    return (
        <section className="pt-5">
            <H2 className="px-4 !mb-4">Liste des offres</H2>
            {offers.length > 0 ? (
                <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {offers.map((offer) => {
                        return <OfferCard offer={offer} key={offer.id} />;
                    })}
                </ul>
            ) : (
                <p className="px-4">Aucune offre renseignée</p>
            )}
        </section>
    );
};

export default UserOfferList;
