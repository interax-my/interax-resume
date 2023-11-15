export type Resume = {
    personalInfo: {
        name: string | null;
        occupation: string | null;
        experience: number | null;
        location: string | null;
        email: string | null;
    } | null;
    education: {
        college: string | null;
        location: string | null;
        graduationDate: string | null;
        degree: string | null;
        gpa: number | null;
    }[];
    relatedCourseworkProjects: {
        name: string | null;
        year: number | null;
        description: string | null;
    }[];
    skills: string[];
    experience: {
        company: string | null;
        location: string | null;
        datesWorked: string | null;
        title: string | null;
        responsibilities: string[];
    }[];
    certifications: {
        name: string | null;
        expiry: string | null;
    }[];
}