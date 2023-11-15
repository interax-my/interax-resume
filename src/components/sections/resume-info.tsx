import SectionContainer from "@/components/section-container"
import { Resume } from "@/lib/models/resume"
import { EditPersonalInfo } from "./edit-personal-info";
import { EditEducation } from "./edit-education";
import { EditProject } from "./edit-project";
import { EditExperience } from "./edit-experience";
import { EditCertificate } from "./edit-certificate";
import { EditSkill } from "./edit-skill";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { tryParseJson } from "@/lib/utils";
import { Dispatch, useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function ResumeInfo({ resume, setResume, setSuggestions }: { resume: Resume | null, setResume: (info: Resume) => void, setSuggestions: Dispatch<any> }) {
  const [loading, setLoading] = useState(false);

  const handleSuggestImprovements = () => {
    setLoading(true);
    axios.post('api/process-resume', { resumeObj: resume })
      .then(data => {
        try {
          const parsedData = tryParseJson(data.data.data);
          setSuggestions(parsedData);
          setLoading(false);
        } catch (_) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: 'Unable to parse improvements.',
            }); 
        }
      });
  }

  const getEducation = () => resume && resume.education && resume.education.length !== 0 ? resume.education.map((e, index) => (
    <div key={`edu-${index}`} className="mb-2">
      <li>
        <span className="font-semibold text-primary">{e.degree ?? 'N/A'}</span>
      </li>
      <li>
        <span className="font-semibold text-primary">College</span>: {e.college ?? 'N/A'}
      </li>
      <li>
        <span className="font-semibold text-primary">Location</span>: {e.location ?? 'N/A'}
      </li>
      <li>
        <span className="font-semibold text-primary">Graduation Date</span>: {e.graduationDate ?? 'N/A'}
      </li>
      <li>
        <span className="font-semibold text-primary">CGPA</span>: {e.gpa ?? 'N/A'}
      </li>
    </div>
  )) : (
    <li>
      <span className="font-semibold text-primary">NA</span>
    </li>
  );

  const getCourseworkProject = () => resume && resume.relatedCourseworkProjects && resume.relatedCourseworkProjects.length !== 0 ? resume.relatedCourseworkProjects.map((e, index) => (
    <div key={`proj-${index}`} className="mb-2">
      <li>
        <span className="font-semibold text-primary">{e.name ?? 'N/A'}</span>
      </li>
      <li>
        <span className="font-semibold text-primary">Year</span>: {e.year ?? 'N/A'}
      </li>
      <li>
        <span className="font-semibold text-primary">Description</span>: {e.description ?? 'N/A'}
      </li>
    </div>
  )) : (
    <li>
      <span className="font-semibold text-primary">NA</span>
    </li>
  );

  const getExperience = () => resume && resume.experience && resume.experience.length !== 0 ? resume.experience.map((e, index) => (
    <div key={`ex-${index}`} className="mb-2">
      <li>
        <span className="font-semibold text-primary">{e.title ?? 'N/A'}</span>
      </li>
      <li>
        <span className="font-semibold text-primary">Company</span>: {e.company ?? 'N/A'}
      </li>
      <li>
        <span className="font-semibold text-primary">Location</span>: {e.location ?? 'N/A'}
      </li>
      <li>
        <span className="font-semibold text-primary">Date</span>: {e.datesWorked ?? 'N/A'}
      </li>
      <li>
        <span className="font-semibold text-primary">Responsibilities</span>: {!e.responsibilities && 'N/A'}
        {e.responsibilities && (
          <ul className="ml-10 list-disc">
            {e.responsibilities.map((responsibilities, index) => <li key={index}>{responsibilities}</li>)}
          </ul>
        )}
      </li>
    </div>
  )) : (
    <li>
      <span className="font-semibold text-primary">NA</span>
    </li>
  );

  const getCertificate = () => resume && resume.certifications && resume.certifications.length !== 0 ? resume.certifications.map((e, index) => (
    <div key={`cert-${index}`} className="mb-2">
      <li>
        <span className="font-semibold text-primary">{e.name ?? 'N/A'}</span>
      </li>
      <li>
        <span className="font-semibold text-primary">Expiry</span>: {e.expiry ?? 'N/A'}
      </li>
    </div>
  )) : (
    <li>
      <span className="font-semibold text-primary">NA</span>
    </li>
  );

  const getSkill = () => resume && resume.skills && resume.skills.length !== 0 ? resume.skills.map((e, index) => (
    <li key={`skill-${index}`} className="ml-5 list-disc">
      <span className="font-semibold text-primary">{e}</span>
    </li>
  )) : (
    <li>
      <span className="font-semibold text-primary">NA</span>
    </li>
  );

  return (
    <SectionContainer title={"Resume Info"} description={"Double-check the Details to Make Sure Everything is Accurate"} isOpen={resume !== null}>
      <ul>
        <li>
          <div className="grid grid-cols-4 gap-4 items-center">
            <h4 className="text-sm font-medium col-span-3">Personal Info</h4>
            {resume && (
              <div className="col-span-1 flex justify-end">
                <EditPersonalInfo resume={resume} setResume={setResume} />
              </div>
            )}
          </div>
        </li>
        <li>
          <span className="font-semibold text-primary">Name</span>: {resume?.personalInfo?.name ?? 'N/A'}
        </li>
        <li>
          <span className="font-semibold text-primary">Occupation</span>: {resume?.personalInfo?.occupation ?? 'N/A'}
        </li>
        <li>
          <span className="font-semibold text-primary">Experience</span>: {resume?.personalInfo?.experience ?? 'N/A'}
        </li>
        <li>
          <span className="font-semibold text-primary">Email</span>: {resume?.personalInfo?.email ?? 'N/A'}
        </li>
        <li>
          <span className="font-semibold text-primary">Location</span>: {resume?.personalInfo?.location ?? 'N/A'}
        </li>
        <li>
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <h4 className="text-sm font-medium col-span-3">Education</h4>
            {resume && (
              <div className="col-span-1 flex justify-end">
                <EditEducation resume={resume} setResume={setResume} />
              </div>
            )}
          </div>
        </li>
        {getEducation()}
        <li>
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <h4 className="text-sm font-medium col-span-3">Coursework Projects</h4>
            {resume && (
              <div className="col-span-1 flex justify-end">
                <EditProject resume={resume} setResume={setResume} />
              </div>
            )}
          </div>
        </li>
        {getCourseworkProject()}
        <li>
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <h4 className="text-sm font-medium col-span-3">Experience</h4>
            {resume && (
              <div className="col-span-1 flex justify-end">
                <EditExperience resume={resume} setResume={setResume} />
              </div>
            )}
          </div>
        </li>
        {getExperience()}
        <li>
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <h4 className="text-sm font-medium col-span-3">Certifications</h4>
            {resume && (
              <div className="col-span-1 flex justify-end">
                <EditCertificate resume={resume} setResume={setResume} />
              </div>
            )}
          </div>
        </li>
        {getCertificate()}
        <li>
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <h4 className="text-sm font-medium col-span-3">Skills</h4>
            {resume && (
              <div className="col-span-1 flex justify-end">
                <EditSkill resume={resume} setResume={setResume} />
              </div>
            )}
          </div>
        </li>
        {getSkill()}
      </ul>
      <div className="flex justify-end">
        <Button onClick={handleSuggestImprovements} disabled={loading || resume == null}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Suggest Improvements
        </Button>
      </div>
    </SectionContainer>
  )
}