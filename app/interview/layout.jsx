import React from 'react'
import InterviewHeader from './_components/InterviewHeader'

function InterviewLayout({children}) {
  return (
    <div className='bg-gray-100 min-h-screen'>
        <InterviewHeader/>
        {children}
    </div>
  )
}

export default InterviewLayout