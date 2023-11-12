export const getAiBody = ( prompt: string ) => {
    return {
        prompt: prompt,
        model: 'command',
        max_tokens: 2000,
        temperature: 0.3,
        stream: false,
        prompt_truncation: 'off',
        citation_quality: 'fast',
    };
}

export const generateExtractPdfPrompt = (content: string) => {
    return `Given a resume in text format below, please extract the following information and provide the results in a JSON object:

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
          - List of accomplishments or results
    
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
          "accomplishments": [
            "Most relevant accomplishment or results",
            "Most relevant accomplishment or results"
          ]
        },
        {
          "company": "Company Name",
          "location": "Cleveland, OH",
          "datesWorked": "January 2015 - July 2016",
          "title": "Intern, Department",
          "accomplishments": [
            "Most relevant accomplishment or results",
            "Most relevant accomplishment or results"
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
}