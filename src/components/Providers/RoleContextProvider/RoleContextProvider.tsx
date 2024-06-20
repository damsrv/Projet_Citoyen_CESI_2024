"use client";

import {RoleContext, UserRoles} from "@/context/RoleContext";
import {ReactNode, useEffect, useState} from "react";

export default function RoleContextProvider({children}: { children: ReactNode }) {
    const [currentRole, setCurrentRole] = useState<UserRoles | undefined>(undefined)


    // On Mount
    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");

        if (storedRole !== null) {
            // TODO: Check if correctly formed UserRole
            setCurrentRole(storedRole as UserRoles);
        } else {
            setCurrentRole(UserRoles.Mentored)
            localStorage.setItem("userRole", UserRoles.Mentored)
        }

    }, []);

    // On switch change
    useEffect(() => {
        if (currentRole) {
            localStorage.setItem("userRole", currentRole);
        }
    }, [currentRole]);

    return (
        <RoleContext.Provider value={{currentRole, setCurrentRole}}>
            {children}
        </RoleContext.Provider>
    )
}