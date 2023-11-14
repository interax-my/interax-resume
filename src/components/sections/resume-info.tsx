import SectionContainer from "@/components/section-container"
import { Resume } from "@/lib/models/resume"
import { EditPersonalInfo } from "./edit-personal-info";
import { EditEducation } from "./edit-education";
import { EditProject } from "./edit-project";
import { EditExperience } from "./edit-experience";
import { EditCertificate } from "./edit-certificate";
import { EditSkill } from "./edit-skill";

export default function ResumeInfo({ resume, setResume }: { resume: Resume | null, setResume: (info: Resume) => void }) {
  const getEducation = () => resume && resume.education ? resume.education.map((e, index) => (
    <div key={ `edu-${index}` } className="mb-2">
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

  const getCourseworkProject = () => resume && resume.relatedCourseworkProjects ? resume.relatedCourseworkProjects.map((e, index) => (
    <div key={ `proj-${index}` } className="mb-2">
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

  const getExperience = () => resume && resume.experience ? resume.experience.map((e, index) => (
    <div key={ `ex-${index}` } className="mb-2">
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

  const getCertificate = () => resume && resume.certifications ? resume.certifications.map((e, index) => (
    <div key={ `cert-${index}` } className="mb-2">
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

  const getSkill = () => resume && resume.skills ? resume.skills.map((e, index) => (
    <li key={ `skill-${index}` } className="ml-5 list-disc">
      <span className="font-semibold text-primary">{ e }</span>
    </li>
  )) : (
    <li>
      <span className="font-semibold text-primary">NA</span>
    </li>
  );

  return (
    <SectionContainer title={ "Resume Info" } description={ "Double-check the Details to Make Sure Everything is Accurate" } isOpen={ resume !== null }>
      <ul>
        <li>
          <div className="grid grid-cols-4 gap-4 items-center">
            <h4 className="text-sm font-medium col-span-3">Personal Info</h4>
            { resume && (
              <EditPersonalInfo resume={ resume } setResume={ setResume } />
            )}
          </div>
        </li>
        <li>
          <span className="font-semibold text-primary">Name</span>: { resume?.personalInfo?.name ?? 'N/A' }
        </li>
        <li>
          <span className="font-semibold text-primary">Occupation</span>: { resume?.personalInfo?.occupation ?? 'N/A' }
        </li>
        <li>
          <span className="font-semibold text-primary">Experience</span>: { resume?.personalInfo?.experience ?? 'N/A' }
        </li>
        <li>
          <span className="font-semibold text-primary">Email</span>: { resume?.personalInfo?.email ?? 'N/A' }
        </li>
        <li>
          <span className="font-semibold text-primary">Location</span>: { resume?.personalInfo?.location ?? 'N/A' }
        </li>
        <li>
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <h4 className="text-sm font-medium col-span-3">Education</h4>
            { resume && (
              <EditEducation resume={ resume } setResume={ setResume } />
            )}
          </div>
        </li>
        { getEducation() }
        <li>
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <h4 className="text-sm font-medium col-span-3">Coursework Projects</h4>
            { resume && (
              <EditProject resume={ resume } setResume={ setResume } />
            )}
          </div>
        </li>
        { getCourseworkProject() }
        <li>
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <h4 className="text-sm font-medium col-span-3">Experience</h4>
            { resume && (
              <EditExperience resume={ resume } setResume={ setResume } />
            )}
          </div>
        </li>
        { getExperience() }
        <li>
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <h4 className="text-sm font-medium col-span-3">Certifications</h4>
            { resume && (
              <EditCertificate resume={ resume } setResume={ setResume } />
            )}
          </div>
        </li>
        { getCertificate() }
        <li>
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <h4 className="text-sm font-medium col-span-3">Skills</h4>
            { resume && (
              <EditSkill resume={ resume } setResume={ setResume } />
            )}
          </div>
        </li>
        { getSkill() }
      </ul>
    </SectionContainer>
  )
}