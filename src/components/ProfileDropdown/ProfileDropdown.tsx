import {User} from "@prisma/client";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuPortal,
    DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import {ArrowRight, BookOpen, ChevronLeft, GraduationCap, MoveRight} from "lucide-react";

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
                <DropdownMenuLabel className="flex justify-between items-center gap-2">
                        <Avatar>
                            {!!user.avatar && (
                                <AvatarImage src={user.avatar}/>
                            )}
                            <AvatarFallback>{user.firstname.charAt(0).toUpperCase()}{user.lastname.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <p>{user.firstname} {user.lastname}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuLabel className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4"/>
                    Espace mentor
                </DropdownMenuLabel>
                <DropdownMenuItem className="group cursor-pointer">
                    Gérer mes offres
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity h-4 ml-auto"/>
                </DropdownMenuItem>
                <DropdownMenuItem className="group cursor-pointer">
                    Mes évaluations
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity h-4 ml-auto"/>
                </DropdownMenuItem>

                <DropdownMenuLabel className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4"/>
                    Espace mentoré
                </DropdownMenuLabel>
                <DropdownMenuItem className="group cursor-pointer">
                    Gérer mes offres
                    <ArrowRight className="invisible group-hover:visible h-4 ml-auto"/>
                </DropdownMenuItem>
                <DropdownMenuItem className="group cursor-pointer">
                    Gérer mes demandes
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity h-4 ml-auto"/>
                </DropdownMenuItem>

                <DropdownMenuSeparator/>

                <LogoutButton/>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}