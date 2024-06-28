import {createContext, Dispatch, SetStateAction} from "react";
import {UserRoles} from "@/context/RoleContext";
import {Prisma} from "@prisma/client";
import OfferGetPayload = Prisma.OfferGetPayload;

export type OffersList = OfferGetPayload<{
    include: { mentor: true, category: { include: { categoryType: true } } }
}>[]

interface OffersListContext {
    canFilter: boolean
    setCanFilter: Dispatch<SetStateAction<boolean>>
}

export const OffersListContext = createContext<OffersListContext>({
    canFilter: false,
    setCanFilter: () => null
});