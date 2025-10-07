import React, { useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/Input'
import Button from '../components/Button'
import User from '../components/User'
import Users from '../components/Users'

const Dashboard = () => {
    return (
        <div className=' focus flex flex-col justify-center items-center' >
            <div className='w-full h-fit py-2 px-10 flex items-center justify-between border-b border-slate-300'>
                <Heading heading={"Payments App"} size={"text-3xl"} />
                <div className='flex items-center justify-center gap-5'>
                    <p className='text-xl'>
                        Hello, User
                    </p>
                    <div className='bg-gray-200 rounded-full p-4'>
                        U
                    </div>
                </div>
            </div>
            <div className='w-full h-fit pt-10 px-10'>
                <p className='text-2xl font-bold'>Your Balance $5000</p>
                <Users onClick={() => setActive(!active)} />
            </div>
        </div>
    )
}

export default Dashboard