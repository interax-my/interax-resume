import SectionContainer from "@/components/section-container"
import { Resume } from "@/lib/models/resume"
import { Button } from "../ui/button";
import { EditIcon } from "lucide-react";

export default function ResumeInfo({ resume }: { resume: Resume | null }) {
  const getEducation = () => resume && resume.education ? resume.education.map((e) => (
    <div className="mb-2">
      <li>
        <span className="font-semibold text-primary">{ e.college ?? 'N/A'}</span>
      </li>
      <li>
        <span className="font-semibold text-primary">Degree</span>: { e.degree ?? 'N/A' }
      </li>
      <li>
        <span className="font-semibold text-primary">Location</span>: { e.location ?? 'N/A' }
      </li>
      <li>
        <span className="font-semibold text-primary">Graduation Date</span>: { e.graduationDate ?? 'N/A' }
      </li>
      <li>
        <span className="font-semibold text-primary">CGPA</span>: { e.gpa ?? 'N/A' }
      </li>
    </div>
  )) : (
    <li>
      <span className="font-semibold text-primary">NA</span>
    </li>
  );

  const getCourseworkProject = () => resume && resume.relatedCourseworkProjects ? resume.relatedCourseworkProjects.map((e) => (
    <div className="mb-2">
      <li>
        <span className="font-semibold text-primary">{ e.name ?? 'N/A'}</span>
      </li>
      <li>
        <span className="font-semibold text-primary">Year</span>: { e.year ?? 'N/A' }
      </li>
      <li>
        <span className="font-semibold text-primary">Description</span>: { e.description ?? 'N/A' }
      </li>
    </div>
  )) : (
    <li>
      <span className="font-semibold text-primary">NA</span>
    </li>
  );

  const getExperience = () => resume && resume.experience ? resume.experience.map((e) => (
    <div className="mb-2">
      <li>
        <span className="font-semibold text-primary">{ e.title ?? 'N/A'}</span>
      </li>
      <li>
        <span className="font-semibold text-primary">Company</span>: { e.company ?? 'N/A' }
      </li>
      <li>
        <span className="font-semibold text-primary">Location</span>: { e.location ?? 'N/A' }
      </li>
      <li>
        <span className="font-semibold text-primary">Date</span>: { e.datesWorked ?? 'N/A' }
      </li>
      <li>
        <span className="font-semibold text-primary">Accomplishment</span>: { !e.accomplishments && 'N/A' }
        { e.accomplishments && (
          <ul className="ml-10 list-disc">
            { e.accomplishments.map((accomplishment, index) => <li key={index}>{accomplishment}</li>) }
          </ul>
        ) }
      </li>
    </div>
  )) : (
    <li>
      <span className="font-semibold text-primary">NA</span>
    </li>
  );

  const getCertificate = () => resume && resume.certifications ? resume.certifications.map((e) => (
    <div className="mb-2">
      <li>
        <span className="font-semibold text-primary">{ e.name ?? 'N/A'}</span>
      </li>
      <li>
        <span className="font-semibold text-primary">Expiry</span>: { e.expiry ?? 'N/A' }
      </li>
    </div>
  )) : (
    <li>
      <span className="font-semibold text-primary">NA</span>
    </li>
  );

  const getSkill = () => resume && resume.skills ? resume.skills.map((e) => (
    <li className="ml-5 list-disc">
      <span className="font-semibold text-primary">{ e }</span>
    </li>
  )) : (
    <li>
      <span className="font-semibold text-primary">NA</span>
    </li>
  );

  return (
    //todo: fill resume info and make it editable
    <SectionContainer title={ "Resume Info" } description={ "Double-check the Details to Make Sure Everything is Accurate" } isOpen={ resume !== null }>
      <div className="flex justify-end">
            <Button variant='secondary' className="w-full sm:w-auto">
              <EditIcon className="mr-2 h-4 w-4" />
              Edit
            </Button>
        </div>
      <ul>
        <li>
          <h4 className="text-sm font-medium">Personal Info</h4>
        </li>
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
        <li className="mt-4">
          <h4 className="text-sm font-medium">Education</h4>
        </li>
        { getEducation() }
        <li className="mt-4">
          <h4 className="text-sm font-medium">Coursework Projects</h4>
        </li>
        { getCourseworkProject() }
        <li className="mt-4">
          <h4 className="text-sm font-medium">Experience</h4>
        </li>
        { getExperience() }
        <li className="mt-4">
          <h4 className="text-sm font-medium">Certifications</h4>
        </li>
        { getCertificate() }
        <li className="mt-4">
          <h4 className="text-sm font-medium">Skills</h4>
        </li>
        { getSkill() }
      </ul>
    </SectionContainer>
  )
}