import React from 'react'
import { columns } from "./Columns"
import { DataTable } from "@/components/DataTable/DataTable"
import { Offer } from "@prisma/client"


const OfferTable = ({ offers }: { offers: Offer[] }) => {
    return (

        <div className='overflow-x-auto py-5 '>

            <DataTable columns={columns} data={offers} />
        </div>
    )
}

export default OfferTable