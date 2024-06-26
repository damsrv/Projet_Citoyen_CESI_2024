"use client"

import { useContext } from "react";
import { RoleContext, UserRoles } from "@/context/RoleContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UserRoleSelect({ className = "" }: { className?: string }) {
    const { currentRole, setCurrentRole } = useContext(RoleContext);

    function onRoleChange(value: string) {
        setCurrentRole(value as UserRoles);
    }

    return (
        <Select value={currentRole} onValueChange={onRoleChange}>
            <SelectTrigger className={className + " w-[180px]"}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={UserRoles.Mentor}>Vue mentor</SelectItem>
                <SelectItem value={UserRoles.Mentored}>Vue mentoré</SelectItem>
            </SelectContent>
        </Select>
    )
}