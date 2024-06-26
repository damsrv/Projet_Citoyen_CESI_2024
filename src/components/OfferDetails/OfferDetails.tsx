import {useEffect, useState} from "react";
import {Prisma, User} from "@prisma/client";
import prisma from "@/lib/prisma";
import OfferGetPayload = Prisma.OfferGetPayload;

type OfferWithMentor = OfferGetPayload<{ include: { mentor: true } }>

interface OfferDetailsProps {
    offerId: string,
}
export default function OfferDetails({offerId}: OfferDetailsProps) {
    const [offer, setOffer] = useState<OfferWithMentor | undefined>(undefined);
    const [mentor, setMentor] = useState<User | undefined>(undefined);

    useEffect(() => {
        async function fetchOfferById(id: string) {
            try {
                const res = await prisma.offer.findFirst({
                    where: {
                        id: parseInt(id)
                    },
                    include: {
                        mentor: true
                    }
                })

                if (res) {
                    setOffer(res);
                    setMentor(res.mentor)
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, []);


    return (
        <div>
            <p>Détails de l'offre {offerId}</p>
        </div>
    )
}