import React from 'react'
import { columns } from "./Columns"
import { DataTable } from "@/components/DataTable/DataTable"
import { SavedOffer } from "@prisma/client"
import type { SavedOfferTableType } from "@/types/types.d.ts";


const SavedOfferTable = ({ savedOffers }: { savedOffers: SavedOfferTableType[] }) => {
    return (

        <div className='overflow-x-auto py-5 '>

            <DataTable columns={columns} data={savedOffers} />
        </div>
    )
}

export default SavedOfferTable