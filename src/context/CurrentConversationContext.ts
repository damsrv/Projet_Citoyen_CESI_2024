import {createContext, Dispatch, SetStateAction} from "react";
import {UserRoles} from "@/context/RoleContext";

interface CurrentConversationContext {
    currentConversationId: number | undefined,
    setCurrentConversationId: Dispatch<SetStateAction<number | undefined>>
}

export const CurrentConversationContext = createContext<CurrentConversationContext>({currentConversationId: undefined, setCurrentConversationId:() => null});