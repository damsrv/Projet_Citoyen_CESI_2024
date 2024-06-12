import Image from "next/image";
import {Button} from "@/components/ui/button";
import {AlignJustify} from "lucide-react";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import LoginButton from "@/components/LoginButton/LoginButton";
import RegisterButton from "@/components/RegisterButton/RegisterButton";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import ProfileDropdown from "@/components/ProfileDropdown/ProfileDropdown";
import TopbarLinks from "@/components/Topbar/TopbarLinks/TopbarLinks";
import UserRoleSelect from "@/components/UserRoleSelect/UserRoleSelect";

export default async function Topbar() {
    const session = await getServerSession(authOptions);

    return (
        <div className="border-b">
            <div className="container-custom flex h-14 w-full p-2 justify-between">
                <div className="relative h-full w-48">
                    <a href="/">
                        <Image src={"/assets/LeBonMentor.svg"} alt={"oui"} layout="fill"
                               style={{objectFit: "contain"}}/>
                    </a>
                </div>

                {session && (
                    <TopbarLinks/>
                )}

                <nav className="flex items-center justify-between gap-3">
                    {session !== null
                        ?
                        (
                            <section className="flex gap-2">
                                <UserRoleSelect />
                                <ProfileDropdown user={session.user}/>
                            </section>
                        )
                        :
                        (
                            <section className="hidden justify-between gap-3 sm:flex">
                                <LoginButton/>
                                <RegisterButton/>
                            </section>
                        )
                    }
                    <section className="flex justify-between gap-3 lg:hidden">
                        <div className="flex lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="primary"><AlignJustify/></Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        {/* TODO SHEET CONTENT */}
                                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                                        <SheetDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </SheetDescription>
                                        <main className="flex">
                                            <LoginButton/>
                                            <RegisterButton/>
                                        </main>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </section>


                </nav>
            </div>
        </div>
    )
}
