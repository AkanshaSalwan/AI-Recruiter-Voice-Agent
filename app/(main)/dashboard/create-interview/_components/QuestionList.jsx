'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from '@/components/ui/toast';
import { Loader2Icon } from 'lucide-react';

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData])

  const parseQuestions = (content) => {
    const cleaned = content.replace(/```json/g, "").replace(/```/g, "").trim();
    try {
      const parsed = JSON.parse(cleaned);
      return parsed.interviewQuestions || parsed;
    } catch {
      const match = cleaned.match(/\[[\s\S]*\]/);
      if (match) {
        return JSON.parse(match[0]);
      }
      throw new Error("Invalid AI response");
    }
  }

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        jobPosition: formData.jobPosition,
        jobDescription: formData.jobDescription,
        duration: formData.interviewDuration,
        type: formData.types,
      });

      const content = result.data?.content;
      if (!content) {
        throw new Error(result.data?.error || "Empty AI response");
      }

      const questions = parseQuestions(content);
      setQuestionList(questions);
    } catch (error) {
      console.log(error);
      toast.add({
        title: error?.response?.data?.error || error.message || "Server Error, Try Again!",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading &&
        <div className='p-5 bg-blue-50 rounded-2xl border border-blue-500 flex gap-5 items-center'>
          <Loader2Icon className='animate-spin' />
          <div>
            <h2 className='font-medium'>Generating Question List...</h2>
            <p className='text-blue-500'>Our AI is crafting personalized questions bases on your job position and job description.</p>
          </div>
        </div>
      }

      {!loading && questionList?.length > 0 && (
        <div className='p-5 bg-white rounded-2xl'>
          <h2 className='font-bold text-lg mb-4'>Generated Interview Questions</h2>
          <div className='space-y-3'>
            {questionList.map((item, index) => (
              <div key={index} className='p-3 border border-gray-200 rounded-xl'>
                <h2 className='font-medium'>{index + 1}. {item.question || item}</h2>
                {item.type && (
                  <span className='text-xs text-primary bg-blue-50 px-2 py-1 rounded-full mt-2 inline-block'>
                    {item.type}
                  </span>
                )}
              </div>
            ))}
          </div>
          
        </div>
      )}
    </div>
  )
}

export default QuestionList
