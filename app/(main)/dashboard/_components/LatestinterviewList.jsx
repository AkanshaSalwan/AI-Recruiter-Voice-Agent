'use client'
import { Button } from '@/components/ui/button';
import { Loader2Icon, Video } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import { createClient } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import InterviewCard from './InterviewCard';



function LatestinterviewList() {
    const supabase = createClient();
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            getInterviewList();
        }
    }, [user]);

    const getInterviewList = async () => {
        setLoading(true);
        const { data: interviews, error } = await supabase
            .from('interviews')
            .select('*')
            .eq('userEmail', user?.email)

        if (error) {
            console.error(error);
            setInterviewList([]);
            setLoading(false);
            return;
        }

        setInterviewList(interviews || []);
        setLoading(false);
    }

   

    return (
        <div>
            <h2 className='font-bold text-2xl mt-5'>Previously Created Interviews</h2>

            {loading &&
            <div className='p-5 flex items-center justify-center gap-2 bg-white rounded-lg border border-gray-200'>
                <Loader2Icon className='h-5 w-5 animate-spin text-primary' />
                <p className='text-sm text-gray-500'>Loading interviews...</p>
            </div>}

            {!loading && interviewList?.length == 0 &&
            <div className='p-5 flex flex-col gap-3 items-center p-5 bg-white rounded-lg border border-gray-200'>
                <Video className='h-8 w-8 text-primary' />
                <h2 className='font-bold text-2xl'>No interviews created yet</h2>
                <Button>+ Create New Interview</Button>
            </div>}

            {!loading && interviewList?.length > 0 &&
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {interviewList.map((interview,index) => (
                   <InterviewCard interview={interview} key={interview?.interview_id || index}/>
                ))} 
            </div>

            }
        </div>
    )
}

export default LatestinterviewList
