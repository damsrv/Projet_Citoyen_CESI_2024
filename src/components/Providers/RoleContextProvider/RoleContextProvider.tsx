"use client";

import {RoleContext, UserRoles} from "@/Context/RoleContext";
import {ReactNode, useState} from "react";

export default function RoleContextProvider({children}: { children: ReactNode }) {
    const defaultRole = UserRoles.Mentor
    const [currentRole, setCurrentRole] = useState(defaultRole)

    return (
        <RoleContext.Provider value={{currentRole, setCurrentRole}}>
            {children}
        </RoleContext.Provider>
    )
}