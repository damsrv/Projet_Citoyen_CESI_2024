import Image from "next/image";
import {Button} from "@/components/ui/button";
import {AlignJustify} from "lucide-react";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import LoginButton from "@/components/LoginButton/LoginButton";
import RegisterButton from "@/components/RegisterButton/RegisterButton";

export default async function Topbar() {
    return (
        <div className="flex h-14 w-full p-2 justify-between border-b">
            <div className="relative h-full w-48">
                <Image src={"/LeBonMentor.svg"} alt={"oui"} layout="fill" style={{objectFit: "contain"}} />
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
                                        <LoginButton />
                                        <RegisterButton />
                                    </main>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </section>
                <section className="hidden justify-between gap-3 sm:flex">
                    <LoginButton />
                    <RegisterButton />
                </section>
            </nav>
        </div>
    )
}
