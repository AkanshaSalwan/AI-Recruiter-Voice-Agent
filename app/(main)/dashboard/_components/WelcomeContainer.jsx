'use client'
import Image from 'next/image'
import { useUser } from '@/app/provider';
import React from 'react'



function WelcomeContainer() {

    const { user } = useUser();
    return (
        <div className='bg-white p-3 rounded-2xl flex items-center justify-between '>
            <div>
                <h2 className='text-lg font-bold'>Welcome Back, {user?.name}</h2>
                <h2 className='text-gray-500'>AI-Driven Interviews,Hassel-Free Hiring</h2>
            </div>
           { user?.picture && <Image src={user?.picture} alt='userAvatar' width={40} height={40}
           className='rounded-full' />}
        </div>
    )
}

export default WelcomeContainer
