import React from 'react'
import { columns } from "./Columns"
import { DataTable } from "@/components/DataTable/DataTable"
import { User } from "@prisma/client"
import type { UserTableType } from "@/types/types.d.ts";



const UserTable = ({ users }: { users: UserTableType[] }) => {
    return (

        <div className='overflow-x-auto py-5 '>

            <DataTable columns={columns} data={users} />
        </div>
    )
}

export default UserTable