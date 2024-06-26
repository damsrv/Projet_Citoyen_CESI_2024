"use client"

import {ReactNode, useState} from "react";
import {CurrentConversationContext} from "@/context/CurrentConversationContext";
import {OffersList, OffersListContext} from "@/context/OffersListContext";

export default function OffersListProvider({children}: { children: ReactNode }) {
    const [offers, setOffers] = useState<OffersList>([])

    return (
        <OffersListContext.Provider
            value={{offers: offers, setOffers: setOffers}}>
            {children}
        </OffersListContext.Provider>
    )
}