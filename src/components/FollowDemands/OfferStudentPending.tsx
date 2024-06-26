//  return <OfferStudentAccepted key={offerStudent.date} offerStudent={offerStudent} />
import React from 'react';
import Muted from '@/components/ui/Typography/muted';
import { Prisma } from "@prisma/client";
import OfferStudentGetPayload = Prisma.OfferStudentGetPayload;
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { BadgeHelp } from 'lucide-react';

const OfferStudentPending = ({ offerStudent }: {
    offerStudent: OfferStudentGetPayload<{
        include: { offer: { include: { mentor: true } }, student: true }
    }>
}) => {




    return (

        <>
            <div className="py-2 md:p-4 flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex flex-col md:flex-row gap-5 md:items-center">
                    {/* ajouter icone pour la demande refusée */}
                    <div className="hidden md:flex items-center justify-center !w-min-[38px] !h-min-[38px] !w-[38px] !h-[38px] rounded-full bg-primary-background text-primary">
                        <BadgeHelp />
                    </div>
                    <div className='flex flex-col md:gap-1'>
                        <div className="flex flex-col lg:flex-row gap-1 lg:gap-4 lg:items-center ">
                            <p className="text-lg font-semibold">Demande de contact en cours</p>
                            <Muted className="text-sm">
                                {new Date(offerStudent.date).toLocaleString('fr-FR', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                }).replace(/^\w/, (c) => c.toUpperCase())}
                            </Muted>
                        </div>
                        <p className="text-sm">
                            Vous avez demandé un contact avec{' '}
                            <Link className="font-semibold text-primary" href={"/profil/" + offerStudent.offer.mentor.id}>
                                {offerStudent.offer.mentor.firstname} {offerStudent.offer.mentor.lastname}
                            </Link>{' '}

                            pour l'offre{' '}
                            <Link className="font-semibold text-primary" href={"/offres-mentorat/" + offerStudent.offer.id}>
                                {offerStudent.offer.title}
                            </Link>
                        </p>
                    </div>
                </div>


            </div>



        </>
    );
}

export default OfferStudentPending;