"use client"

import { useContext } from "react";
import { RoleContext, UserRoles } from "@/context/RoleContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SheetLinks() {
    const { currentRole } = useContext(RoleContext);

    return (
        <nav className="flex flex-col justify-start items-start gap-2 !text-xl !font-medium w-full">
            {currentRole === UserRoles.Mentor
                ?
                (
                    <>
                        {/* <Link href="/demandes-mentorat" className="text-star">Demandes</Link> */}
                        <Link href="/demandes-mentorat/nouveau">Nouvelle offre</Link>
                        <Separator className="my-2" />
                        <Link href="/mon-compte/suivi-offres">Suivi offres</Link>
                        <Separator className="my-2" />
                    </>
                )
                :
                (
                    <>
                        <Link href="/offres-mentorat">Offres</Link>
                        <Separator className="my-2" />
                        <Link href="/mon-compte/suivi-demandes">Suivi demandes</Link>
                        <Separator className="my-2" />
                        {/* <Link href="/offres-mentorat/nouveau">Nouvelle demande</Link> */}
                    </>
                )
            }
            <Link href="/messagerie">Messagerie</Link>
        </nav>
    )
}