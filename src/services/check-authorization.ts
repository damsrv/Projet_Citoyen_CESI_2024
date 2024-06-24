"use server";

import { Session } from "next-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const isOfferOwner = async (offerMentorId: number) => {
    const session = await getServerSession(authOptions);

    if (session?.user.roleId != 1 || session.user.id != offerMentorId) {
        return false;
    }
    return true;
};
