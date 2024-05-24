"use client"

import {useContext} from "react";
import {RoleContext, UserRoles} from "@/Context/RoleContext";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function UserRoleSelect() {
    const {currentRole, setCurrentRole } = useContext(RoleContext);

    function onRoleChange(value: string) {
        setCurrentRole(value as UserRoles);
    }

    return (
        <Select defaultValue={currentRole} onValueChange={onRoleChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={UserRoles.Mentor}>Mentor</SelectItem>
                <SelectItem value={UserRoles.Mentored}>Mentoré</SelectItem>
            </SelectContent>
        </Select>
    )
}