import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <>
            <footer className="bg-primary-light py-10 px-5 ">
                <div className="container-custom py-5 md:border-secondary md:border-b-8 flex flex-col md:justify-between md:flex-row">
                    <div className="footer-logos flex flex-col items-center md:items-start gap-5 mb-5 border-secondary border-b-8 md:border-none pb-5 md:pb-0">
                        <Image
                            src={"/assets/logo-blue.svg"}
                            height={48}
                            width={236}
                            alt="Logo LeBonMentor"
                        />
                        <div className="flex gap-2">
                            <Image
                                src={"/assets/footer-logo-facebook.svg"}
                                height={24}
                                width={24}
                                alt="Logo Facebook"
                            />
                            <Image
                                src={"/assets/footer-logo-linkedin.svg"}
                                height={24}
                                width={24}
                                alt="Logo LinkedIn"
                            />
                            <Image
                                src={"/assets/footer-logo-instagram.svg"}
                                height={24}
                                width={24}
                                alt="Logo Instagram"
                            />
                        </div>
                    </div>
                    <nav className="footer-nav flex flex-col items-center md:items-end">
                        <div className="flex flex-col items-center md:flex-row gap-2 text-xl text-primary font-semibold mb-5">
                            <Link
                                href={"/mon-compte/inscription"}
                                className="link-background-footer"
                            >
                                Rechercher un mentor
                            </Link>
                            <span>OU</span>
                            <Link
                                href={"/mon-compte/inscription"}
                                className="link-background-footer-2"
                            >
                                Devenir mentor
                            </Link>
                        </div>
                        <div className="flex flex-col items-center md:flex-row gap-2 text-primary">
                            <Link href={"/mentions-legales"} className="link">
                                Mentions légales
                            </Link>
                            <span className="hidden md:inline">-</span>
                            <Link
                                href={"/politique-confidentialite"}
                                className="link"
                            >
                                Politique de confidentialité
                            </Link>
                            <span className="hidden md:inline">-</span>
                            <Link href={"/nous-contacter"} className="link">
                                Nous contacter
                            </Link>
                        </div>
                    </nav>
                </div>
            </footer>
        </>
    );
};

export default Footer;
