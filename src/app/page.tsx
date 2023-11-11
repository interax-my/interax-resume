import { UploadResume } from '@/components/sections/upload-resume'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between py-10 px-10 md:px-24 lg:px-40 container">
      <UploadResume />
    </main>
  )
}