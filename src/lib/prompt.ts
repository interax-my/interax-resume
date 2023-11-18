//todo: optimize token count
export const getAiBody = (prompt: string) => {
  return {
    prompt: prompt,
    model: 'command',
    max_tokens: 2000,
    temperature: 0.2,
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
    
    Note: Respond only with a JSON object and don't fix any spelling and grammatical error. Don't change any sentence, just extract.`;
};

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
    "snippet": "The application utilizes Cohere API for extracting relevant data from resumes. Please note that the system requires a readable PDF format for successful data extraction. Uploading images of resumes is not supported."
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
    "title": "Edit Resume Information",
    "snippet": "If you find incorrect information in the resume details section, click the 'Edit' button to update and correct the information."
  },
  {
    "title": "Missing Features",
    "snippet": "If you notice the absence of a certain feature, rest assured that we are continuously working to enhance and expand our application. We appreciate your feedback, and updates with new features will be rolled out regularly."
  },
  {
    "title": "Chatbot Information",
    "snippet": "Our chatbot, integrated into InteraxResume, is designed to assist you with any questions related to the application, resume revision, or its features. Feel free to ask for guidance or information, and the chatbot will provide helpful responses."
  }
];