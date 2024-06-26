import React from 'react'

const StatCard = ({ title, value }: { title: string, value: number | string }) => {
    return (
        <div className="bg-white p-5 border rounded-lg flex justify-between" >
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl font-semibold text-primary">{value}</p>
        </div>)
}

export default StatCard