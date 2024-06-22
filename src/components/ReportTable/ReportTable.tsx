import React from 'react'
import { columns } from "./Columns"
import { DataTable } from "@/components/DataTable/DataTable"
import { Report } from "@prisma/client"


const ReportTable = ({ reports }: { reports: Report[] }) => {
    return (

        <div className='overflow-x-auto py-5 '>

            <DataTable columns={columns} data={reports} />
        </div>
    )
}

export default ReportTable