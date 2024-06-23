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


type ReportType = {
    id: number;
    status: number;
    reporter: User;
    target: User;
    createdAt: Date;
    message: string;
    reason: string;
};

export type { UserTableType, ReportType };