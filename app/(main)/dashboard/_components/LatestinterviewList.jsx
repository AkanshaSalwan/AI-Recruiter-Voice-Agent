'use client'
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import React, { useState } from 'react'


function LatestinterviewList() {

    const [interviewList, setInterviewList] = useState([]);
    return (
        <div>
            <h2 className='font-bold text-2xl mt-5'>Previously Created Interviews</h2>

            {interviewList?.length == 0 && 
            <div className='p-5 flex flex-col gap-3 items-center p-5 bg-white rounded-lg border border-gray-200'>
                <Video className='h-8 w-8 text-primary' />
                <h2 className='font-bold text-2xl'>No interviews created yet</h2>
                <Button>+ Create New Interview</Button>
            </div>}
        </div>
    )
}

export default LatestinterviewList