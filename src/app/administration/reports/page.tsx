import H1 from '@/components/ui/Typography/h1'
import React from 'react'
import prisma from '@/lib/prisma'
import ReportTable from '@/components/ReportTable/ReportTable'
import ReportGetPayload = Prisma.ReportGetPayload;
import { Prisma } from "@prisma/client";



const getData = async () => {
    const reports: ReportGetPayload<{
        include: { reporter: true, target: true }
    }>[] | null = await prisma.report.findMany({
        include: {
            reporter: true,
            target: true
        }
    })

    return reports
}



const page = async () => {

    const reports = await getData();

    return (
        <>
            <H1 className={"!text-3xl"}>Reports</H1>
            <div className="bg-white p-5 border rounded-lg" >
                <ReportTable reports={reports} />
            </div>
        </>
    )
}

export default page