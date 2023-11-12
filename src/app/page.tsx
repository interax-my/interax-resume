import Improvements from '@/components/sections/improvements'
import ResumeInfo from '@/components/sections/resume-info'
import { UploadResume } from '@/components/sections/upload-resume'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between py-10 px-10 md:px-24 lg:px-40 container gap-y-8">
      <UploadResume />
      <section className='flex flex-col items-center justify-between w-full gap-y-2'>
        <ResumeInfo />
        <Improvements />
      </section>
    </main>
  )
}