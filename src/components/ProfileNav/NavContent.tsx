import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NavContent = () => {

    const [activeLink, setActiveLink] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        // Récupérer l'URL de la page
        const currentUrl = window.location.pathname;
        // Définir la valeur de activeLink en fonction de l'URL de la page
        setActiveLink(currentUrl);
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
                        title: "Mes évaluations",
                        url: "/mon-compte/mes-evaluations",
                    },
                ],
            },
            {
                title: "Espace mentoré",
                sublinks: [
                    {
                        title: "Gérer mes demandes",
                        url: "/mon-compte/gerer-demandes",
                    },
                    // {
                    //     title: "Mes évaluations",
                    //     url: "/mon-compte/mes-evaluations",
                    // },
                ],
            },

        ]

    return (
        links.map((link, index) => {

            return (

                <li key={index} className="list-none sidebar-menu">
                    <details open>
                        <summary title="Ouvrir/fermer le sous-menu" className="font-semibold text-lg mb-2 hover:bg-primary-background px-2 p-1 rounded">{link.title}</summary>
                        <ul className=" flex flex-col gap-1">
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
                    </details>
                </li>
            );
        })
    )
}

export default NavContent