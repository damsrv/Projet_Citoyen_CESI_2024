import {createContext, Dispatch, SetStateAction} from "react";

export const enum UserRoles {
    Mentor = "mentor",
    Mentored = "mentored",
}

interface RoleContext {
    currentRole: UserRoles,
    setCurrentRole: Dispatch<SetStateAction<UserRoles>>
}

export const RoleContext = createContext<RoleContext>({currentRole: UserRoles.Mentor, setCurrentRole: () => null})