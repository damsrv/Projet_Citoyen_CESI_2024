import { User } from "@prisma/client";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuPortal,
    DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import { ArrowRight, BookOpen, ChevronLeft, GraduationCap, MoveRight } from "lucide-react";
import Link from "next/link";

interface ProfileDropdownProps {
    user: Omit<User, "password">
}

export default async function ProfileDropdown({ user }: ProfileDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar aria-label="Ouvrir le menu utilisateur" className="">
                    {!!user.avatar && (
                        <AvatarImage src={user.avatar} alt="Avatar de l'utilisateur" />
                    )}
                    <AvatarFallback>{user.firstname.charAt(0).toUpperCase()}{user.lastname.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-64">
                <DropdownMenuLabel className="flex justify-start items-center gap-4">
                    <Avatar>
                        {!!user.avatar && (
                            <AvatarImage src={user.avatar} />
                        )}
                        <AvatarFallback>{user.firstname.charAt(0).toUpperCase()}{user.lastname.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p>{user.firstname} {user.lastname}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="group cursor-pointer" asChild>
                    <Link href="/mon-compte/modifier-profil">
                        Modifier mon profil
                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity h-4 ml-auto" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="group cursor-pointer" asChild>
                    <Link href="/mon-compte/gerer-compte">
                        Gérer mon compte
                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity h-4 ml-auto" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Espace mentor
                </DropdownMenuLabel>
                <DropdownMenuItem className="group cursor-pointer" asChild>
                    <Link href="/mon-compte/gerer-offres">
                        Gérer mes offres
                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity h-4 ml-auto" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="group cursor-pointer" asChild>
                    <Link href="/mon-compte/suivi-offres">
                        Suivi de mes offres
                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity h-4 ml-auto" />
                    </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem className="group cursor-pointer" asChild>
                    <Link href="/mon-compte/evaluations">
                        Mes évaluations
                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity h-4 ml-auto"/>
                    </Link>
                </DropdownMenuItem> */}

                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Espace mentoré
                </DropdownMenuLabel>
                <DropdownMenuItem className="group cursor-pointer" asChild>
                    <Link href="/mon-compte/suivi-demandes">
                        Suivi de mes demandes
                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity h-4 ml-auto" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="group cursor-pointer" asChild>
                    <Link href="/mon-compte/offres-favorites">
                        Offres favorites
                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity h-4 ml-auto" />
                    </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem className="group cursor-pointer" asChild>
                    <Link href="/mon-compte/mentorats">
                        Mes mentorats
                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity h-4 ml-auto" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="group cursor-pointer" asChild>
                    <Link href="/mon-compte/gerer-demandes">
                        Gérer des demandes
                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity h-4 ml-auto" />
                    </Link>
                </DropdownMenuItem> */}

                <DropdownMenuSeparator />

                <LogoutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}