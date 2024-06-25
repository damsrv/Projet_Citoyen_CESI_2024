"use client"

import { useContext } from "react";
import { RoleContext, UserRoles } from "@/context/RoleContext";
import { Button } from "@/components/ui/button";

export default function TopbarLinks() {
    const { currentRole } = useContext(RoleContext);

    return (
        <nav className="hidden lg:block">
            {currentRole === UserRoles.Mentor
                ?
                (
                    <>
                        {/* <Button variant="link" asChild>
                            <a href="/demandes-mentorat">Demandes</a>
                        </Button> */}
                        <Button variant="link" asChild>
                            <a href="/demandes-mentorat/nouveau">Nouvelle offre</a>
                        </Button>
                        <Button variant="link" asChild>
                            <a href="/mon-compte/suivi-offres">Suivi offres</a>
                        </Button>
                    </>
                )
                :
                (
                    <>
                        <Button variant="link" asChild>
                            <a href="/offres-mentorat">Offres</a>
                        </Button>
                        <Button variant="link" asChild>
                            <a href="/mon-compte/suivi-demandes">Suivi demandes</a>
                        </Button>
                        {/* <Button variant="link" asChild>
                            <a href="/offres-mentorat/nouveau">Nouvelle demande</a>
                        </Button> */}
                    </>
                )
            }
            <Button variant="link" asChild>
                <a href="/messagerie">Messagerie</a>
            </Button>
        </nav>
    )
}