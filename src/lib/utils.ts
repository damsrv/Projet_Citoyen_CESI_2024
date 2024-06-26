import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import prisma from "@/lib/prisma";
import {User} from "@prisma/client";
import {Key} from "react";
import {formatDistanceToNow} from "date-fns";
import {fr} from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


// Exclude keys from user
export function exclude(user: User, keys: Key[]) {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
    );
}

export function getDateDeltaFromNowString(date: Date) {
    return formatDistanceToNow(date, {locale: fr })
}
