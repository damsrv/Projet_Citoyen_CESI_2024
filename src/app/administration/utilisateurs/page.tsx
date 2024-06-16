import H1 from '@/components/ui/Typography/h1'
import React from 'react'
import prisma from '@/lib/prisma'
import UserTable from '@/components/UserTable/UserTable'
import UserGetPayload = Prisma.UserGetPayload;
import { Prisma } from "@prisma/client";



const getData = async () => {
    const users: UserGetPayload<{
        include: { offers: true, role: true }
    }>[] | null = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            role: true,
            offers: true,
            registerAt: true
        }
    })

    return users
}



const page = async () => {

    const users = await getData();

    console.log(users)

    return (
        <>
            <H1>Utilisateurs</H1>
            <div className="bg-white p-5 border rounded-lg" >

                <UserTable users={users} />

            </div>
        </>
    )
}

export default page