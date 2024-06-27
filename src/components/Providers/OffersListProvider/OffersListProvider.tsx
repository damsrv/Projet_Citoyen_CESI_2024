"use client"

import {ReactNode, useState} from "react";
import {CurrentConversationContext} from "@/context/CurrentConversationContext";
import {OffersList, OffersListContext} from "@/context/OffersListContext";

export default function OffersListProvider({children}: { children: ReactNode }) {
    const [offers, setOffers] = useState<OffersList>([])
    const [nbOfPages, setNbOfPages] = useState<number>(0)

    return (
        <OffersListContext.Provider
            value={{offers: offers, setOffers: setOffers, nbOfPages: nbOfPages, setNbOfPages: setNbOfPages}}>
            {children}
        </OffersListContext.Provider>
    )
}