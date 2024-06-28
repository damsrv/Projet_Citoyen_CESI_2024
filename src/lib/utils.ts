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

// schema use in test JEST (sans password)
export const schema = {
  properties: {
    id: { type: 'number' },
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    email: { type: 'string' },
    avatar: { type: ["null", "string"] },
    status: { type: 'number' },
    description: { type: 'string' },
    birthdate: { type: 'string' },
    experiences: { type: ["null", "string"] },
    roleId: { type: 'number' },
    registerAt: { type: 'string' }
  }
}