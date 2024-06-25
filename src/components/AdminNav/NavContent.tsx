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
                title: "Administration",
                sublinks: [
                    {
                        title: "Utilisateurs",
                        url: "/administration/utilisateurs",
                    },
                    {
                        title: "Offres",
                        url: "/administration/offres",
                    },
                    {
                        title: "Reports",
                        url: "/administration/reports",
                    },
                ],
            },
            {
                title: "Statistiques",
                sublinks: [
                    {
                        title: "Statistiques",
                        url: "/administration/statistiques",
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