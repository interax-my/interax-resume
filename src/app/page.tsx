'use client'

import Improvements from '@/components/sections/improvements'
import ResumeInfo from '@/components/sections/resume-info'
import { UploadResume } from '@/components/sections/upload-resume'
import { Resume } from '@/lib/models/resume';
import { useRef, useState } from 'react';

export default function Home() {
  const [resumeInfo, setResumeInfo] = useState<Resume | null>(null);
  const [suggestions, setSuggestions] = useState<any>(null);
  const infoAccordionRef = useRef<HTMLButtonElement>(null);

  const toggleInfoAccordion = () => {
    infoAccordionRef.current?.click();
  }

  return (
    <main className="flex flex-col items-center justify-between py-10 px-10 md:px-24 lg:px-40 container gap-y-8">
      <section className='w-full'>
        <UploadResume onResumeInfoExtracted={(info) => {
          setResumeInfo(info);
          toggleInfoAccordion();
        }} />
      </section>
      <section className='w-full'>
        <ResumeInfo
          accordionRef={infoAccordionRef}
          resume={resumeInfo}
          setResume={setResumeInfo}
          setSuggestions={setSuggestions}
        />
      </section>
      <section className='w-full'>
        <Improvements suggestions={suggestions} />
      </section>
    </main>
  )
}