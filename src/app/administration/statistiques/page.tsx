import H1 from '@/components/ui/Typography/h1'
import React from 'react'
import prisma from '@/lib/prisma'
import UserTable from '@/components/UserTable/UserTable'
import UserGetPayload = Prisma.UserGetPayload;
import { Prisma, User } from "@prisma/client";
import StatCard from '@/components/StatCard/StatCard'



const getUsers = async () => {
    const users: User[] | null = await prisma.user.findMany()

    return users
}

const getOffers = async () => {
    const offers = await prisma.offer.findMany()
    return offers
}



const page = async () => {

    const users = await getUsers();
    const offers = await getOffers();
    const usersRegisteredLastMonth = users.filter((user) => { return user.registerAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) })
    const offersRegisteredLastMonth = offers.filter((offer) => { return offer.createdAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) })

    return (
        <>
            <H1 className={"!text-3xl"}>Statistiques</H1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div className='flex flex-col gap-5'>
                    <StatCard title="Nombre d'utilisateurs" value={users.length} />
                    <StatCard title="Utilisateurs inscrits ce mois-ci" value={usersRegisteredLastMonth.length} />
                </div>
                <div className='flex flex-col gap-5'>
                    <StatCard title="Nombre d'offres" value={offers.length} />
                    <StatCard title="Offres créées ce mois-ci" value={offersRegisteredLastMonth.length} />
                </div>
                <div className='flex flex-col gap-5'>
                </div>
                <div className='flex flex-col gap-5'>
                </div>
            </div>
        </>
    )
}

export default page