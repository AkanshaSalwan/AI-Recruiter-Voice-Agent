import React from 'react'
import Image from 'next/image'


function Interview() {
    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16'>
            <div className='flex justify-center border rounded-2xl'>
                <Image src="/AI Interview Voice Agent Logo.png" alt='logo' width={100} height={50}
                    className='w-[140px] h-[50px]' />

                    <h2>AI-Powered Interview Platform</h2>
            </div>
        </div>
    )
}

export default Interview