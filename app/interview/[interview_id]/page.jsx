import React from 'react'
import Image from 'next/image'
import { Building2, Clock, Info, Settings, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function Interview() {
    return (
        <main className='min-h-screen bg-slate-50 px-4 py-8 sm:py-12'>
            <section className='mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
                <div className='flex justify-center'>
                    <Image
                        src="/AI Interview Voice Agent Logo.png"
                        alt='AI Interview Voice Agent'
                        width={140}
                        height={50}
                        className='h-[50px] w-[140px] object-contain'
                    />
                </div>

                <div className='mt-3 flex justify-center'>
                    <Image
                        src="/interview.png"
                        alt='Interview illustration'
                        width={500}
                        height={500}
                        className='my-3 w-[220px] object-contain'
                    />
                </div>

                <header className='text-center'>
                    <h1 className='text-xl font-bold tracking-tight text-slate-900'>
                        Full Stack Developer Interview
                    </h1>
                    <div className='mt-3 flex items-center justify-center gap-5 text-sm text-slate-500'>
                        <span className='flex items-center gap-1.5'>
                            <Building2 className='h-4 w-4' />
                            Google Inc.
                        </span>
                        <span className='flex items-center gap-1.5'>
                            <Clock className='h-4 w-4' />
                            30 Minutes
                        </span>
                    </div>
                </header>

                <div className='mt-6'>
                    <label htmlFor='candidate-name' className='mb-2 block text-sm font-medium text-slate-900'>
                        Enter your full name
                    </label>
                    <Input
                        id='candidate-name'
                        placeholder='e.g., John Smith'
                        className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-none placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                </div>

                <div className='mt-4 flex items-start gap-2.5 rounded-md border border-blue-100 bg-blue-50 p-3'>
                    <Info className='mt-0.5 h-4 w-4 shrink-0 text-blue-600' />
                    <div>
                        <h2 className='text-sm font-semibold text-blue-800'>Before you begin</h2>
                        <ul className='mt-1 list-disc space-y-0.5 pl-4 text-xs text-blue-700'>
                            <li>Ensure you have a stable internet connection</li>
                            <li>Test your camera and microphone</li>
                            <li>Find a quiet place for the interview</li>
                        </ul>
                    </div>
                </div>

                <div className='mt-4 space-y-2'>
                    <Button className='h-9 w-full'>
                        <Video />
                        Join Interview
                    </Button>
                    <Button variant='outline' className='h-9 w-full'>
                        <Settings />
                        Test Audio &amp; Video
                    </Button>
                </div>
            </section>
        </main>
    )
}

export default Interview