import React from 'react'
import { columns } from "./Columns"
import { DataTable } from "@/components/DataTable/DataTable"
import { User } from "@prisma/client"


const UserTable = ({ users }: { users: User[] }) => {
    return (

        <div className='overflow-x-auto py-5 '>

            <DataTable columns={columns} data={users} />
        </div>
    )
}

export default UserTable