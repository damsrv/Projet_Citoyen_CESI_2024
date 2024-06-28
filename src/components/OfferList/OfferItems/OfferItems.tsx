"use client"

import OfferCard from "@/components/OfferCard/OfferCard";
import {OffersList} from "@/context/OffersListContext";

export default function OfferListItems({offers}: { offers: OffersList }) {
    return (<ul className="grid grid-cols-1 px-4 md:px-0 md:grid-cols-2 lg:grid-cols-3 my-5 gap-3">
        {offers.map((offer) => {
            return (
                <OfferCard offer={offer} key={offer.id}/>
            )
        })}
    </ul>)
}