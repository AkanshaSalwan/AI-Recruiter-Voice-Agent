    
import React from 'react'
import Image from 'next/image'

function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm'>
        <Image src="/AI Interview Voice Agent Logo.png" alt='logo' width={100} height={50} 
        className='w-[140px] h-[50px]'/>
    </div>
  )
}

export default InterviewHeader