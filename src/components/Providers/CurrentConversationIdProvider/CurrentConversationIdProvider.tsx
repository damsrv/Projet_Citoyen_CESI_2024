"use client"

import {ReactNode, useState} from "react";
import {CurrentConversationContext} from "@/context/CurrentConversationContext";

export default function CurrentConversationIdProvider({children}: { children: ReactNode }) {
    const [currentConversationId, setCurrentConversationId] = useState<number | undefined>(undefined)

    return (
        <CurrentConversationContext.Provider
            value={{currentConversationId: currentConversationId, setCurrentConversationId: setCurrentConversationId}}>
            {children}
        </CurrentConversationContext.Provider>
    )
}