import { Button } from "@/components/ui/button";
import H2 from "@/components/ui/Typography/h2";
import H3 from "@/components/ui/Typography/h3";
import H4 from "@/components/ui/Typography/h4";
import Large from "@/components/ui/Typography/large";
import Lead from "@/components/ui/Typography/lead";
import P from "@/components/ui/Typography/p";
import {Underlined} from "@/components/ui/Typography/underlined";
import { Handshake, ShieldCheck, UsersRound } from "lucide-react";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default async function Page() {
    return (
        <>
            <main className="min-h-screen">
                <section className=" flex flex-col items-center gap-5  p-5  py-10 md:flex-row md:gap-10 container-custom lg:py-20">
                    <Image
                        className="illustration-home md:order-1"
                        src={"/assets/illustration-entraide.png"}
                        alt={""}
                        width={500}
                        height={500}
                    />
                    <div className="text-start flex flex-col gap-5 md:items-start">
                        <Large>
                            Unissez-vous à notre réseau de{" "}
                            <Underlined variant="secondary">mentors</Underlined>{" "}
                            bienveillants pour atteindre vos{" "}
                            <Underlined variant="primary">objectifs</Underlined> dans un
                            environnement de soutien et de collaboration.
                        </Large>
                        <div className="w-full  flex flex-col gap-2 md:w-auto md:flex-row">
                            <Button>Chercher un mentor</Button>
                            <Button variant="secondary">Devenir mentor</Button>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col items-center gap-5  py-10  container-custom">
                    <H2 className="text-center p-5">
                        Un seul mot d'ordre, la communication
                    </H2>
                    <div className="text-center flex flex-col gap-20 py-10 w-full items-center lg:flex-row lg:justify-around lg:gap-10 lg:py-20">
                        <div className="background-bubble-primary">
                            <div className="background"></div>
                            <div className="content flex flex-col lg:items-center gap-5">
                                <H3>Besoin d'aide ?</H3>
                                <Lead>
                                    En reconversion professionnelle ? En quête
                                    de compétences ? Besoin de conseils ou
                                    d'aide dans vos démarches ?<br></br>
                                    <br></br>Rejoignez notre communauté de
                                    mentors et atteignez vos objectifs
                                </Lead>
                                <Button className="lg:w-48">Chercher un mentor</Button>
                            </div>
                        </div>

                        <div className="background-bubble-secondary">
                            <div className="background"></div>
                            <div className="content flex flex-col lg:items-center gap-5">
                                <H3>Des compétences ?</H3>
                                <Lead >
                                    Professionnel ? Retraité ? Ou simplement
                                    envie d'aider ?<br></br>
                                    <br></br>Venez partager vos compétences et
                                    votre temps pour des personnes qui en ont
                                    besoin.
                                </Lead>
                                <Button className="lg:w-48" variant={"secondary"}>
                                    Devenir mentor
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="overflow-hidden relative" >
                    <div className="background-values"></div>
                    <div className="bg-white flex flex-col gap-5 container-custom lg:flex-row lg:items-center lg:justify-between  lg:gap-20 xl:gap-36">

                        <div className="w-full py-10 lg:py-20 lg:my-auto px-5">
                            <H2 className="mb-5 md:mb-10">
                                <Underlined variant="secondary">
                                    Nos valeurs
                                </Underlined>
                            </H2>
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col ">
                                    <H3 className={"flex gap-1 items-center text-xl mb-2"}>
                                        <Handshake />
                                        Engagement
                                    </H3>
                                    <Lead>
                                        Les mentors et élèves sont engagés,
                                        investissant du temps et des ressources au
                                        service des autres.
                                    </Lead>
                                </div>

                                <div className="flex flex-col ">
                                    <H3
                                        className={
                                            "flex gap-1 items-center text-xl mb-2"
                                        }
                                    >
                                        <UsersRound />
                                        Altruisme
                                    </H3>
                                    <Lead>
                                        Le désir sincère d'aider les autres à
                                        réussir est au cœur du rôle de mentor. Ils
                                        sont motivés par le bien-être et le progrès
                                        de leurs mentorés.
                                    </Lead>
                                </div>
                                <div className="flex flex-col ">
                                    <H3
                                        className={
                                            "flex gap-1 items-center text-xl mb-2"
                                        }
                                    >
                                        <ShieldCheck />
                                        Confiance
                                    </H3>
                                    <Lead>
                                        La confiance est un élément essentiel de
                                        toute relation de mentorat. Les mentors
                                        doivent établir et maintenir la confiance en
                                        étant honnêtes, fiables et respectueux des
                                        informations confidentielles partagées par
                                        leurs mentorés.
                                    </Lead>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:flex relative  xl:min-h-[600px] xl:min-w-[600px] z-[1]">
                            <div className="background-illustration-values"></div>
                            <Image
                                className="illustration-values my-auto py-10"
                                src={"/assets/illustration-valeurs.svg"}
                                alt={""}
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                </section>
                <section className="overflow-hidden relative" >
                    <div className="background-questions"></div>
                    <div className=" bg-white flex flex-col gap-5 container-custom lg:flex-row lg:items-center lg:justify-between lg:gap-20 xl:gap-36">

                        <div className="hidden lg:flex relative  xl:min-h-[600px] xl:min-w-[600px] z-[1]">
                            <div className="background-illustration-questions"></div>
                            <Image
                                className="illustration-questions my-auto py-10"
                                src={"/assets/illustration-questions.svg"}
                                alt={""}
                                width={500}
                                height={500}
                            />
                        </div>
                        <div className="w-full py-10 lg:py-20 px-5" >
                            <H2 className="mb-5 md:mb-10">
                                <Underlined variant="primary">
                                    Vos questions
                                </Underlined>
                            </H2>
                            <div className="flex flex-col text-start">
                                <Accordion type="single" collapsible>
                                    <AccordionItem
                                        value="item-1"
                                        className="w-full"
                                    >
                                        <AccordionTrigger className="text-start">
                                            La plateforme est-elle gratuite ?{" "}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            La plateforme est 100% gratuite aussi
                                            bien pour les mentors que pour les
                                            mentorés.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger className="text-start">
                                            Quelles sont les conditions pour devenir
                                            mentor ?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            ---------- -------------------- ------
                                            -------- -------- ----------- ---------
                                            ------------ ------------------- -----
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger className="text-start">
                                            Existe-t-il des conditions particulières
                                            pour être mentoré ?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            ---------- -------------------- ------
                                            -------- -------- ----------- ---------
                                            ------------ ------------------- -----
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
