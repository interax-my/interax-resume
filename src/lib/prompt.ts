//todo: optimize token count
export const getAiBody = (prompt: string) => {
  return {
    prompt: prompt,
    model: 'command',
    max_tokens: 2000,
    temperature: 0.3,
    stream: false,
    prompt_truncation: 'off',
    citation_quality: 'fast',
  };
};

export const generateExtractPdfPrompt = (content: string) => {
  return `Given a resume in text format below, please extract the following information and provide the results in a JSON object.

    ###resume content###
    ${content}
    ###end resume content###
    
    1. Personal Information:
       - Name
       - Occupation
       - Experience (in years)
       - Location
       - Email
    
    2. Education:
       - For each educational institution, provide:
          - College name
          - Location
          - Graduation date or expected graduation date
          - Degree
          - GPA (if available and 3.0 or above)
    
    3. Related Coursework or Projects:
       - For each coursework or project, provide:
          - Name
          - Year
          - Description
    
    4. Skills:
       - List of relevant skills (computer, language, software, technical, interpersonal)
    
    5. Experience:
       - For each work experience entry, provide:
          - Company name
          - Location
          - Dates worked
          - Title
          - List of responsibilities
    
    6. Certifications:
       - List of certifications
    
    Ensure that all fields are filled, and if no related information is found, leave it as "null".
    
    ## Output Example ##
    {
      "personalInfo": {
        "name": "John Doe",
        "occupation": null,
        "experience": null,
        "location": "123 Lake Ln., Cleveland, OH 44115",
        "email": "john.doe@vikes.csuohio.edu"
      },
      "education": [
        {
          "college": "Cleveland State University",
          "location": "Cleveland, OH",
          "graduationDate": "May 2019",
          "degree": "Bachelor of Arts, Urban Studies",
          "gpa": 3.6
        }
      ],
      "relatedCourseworkProjects": [
        {
          "name": "Project #1",
          "year": 2017,
          "description": "Brief explanation of project"
        }
      ],
      "skills": [
        "Microsoft Excel",
        "Project management",
        "Community Service",
        "Research",
        "Problem solving",
        "Public speaking"
      ],
      "experience": [
        {
          "company": "Company Name",
          "location": "Cleveland, OH",
          "datesWorked": "August 2016 - Present",
          "title": "Title, Department",
          "responsibilities": [
            "...",
          ]
        },
        {
          "company": "Company Name",
          "location": "Cleveland, OH",
          "datesWorked": "January 2015 - July 2016",
          "title": "Intern, Department",
          "responsibilities": [
            "...",
          ]
        }
      ],
      "certifications": [
        {
          "name": "CSU Student Life and Housing",
          "expiry": "2023-04-31"
        }
      ]
    }
    
    Respond only with a JSON object.`;
};

export const generateImproveResumePrompt = (content: string) => {
  return `
  You are a career consultants, you will look at each task below and do as instructed. After that, determine whether the task result is true or false. If the task cannot be finished due to lack in information, answer will be false. If the answer is false, provide justification and suggestion with less than 30 words. If the answer is true, leave suggestion empty. The tasks are independent from each other. You will respond with a JSON object in the format of {"taskName": {"answer": true/false, "justification": "", "suggestion": ""}}. The task name can be identified from the double asterisks.

  ### Task List ###

  NOTE: If any information is just and empty string, consider invalid and empty.

  **Professional Email**
  Determine the person's email address. After that, check whether the email satisfies the criteria for a professional email address. Criteria for a professional email are - no random numbers and must contain the person's name.

  **Location Privacy**
  Determine the location provided under personal information. It should not provide house number or apartment building to keep privacy. Does the location keep privacy?

  **Graduation Date**
  Extract education information of the person. Determine graduation date for all education.

  **Job Responsibilities**
  Focus on experience. Determine what are the responsibilities and job titile for each of the experiences. Can all responsibilities be determined for each experience, skills used are mentioned, and match the job title?

  **Job Location**
  Focus on experience. Determine where is the location and company name.

  **Skills**
  Determine the occupation of the person from their provided personal information, after that check through the skills section. Does all core skills related to the person occupation are listed?

  **Project Contributions**
  Focus on the experience section. Determine specific projects the person has contributed to in each job experience, outlining their role, contributions, and impact on the projects. Does the person has project contributions?

  **Certification Expiry**
  List out the person's certification if there's any. Does all of them provided with expiry date?

  **References**
  Check if the resume includes professional references. Provide details on the names and contact information of the references if available.

  ### Input ###
  ${content}
  ### End Input ###

  ### Output ###
  `;
};

//todo: more info about apps
export const getChatDocuments = () => [
  {
    "title": "Application Name",
    "snippet": "InteraxResume",
  },
  {
    "title": "Application Overview",
    "snippet": "Our web application is a resume revision system that leverages AI to enhance resumes."
  },
  {
    "title": "Resume Data Extraction",
    "snippet": "The application utilizes Cohere API for extracting relevant data from resumes."
  },
  {
    "title": "AI Suggestions",
    "snippet": "Cohere API is employed to provide intelligent suggestions on how to improve and optimize resumes."
  },
  {
    "title": "Key Features",
    "snippet": "Our application offers advanced features such as resume analysis, language enhancement, and personalized recommendations."
  },
  {
    "title": "User-Friendly Interface",
    "snippet": "We prioritize a user-friendly experience to ensure easy navigation and interaction with the application."
  },
  {
    "title": "Chatbot Information",
    "snippet": "Our chatbot, integrated into InteraxResume, is designed to assist you with any questions related to the application, resume revision, or its features. Feel free to ask for guidance or information, and the chatbot will provide helpful responses."
  }
];