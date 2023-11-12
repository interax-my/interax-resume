import SectionContainer from "@/components/section-container"
import { Resume } from "@/lib/models/resume"

export default function ResumeInfo({ resume }: { resume: Resume | null } ) {
  return (
    //todo: fill resume info and make it editable
    <SectionContainer title={ "Resume Info" } description={ "Double-check the Details to Make Sure Everything is Accurate" } isOpen={ resume !== null }>
      <ul>
        <li>
          <span className="font-semibold text-primary">Name</span>: { resume?.personalInfo?.name ?? 'N/A' }
        </li>
        <li>
          <span className="font-semibold text-primary">Occupation</span>: { resume?.personalInfo?.occupation ?? 'N/A' }
        </li>
        <li>
          <span className="font-semibold text-primary">Email</span>: { resume?.personalInfo?.email ?? 'N/A' }
        </li>
        <li>
          <span className="font-semibold text-primary">Location</span>: { resume?.personalInfo?.location ?? 'N/A' }
        </li>
      </ul>
    </SectionContainer>
  )
}