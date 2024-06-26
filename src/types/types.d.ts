import { Offer, User } from "@prisma/client";

type UserTableType = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    registerAt: Date;
    role: {
        id : number;
        name: string;
    };
    offers : Offer[];
};


type ReportTableType = {
    id: number;
    status: number;
    reporter: User;
    target: User;
    createdAt: Date;
    message: string;
    reason: string;
};

type SavedOfferTableType = {
    userId : number;
    offerId : number;
    offer : Offer;
}




export type { UserTableType, ReportTableType, SavedOfferTableType };