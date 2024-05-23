import {User} from "@prisma/client";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {signOut} from "next-auth/react";
import LogoutButton from "@/components/LogoutButton/LogoutButton";

interface ProfileDropdownProps {
    user: Omit<User, "password">
}

export default async function ProfileDropdown({user}: ProfileDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    {!!user.avatar && (
                        <AvatarImage src={user.avatar}/>
                    )}
                    <AvatarFallback>{user.firstname.charAt(0).toUpperCase()}{user.lastname.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.firstname} {user.lastname}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>

                <DropdownMenuSeparator/>

                <LogoutButton/>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}