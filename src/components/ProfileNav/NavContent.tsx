import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NavContent = () => {

    const [activeLink, setActiveLink] = useState("");
    const pathname = usePathname();

    // TODO : ajouter le nombre de demandes en attente (offer_student) de réponse par le mentor pour le lien "Suivi de mes offres"


    useEffect(() => {
        // Récupérer l'URL de la page
        const currentUrl = window.location.pathname;
        // Définir la valeur de activeLink en fonction de l'URL de la page
        setActiveLink(currentUrl);

        // Récupérer les offres en attente

    }, [pathname]);

    const links: {
        title: string;
        sublinks: {
            title: string;
            url: string;
        }[];
    }[] = [
            {
                title: "Mon profil",
                sublinks: [
                    {
                        title: "Modifier mon profil",
                        url: "/mon-compte/modifier-profil",
                    },
                    {
                        title: "Gérer mon compte",
                        url: "/mon-compte/gerer-compte",
                    },
                ],
            },
            {
                title: "Espace mentor",
                sublinks: [
                    {
                        title: "Gérer mes offres",
                        url: "/mon-compte/gerer-offres",
                    },
                    {
                        title: "Suivi de mes offres",
                        url: "/mon-compte/suivi-offres",

                    },
                    // {
                    //     title: "Mes évaluations",
                    //     url: "/mon-compte/mes-evaluations",
                    // },
                ],
            },
            {
                title: "Espace mentoré",
                sublinks: [
                    {
                        title: "Suivi de mes demandes",
                        url: "/mon-compte/suivi-demandes",
                    },
                    {
                        title: "Offres favorites",
                        url: "/mon-compte/offres-favorites",
                    },
                ],
            },

        ]

    return (
        links.map((link, index) => {
            return (
                <li key={index} className="list-none sidebar-menu first:py-0 first:pb-3 py-3 w-full">
                    <div>
                        <div className="font-semibold text-lg mb-2 px-2 p-1 rounded">{link.title}</div>
                        <ul className="flex flex-col gap-1">
                            {link.sublinks.map((subLink: {
                                title: string;
                                url: string;
                            }, index) => (
                                <li key={index}>
                                    <Link
                                        className={
                                            activeLink === subLink.url ? "active" : ""
                                        }
                                        href={subLink.url}
                                    >
                                        {subLink.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </li>
            );
        })
    )
}

export default NavContent