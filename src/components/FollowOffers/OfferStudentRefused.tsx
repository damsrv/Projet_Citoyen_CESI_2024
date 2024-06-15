
import React from 'react';
import Muted from '@/components/ui/Typography/muted';
import { Prisma } from "@prisma/client";
import OfferStudentGetPayload = Prisma.OfferStudentGetPayload;

const OfferStudentRefused = ({ offerStudent }: {
    offerStudent: OfferStudentGetPayload<{
        include: { offer: true, student: true }
    }>
}) => {

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <p>[WIP] DEMANDE REFUSEE</p>
        </div>
    );
}

export default OfferStudentRefused;