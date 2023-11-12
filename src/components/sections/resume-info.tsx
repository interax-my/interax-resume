import SectionContainer from "@/components/section-container"
import { Resume } from "@/lib/models/resume"

export default function ResumeInfo({ resume }: { resume: Resume | null } ) {
  return (
    <SectionContainer title={"Resume Info"}>
      <ul>
        <li>
          <span className="font-semibold text-primary">Name</span>: John Doe
        </li>
        <li>
          <span className="font-semibold text-primary">Occupation</span>: Meme artist
        </li>
        <li>
          <span className="font-semibold text-primary">Location</span>: Cyberjaya, Selangor
        </li>
      </ul>
    </SectionContainer>
  )
}