
'use client'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Timer, Mic, Phone } from 'lucide-react'
import Image from 'next/image'
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation'
import { Button } from '@/components/ui/button'

const DAILY_NOISE_PATTERNS = [
  'unsupported input processor',
  'meeting ended due to ejection',
  'meeting has ended',
  'mediastreamtrack found in props or cache',
]

function getErrorText(error) {
  try {
    return JSON.stringify(error ?? {})
  } catch {
    return String(error ?? '')
  }
}

function isBenignVapiError(error) {
  const text = getErrorText(error).toLowerCase()
  return DAILY_NOISE_PATTERNS.some((pattern) => text.includes(pattern)) ||
    text.includes('microphone preflight cancelled') ||
    text.includes('aborterror') ||
    text.includes('microphone-preflight')
}

function isDailyConsoleNoise(args) {
  const text = args
    .map((arg) => {
      if (typeof arg === 'string') return arg
      if (arg?.message) return String(arg.message)
      if (arg?.errorMsg) return String(arg.errorMsg)
      try {
        return JSON.stringify(arg)
      } catch {
        return String(arg)
      }
    })
    .join(' ')
    .toLowerCase()

  return DAILY_NOISE_PATTERNS.some((pattern) => text.includes(pattern))
}

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext)
  const vapiRef = useRef(null)
  const callActiveRef = useRef(false)
  const [callActive, setCallActive] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [statusText, setStatusText] = useState('Ready to begin')

  if (!vapiRef.current && process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY)
  }

  useEffect(() => {
    const originalError = console.error
    console.error = (...args) => {
      if (isDailyConsoleNoise(args)) return
      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  useEffect(() => {
    const vapi = vapiRef.current
    if (!vapi) return

    const onCallStart = () => {
      callActiveRef.current = true
      setCallActive(true)
      setIsStarting(false)
      setStatusText('Interview in Progress....')
    }

    const onCallEnd = () => {
      callActiveRef.current = false
      setCallActive(false)
      setIsStarting(false)
      setStatusText((current) =>
        current.startsWith('Ended:') ? current : 'Interview ended'
      )
    }

    const onMessage = (message) => {
      if (message?.type === 'status-update' && message?.status === 'ended') {
        const reason = message?.endedReason || 'unknown'
        setStatusText(`Ended: ${reason}`)
      }
    }

    const onError = (error) => {
      if (isBenignVapiError(error)) return
      console.error('Vapi error:', getErrorText(error))
      setIsStarting(false)
      setStatusText('Unable to start interview. Please try again.')
    }

    vapi.on('call-start', onCallStart)
    vapi.on('call-end', onCallEnd)
    vapi.on('message', onMessage)
    vapi.on('error', onError)

    return () => {
      vapi.removeListener('call-start', onCallStart)
      vapi.removeListener('call-end', onCallEnd)
      vapi.removeListener('message', onMessage)
      vapi.removeListener('error', onError)
      // Do not call vapi.stop() here — Strict Mode remounts would eject the meeting.
    }
  }, [])

  const startCall = async () => {
    const vapi = vapiRef.current
    if (!vapi || !interviewInfo || callActiveRef.current || isStarting) return

    const questionList = interviewInfo?.interviewData?.questionList
      ?.map((item) => item?.question)
      .filter(Boolean)
      .join(', ')

    const assistantOptions = {
      name: 'AI Recruiter',
      firstMessage:
        'Hi ' +
        interviewInfo?.userName +
        ', how are you? Ready for your interview on ' +
        interviewInfo?.interviewData?.jobPosition +
        '?',
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en-US',
      },
      // Built-in Vapi voice (Jennifer is not a valid Vapi voiceId).
      voice: {
        provider: 'vapi',
        voiceId: 'Emma',
        version: 2,
      },
      model: {
        provider: 'openai',
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: ${questionList}
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty 🎤
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate's confidence level
✅ Ensure the interview remains focused on React
`.trim(),
          },
        ],
      },
    }

    setIsStarting(true)
    setStatusText('Connecting...')

    try {
      await vapi.start(assistantOptions)
    } catch (error) {
      if (!isBenignVapiError(error)) {
        console.error('Vapi start failed:', getErrorText(error))
        setStatusText('Unable to start interview. Please try again.')
      }
      setIsStarting(false)
    }
  }

  const stopInterview = () => {
    const vapi = vapiRef.current
    if (!vapi) return

    try {
      vapi.stop()
    } catch (_) {
      // ignore — meeting may already be ended
    }
    callActiveRef.current = false
    setCallActive(false)
    setIsStarting(false)
    setStatusText('Interview ended')
  }

  return (
    <div className='p-20 lg:px-48 xl:px-56 bg-gray-200'>
      <h2 className='font-bold text-xl flex justify-between'>
        AI Interview Session
        <span className='flex gap-2 item-center'>
          <Timer />
          00:00:00
        </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 flex items-center justify-center'>
          <Image src={'/ai.png'} alt='ai'
            width={100}
            height={100}
            className='w-[60px] h-[60px] rounded-full object-cover'
          />
          <h2>AI Recruiter</h2>
        </div>
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
          <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-6'>{interviewInfo?.userName?.[0]}</h2>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      {!callActive && (
        <div className='mt-7 flex justify-center'>
          <Button onClick={startCall} disabled={!interviewInfo || isStarting}>
            {isStarting ? 'Connecting...' : 'Start Interview'}
          </Button>
        </div>
      )}

      {callActive && (
        <div className='flex item-center gap-5 justify-center mt-7'>
          <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer' />
          <AlertConfirmation stopInterview={stopInterview}>
            <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer' />
          </AlertConfirmation>
        </div>
      )}

      <h2 className='text-sm text-gray-400 text-center mt-5'>{statusText}</h2>
    </div>
  )
}

export default StartInterview
