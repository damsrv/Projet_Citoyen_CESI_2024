import React from 'react'
import { columns } from "./Columns"
import { DataTable } from "@/components/DataTable/DataTable"
import type { ReportType } from "@/types/types.d.ts";

const ReportTable = ({ reports }: { reports: ReportType[] }) => {
    return (

        <div className='overflow-x-auto py-5 '>

            <DataTable columns={columns} data={reports} />
        </div>
    )
}

export default ReportTable