"use client"

import {useContext} from "react";
import {RoleContext, UserRoles} from "@/Context/RoleContext";
import {Button} from "@/components/ui/button";

export default function TopbarLinks() {
    const {currentRole} = useContext(RoleContext);

    return (
        <nav>
            {currentRole === UserRoles.Mentor
                ?
                (
                    <>
                        <Button variant="link" asChild>
                            <a href="/offres-mentorat">Demandes</a>
                        </Button>
                        <Button variant="link" asChild>
                            <a href="/offres-mentorat/nouveau">Nouvelle offre</a>
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
                            <a href="/offres-mentorat/nouveau">Nouvelle demande</a>
                        </Button>
                    </>
                )
            }
            <Button variant="link" asChild>
                <a href="/messagerie">Messagerie</a>
            </Button>
        </nav>
    )
}