import React from 'react'
import Image from 'next/image'


function InterviewLink({ interview_id, formData }) {
  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <Image src={'/checked.png'} alt= 'checked'
      width={80}
      height={80} 
      className='w-[80px] h-[80px] '
      />
      <h2 className='font-bold text-2xl mt-4'>Your AI Interview is Ready</h2>
      <p className='text-center mt-2'>Share this link with your candidates to start the interview process</p>

      
    </div>
  )
}
//2.41.14

export default InterviewLink