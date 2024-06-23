"use client"
import React, { useState } from 'react';
import Muted from '@/components/ui/Typography/muted';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Prisma } from '@prisma/client';
import OfferStudentGetPayload = Prisma.OfferStudentGetPayload;
import OfferStudentAccepted from "./OfferStudentAccepted";
import OfferStudentPending from "./OfferStudentPending";
import OfferStudentRefused from "./OfferStudentRefused";
import { Button } from "@/components/ui/button";

function FollowOffers({ offerStudents }: {
    offerStudents: OfferStudentGetPayload<{
        include: { offer: { include: { mentor: true } }, student: true }
    }>[]
}) {
    const PAGE_SIZE = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedOfferStudents = offerStudents.slice(startIndex, endIndex);

    const totalPages = Math.ceil(offerStudents.length / PAGE_SIZE);

    return (
        <>
            {/* Render paginated offer students */}
            {paginatedOfferStudents.length === 0 ? (
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Aucune notification en attente</AlertTitle>
                    <AlertDescription>
                        Vous n'avez pas encore reçu de demande de contact pour vos offres ou vous n'avez pas encore postulé à une demande de mentorat.
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="flex flex-col gap-2">
                    {paginatedOfferStudents.map((offerStudent, index) => {
                        if (offerStudent.status === 0) {
                            return (
                                <React.Fragment key={offerStudent.date.toDateString()}>
                                    <OfferStudentPending offerStudent={offerStudent} />
                                    {index !== paginatedOfferStudents.length - 1 && <hr className="my-1" />}
                                </React.Fragment>
                            );
                        } else if (offerStudent.status === 1) {
                            return (
                                <React.Fragment key={offerStudent.date.toDateString()}>
                                    <OfferStudentAccepted offerStudent={offerStudent} />
                                    {index !== paginatedOfferStudents.length - 1 && <hr className="my-1" />}
                                </React.Fragment>
                            );
                        } else if (offerStudent.status === 2) {
                            return (
                                <React.Fragment key={offerStudent.date.toDateString()}>
                                    <OfferStudentRefused offerStudent={offerStudent} />
                                    {index !== paginatedOfferStudents.length - 1 && <hr className="my-1" />}
                                </React.Fragment>
                            );
                        }
                        return null;
                    })}
                </div>
            )}

            {/* Display number of offers, current page, and shortcuts to nearby pages */}
            {offerStudents.length > PAGE_SIZE && <div className="flex justify-center my-4">
                <Button
                    className="px-2 py-1 mx-1 rounded-md "
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Page précédente
                </Button>
                <Button
                    className="px-2 py-1 mx-1 rounded-md "
                    disabled={endIndex >= offerStudents.length}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Page suivante
                </Button>
            </div>}

        </>
    );
}

export default FollowOffers;