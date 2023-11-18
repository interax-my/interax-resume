'use client'

import Chatbot from '@/components/chatbot';
import Improvements from '@/components/sections/improvements'
import ResumeInfo from '@/components/sections/resume-info'
import { UploadResume } from '@/components/sections/upload-resume'
import { Resume } from '@/lib/models/resume';
import { Suggestion } from '@/lib/models/suggestions';
import { useRef, useState } from 'react';

export default function Home() {
  const [resumeInfo, setResumeInfo] = useState<Resume | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion | null>(null);
  const [infoExpanded, setInfoExpanded] = useState(false);
  const infoAccordionRef = useRef<HTMLButtonElement>(null);
  const [improveExpanded, setImproveExpanded] = useState(false);
  const improveAccordionRef = useRef<HTMLButtonElement>(null);

  const toggleInfoAccordion = () => {
    if (infoExpanded) return;
    infoAccordionRef.current?.click();
    setInfoExpanded(true);
  }

  const toggleImproveAccordion = () => {
    if (improveExpanded) return;
    improveAccordionRef.current?.click();
    setImproveExpanded(true);
  }

  return (
    <main className="flex flex-col items-center justify-between pt-10 pb-14 px-10 md:px-24 lg:px-40 container gap-y-8">
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
          setSuggestions={(suggestions) => {
            setSuggestions(suggestions);
            toggleImproveAccordion();
          }}
          onChange={() => setInfoExpanded(!infoExpanded)}
        />
      </section>
      <section className='w-full'>
        <Improvements suggestions={suggestions} accordionRef={improveAccordionRef} onChange={() => setImproveExpanded(!improveExpanded)} />
      </section>
      <Chatbot />
    </main>
  )
}