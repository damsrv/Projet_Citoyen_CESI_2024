"use client"

import {ReactNode, useState} from "react";
import {CurrentConversationContext} from "@/context/CurrentConversationContext";
import {OffersList, OffersListContext} from "@/context/OffersListContext";

export default function OffersListProvider({children}: { children: ReactNode }) {
    const [canFilter, setCanFilter] = useState<boolean>(true)

    return (
        <OffersListContext.Provider
            value={{canFilter: canFilter, setCanFilter}}>
            {children}
        </OffersListContext.Provider>
    )
}