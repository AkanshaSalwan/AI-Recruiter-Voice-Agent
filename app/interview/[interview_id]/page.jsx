import React from 'react'
import Image from 'next/image'


function Interview() {
    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16 '>
            <div className='flex flex-col items-center justify-center border rounded-2xl p-7'>
                <Image src="/AI Interview Voice Agent Logo.png" alt='logo' width={100} height={50}
                    className='w-[140px] h-[50px]' />

                    <h2 className='mt-3'>AI-Powered Interview Platform</h2>

                    <Image src="/interview.png" alt='interview' width={500} height={500}
                    className='w-[280px] my-6' />

                    <h2 className='text-xl font-bold '>Full stack developer Interview</h2>
            </div>
        </div>
    )
}

export default Interview