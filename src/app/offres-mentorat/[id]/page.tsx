import prisma from "@/lib/prisma";
import OfferInfos from "@/components/OfferDetails/OfferInfos/OfferInfos";
import MentorInfos from "@/components/OfferDetails/MentorInfos/MentorInfos";
import { Prisma } from "@prisma/client";
import OfferGetPayload = Prisma.OfferGetPayload;
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Offre de mentorat",
    description: "Offre de mentorat",
};

export default async function OfferIdPage({
    params,
}: {
    params: { id: string };
}) {
    const offer: OfferGetPayload<{
        include: {
            mentor: {
                include: {
                    offers: true;
                    userSkills: {
                        include: {
                            skill: true;
                        };
                    };
                };
            };
            offerComTypes: {
                include: {
                    comType: true;
                };
            };
        };
    }> | null = await prisma.offer.findFirst({
        where: { id: parseInt(params.id) },
        include: {
            mentor: {
                include: {
                    offers: true,
                    userSkills: {
                        include: {
                            skill: true,
                        },
                    },
                },
            },
            offerComTypes: {
                include: {
                    comType: true,
                },
            },
        },
    });

    metadata.title = offer?.title;
    metadata.description = "Offre de mentorat de " + offer?.mentor.firstname + " " + offer?.mentor.lastname + " - " + offer?.title;

    return (
        <main className="bg-secondary-background grow">
            <div className="container-custom container-custom-offer lg:py-10 lg:px-4 flex grow w-full bg-secondary-background">
                {offer ? (
                    <section className="flex flex-col lg:flex-row lg:gap-10 w-full">
                        <MentorInfos mentor={offer.mentor} />
                        <OfferInfos offer={offer} />
                    </section>
                ) : (
                    <section>Chargement...</section>
                )}</div>
        </main>
    );
}
