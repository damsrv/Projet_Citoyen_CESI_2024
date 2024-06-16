import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import OfferStudentGetPayload = Prisma.OfferStudentGetPayload;
import React from 'react'
import Muted from '@/components/ui/Typography/muted';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

import OfferStudentAccepted from "./OfferStudentAccepted";
import OfferStudentPending from "./OfferStudentPending";
import OfferStudentRefused from "./OfferStudentRefused";
import { AlertCircle } from "lucide-react";


function FollowOffers({ offerStudents }: {
    offerStudents: OfferStudentGetPayload<{
        include: { offer: true, student: true }
    }>[]
}) {

    return (
        <>
            {
                offerStudents.length == 0 && (
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Aucune notification en attente</AlertTitle>
                        <AlertDescription>
                            Vous n'avez pas encore reçu de demande de contact pour vos offres ou vous n'avez pas encore postulé à une demande de mentorat.
                        </AlertDescription>
                    </Alert>
                )
            }

            {
                offerStudents.map((offerStudent) => {
                    if (offerStudent.status === 0) {
                        return <OfferStudentAccepted key={offerStudent.date.toDateString()} offerStudent={offerStudent} />
                    } else if (offerStudent.status === 1) {
                        return <OfferStudentRefused key={offerStudent.date.toDateString()} offerStudent={offerStudent} />
                    } else if (offerStudent.status === 2) {
                        return <OfferStudentPending key={offerStudent.date.toDateString()} offerStudent={offerStudent} />
                    }
                })
            }

        </>

    );
}

export default FollowOffers