import {createContext, Dispatch, SetStateAction} from "react";

export const enum UserRoles {
    Mentor = "mentor",
    Mentored = "mentored",
}

interface RoleContext {
    currentRole: UserRoles | undefined,
    setCurrentRole: Dispatch<SetStateAction<UserRoles | undefined>>
}

export const RoleContext = createContext<RoleContext>({currentRole: undefined, setCurrentRole: () => null})