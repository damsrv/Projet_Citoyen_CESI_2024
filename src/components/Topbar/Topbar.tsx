import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import LoginButton from "@/components/LoginButton/LoginButton";
import RegisterButton from "@/components/RegisterButton/RegisterButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import ProfileDropdown from "@/components/ProfileDropdown/ProfileDropdown";
import TopbarLinks from "@/components/Topbar/TopbarLinks/TopbarLinks";
import UserRoleSelect from "@/components/UserRoleSelect/UserRoleSelect";
import Link from "next/link";
import SheetLinks from "@/components/Topbar/SheetLinks/SheetLinks";
import { Separator } from "@/components/ui/separator"


export default async function Topbar() {
    const session = await getServerSession(authOptions);

    return (
        <div className="border-b">
            <div className="container-custom flex h-14 w-full p-2 justify-between gap-5">
                <div className="relative h-full w-48">
                    <Link href="/">
                        <Image src={"/assets/LeBonMentor.svg"} alt={"oui"} layout="fill"
                            style={{ objectFit: "contain" }} />
                    </Link>
                </div>

                {session && (
                    <TopbarLinks />
                )}

                <nav className="flex items-center justify-between gap-3">
                    {session !== null
                        ?
                        (
                            <>
                                <section className="gap-2 hidden lg:flex">
                                    <UserRoleSelect />
                                    <ProfileDropdown user={session.user} />
                                </section>
                                <section className="gap-2 flex lg:hidden">
                                    <ProfileDropdown user={session.user} />
                                </section>
                            </>
                        ) : (
                            <section className="hidden justify-between gap-3 sm:flex">
                                <LoginButton />
                                <RegisterButton />
                            </section>
                        )
                    }
                    <section className="flex justify-between gap-3 lg:hidden">
                        <div className="flex lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" aria-label="Ouvrir le menu" className="!p-2 !text-primary"><AlignJustify size={40} /></Button>
                                </SheetTrigger>
                                <SheetContent className="flex flex-col gap-2">
                                    {session !== null
                                        ?
                                        (
                                            <>
                                                <SheetHeader className="flex flex-col gap-2">
                                                    {/* TODO SHEET CONTENT */}
                                                    <SheetTitle>Menu</SheetTitle>
                                                    <SheetDescription>
                                                        Selectionner la vue que vous souhaitez pour afficher le menu correspondant.
                                                    </SheetDescription>
                                                    <UserRoleSelect className="!w-full" />
                                                </SheetHeader>
                                                <Separator className="my-2" />
                                                <div className="flex grow">
                                                    {session && (
                                                        <SheetLinks />
                                                    )}
                                                </div>
                                            </>)
                                        : (
                                            <>
                                                <SheetHeader className="flex flex-col gap-2">
                                                    {/* TODO SHEET CONTENT */}
                                                    <SheetTitle>Menu</SheetTitle>
                                                    <SheetDescription>
                                                        Connectez vous ou inscrivez vous pour accéder à votre espace personnel.
                                                    </SheetDescription>
                                                    <LoginButton />
                                                    <RegisterButton />
                                                </SheetHeader>

                                            </>
                                        )}
                                </SheetContent>
                            </Sheet>
                        </div>
                    </section>


                </nav>
            </div>
        </div>
    )
}
