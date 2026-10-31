'use client'
import { Button } from '@/components/ui/button'
import { Copy, Send } from 'lucide-react'
import moment from 'moment/moment'
import React from 'react'
import { toast } from '@/components/ui/toast'


function InterviewCard({ interview }) {
    const copyLink = async () => {
        const url = `${process.env.NEXT_PUBLIC_HOST_URL?.replace(/\/+$/, '')}/${interview?.interview_id}`
        await navigator.clipboard.writeText(url)
        toast.add({ title: 'Link Copied to Clipboard' })
    }

    return (
        <div className='p-5 bg-white rounded-lg border border-gray-200'>
            <div className='flex items-center gap-2 justify-between'>
                <div className='h-[30px] w-[30px] rounded-full bg-primary'></div>
                <h2 className='text-sm font-medium'>{moment(interview?.created_at).format('DD/MM/YYYY')}</h2>

            </div>
            <h2 className='text-lg font-bold'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-500'>{interview?.duration} minutes</h2>
            <div className='flex items-center gap-2'>
                <Button variant='outline' onClick={copyLink}> <Copy/> Copy Link </Button>
                <Button variant='outline'> <Send/> Send </Button>
            </div>
           
            
        </div>
    )
}

export default InterviewCard
