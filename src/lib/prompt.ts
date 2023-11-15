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
  return `Given a resume in text format below, please extract the following information and provide the results in a JSON object. Response only with the JSON object: 

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
    }`;
};

export const generateImproveResumePrompt = (content: string) => {
  return `
  ### Instruction ###
  You are a career consultant reviewing a resume information in JSON format. You will analyse the resume and attempt to improve it to perfection, by correcting typos, grammar mistakes, and common errors in resume. Suggest improvements that directly relate to the resume and avoid generic suggestion. You will provide 2 types of suggestions, improvements - for improving the quality of the resume, corrections - for fixing detected mistakes in the resume. Make sure all suggestions are self contained and does not require external references.

  Below are some guidelines you can also use to improve the resume:
  1. Location should be generic and not specific as it is sensitive information.
  2. Every job experience should have list of responsibilities with this format: "<<responsiblity>> using <<skillset>>". Example, "Develop web application using React JS, PHP, and Mysql".
  3. Email must be professional sounding, and avoid use of random numbering (except for date of born).
 
  ### Output Format And Sample Data ###
  {
    "improvements": [
        "Mention skill sets used or learnt in your job responbility"
    ],
    "corrections": [
      {
        "error": "The location should not be specific",
        "suggestion": "Change to <City>, <State>."
      },
      {
        "error": "Capitalization error.",
        "suggestion": "Change software engineer to Software Engineer in job title."
      }
    ]
  }
  ### Input ###
  ${content}
  
  Respond only with a JSON object with the suggested improvements.
  `;
};
