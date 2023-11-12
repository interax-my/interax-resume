'use client'

import Improvements from '@/components/sections/improvements'
import ResumeInfo from '@/components/sections/resume-info'
import { UploadResume } from '@/components/sections/upload-resume'
import { Resume } from '@/lib/models/resume';
import { useState } from 'react';

export default function Home() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeInfo, setResumeInfo] = useState<Resume | null>(null);

  const onResumeSelected = (file: File) => {
    setResumeFile(file);
  };

  return (
    <main className="flex flex-col items-center justify-between py-10 px-10 md:px-24 lg:px-40 container gap-y-8">
      <UploadResume resume={ resumeFile } onSelect={ onResumeSelected } />
      <section className='flex flex-col items-center justify-between w-full gap-y-2'>
        <ResumeInfo resume={ resumeInfo } />
        <Improvements />
      </section>
    </main>
  )
}