import Image from "next/image";
import {Button} from "@/components/ui/button";
import {AlignJustify} from "lucide-react";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import LoginButton from "@/components/LoginButton/LoginButton";
import RegisterButton from "@/components/RegisterButton/RegisterButton";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import ProfileDropdown from "@/components/ProfileDropdown/ProfileDropdown";

export default async function Topbar() {
    const session = await getServerSession(authOptions);
    console.log("SESSION FRONT", session)
    return (
        <div className="border-b">
            <div className="container-custom flex h-14 w-full p-2 justify-between">
                <div className="relative h-full w-48">
                    <a href="/">
                        <Image src={"/assets/LeBonMentor.svg"} alt={"oui"} layout="fill"
                               style={{objectFit: "contain"}}/>
                    </a>
                </div>

                <nav>
                    <section className="flex justify-between gap-3 sm:hidden">
                        <div className="flex sm:hidden">
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
                    {session !== null
                        ?
                            (
                                <ProfileDropdown user={session.user} />
                            )
                        :
                        (
                            <section className="hidden justify-between gap-3 sm:flex">
                                <LoginButton/>
                                <RegisterButton/>
                            </section>
                        )
                    }

                </nav>
            </div>
        </div>
    )
}
