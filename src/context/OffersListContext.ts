import {createContext, Dispatch, SetStateAction} from "react";
import {UserRoles} from "@/context/RoleContext";
import {Prisma} from "@prisma/client";
import OfferGetPayload = Prisma.OfferGetPayload;

export type OffersList = OfferGetPayload<{
    include: { mentor: true, category: { include: { categoryType: true } } }
}>[]

interface OffersListContext {
    offers: OffersList,
    setOffers: Dispatch<SetStateAction<OffersList>>
}

export const OffersListContext = createContext<OffersListContext>({
    offers: [],
    setOffers: () => null
});