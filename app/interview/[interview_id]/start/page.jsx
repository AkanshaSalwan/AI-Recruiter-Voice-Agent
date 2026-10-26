
'use client'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import React, { useContext } from 'react'
import { Timer } from 'lucide-react'
import Image from 'next/image'



function StartInterview() {

    const {interviewInfo,setInterviewInfo}=useContext(InterviewDataContext)

  return (
    <div className='p-20 lg:px-48 xl:px-56 bg-gray-200'>
       <h2 className='font-bold text-xl flex justify-between'>
         AI Interview Session
        <span className='flex gap-2 item-center'>
            <Timer/>
            00:00:00
        </span>
       </h2>

       <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
        <div className='bg-white p-40 rounded-lg border item-center justfy-center'> 
           <Image src={'/ai.png'} alt='ai'
           width={100}
           height={100}
           className='w-[60px] h-[60px] rounded-full object-cover'
           />
           
        </div>
        <div>

        </div>

       </div>
    </div>
  )
}

export default StartInterview