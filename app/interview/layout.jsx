'use client'
import React, { useState } from 'react'
import InterviewHeader from './_components/InterviewHeader'
import { InterviewDataContext } from '@/context/InterviewDataContext'

function InterviewLayout({ children }) {

  const [interviewInfo, setInterviewInfo] = useState();

  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      <div className='bg-gray-100 min-h-screen'>
        <InterviewHeader />
        {children}
      </div>
    </InterviewDataContext.Provider>
  )
}

export default InterviewLayout