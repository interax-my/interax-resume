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
  You are a career consultant, and provide a resume improvement service. You will suggest improvements to extracted information from a resume, located in the ### Input ### section. You also will check if the resume does not met the below checklist.

  Given input below, find out if any of the followings are not met:
  1. Location should not be too specific as to be personally identifiable.
  2. Email address should not contain random numbers, and must sound professional.
  3. Every experience should contain the location.

  If an item is not met, insert into a JSON object. The JSON object should only contain a list of strings that contains your findings.

  IMPORTANT: You must respond *ONLY* with a JSON object and nothing else.

    ### Input ###
  {
    "personalInfo":{
        "name":"John Doe",
        "occupation":"Full Stack Developer",
        "experience":2,
        "location":"Cyberjaya, Selangor",
        "email":"john@gmail.com"
    },
    "education":[
        {
          "college":"Universiti Tenaga Nasional",
          "location":"",
          "graduationDate":"Dec 2021",
          "degree":"Bachelor of Computer Science (Software Engineering)",
          "gpa":3.00
        },
        {
          "college":"Kolej Professional Mara Beranang",
          "location":"",
          "graduationDate":"Oct 2018",
          "degree":"FHND in Computing (System Development)",
          "gpa":3.00
        }
    ],
    "relatedCourseworkProjects":[
        {
          "name":"Java Tutoring System for Malaysian Public Tertiary Schools",
          "year":"Aug 2022 - Jan 2023",
          "description":"Freelance project with XXX and BBB Berhad (funder) for an online Java tutoring system for students and teachers of secondary public schools in Malaysia."
        },
        {
          "name":"AI-driven Call Analytics System",
          "year":"Aug 2021 - Nov 2021",
          "description":"Trained machine learning models and integrated them into a web prototype under the AI-driven Customer Call Analysis System, a XXX Seed Fund project."
        },
        {
          "name":"Covid Hotspot Geolocation Alert (UNISAFE)",
          "year":"",
          "description":"Mobile Development"
        },
        {
          "name":"NZ Labour Party Website",
          "year":"",
          "description":"Advanced Web Development"
        }
    ],
    "skills":[
        "OOP Programming",
        "Web Development",
        "PHP",
        "MySQL",
        "HTML",
        "CSS",
        "Javascript",
        "React",
        "Laravel",
        "Python & Machine Learning",
        "TensorFlow",
        "sklearn",
        "Flask",
        "Mobile Development",
        "Xamarin",
        "Java",
        "C#",
        "Linux",
        "Deployment (VPS and Containers)",
        "CI/CD"
    ],
    "experience":[
        {
          "company":"AAA Digital Ltd",
          "location":"",
          "datesWorked":"May 2022 - present",
          "title":"Full Stack Developer",
          "responsibilities":[
              "Developing and managing Sitecore and JSP websites for Singapore government agencies. Building and setting up DevOps workflow for the internal development team."
          ]
        },
        {
          "company":"BBB Axis",
          "location":"",
          "datesWorked":"Dec 2021 - Apr 2022",
          "title":"Java Programmer",
          "responsibilities":[
              "Participated in the complete software development life cycle of a banking solution to a public bank in Brunei."
          ]
        },
        {
          "company":"CCC Berhad",
          "location":"",
          "datesWorked":"Aug 2021 - Nov 2021",
          "title":"Software Tester Intern",
          "responsibilities":[
              "Conducted System Integration Testing (SIT), System Testing (ST), and User Acceptance Testing (UAT) on several systems developed by CCC and its vendors."
          ]
        },
        {
          "company":"EEE-IT Sdn Bhd",
          "location":"",
          "datesWorked":"Mar 2023 - present",
          "title":"Mobile Developer",
          "responsibilities":[
              "Development of machine-learning integrated Flutter mobile application, aiming to help visually impaired person to detect text with support for 7 segment digit recognition."
          ]
        },
        {
          "company":"YCU R&D SDN BHD | FDA SDN BHD",
          "location":"",
          "datesWorked":"Aug 2021 - Nov 2021",
          "title":"External Consultant & Developer",
          "responsibilities":[
              "Trained machine learning models and integrated them into a web prototype under the AI-driven Customer Call Analysis System, a FDA Seed Fund project."
          ]
        },
        {
          "company":"Yayasan Canselor UT",
          "location":"",
          "datesWorked":"Aug 2022 - Jan 2023",
          "title":"Full Stack Developer",
          "responsibilities":[
              "Freelance project with XXX and FDA Berhad (funder) for an online JAVA tutoring system for students and teachers of secondary public schools in Malaysia."
          ]
        }
    ],
    "certifications":[
        {
          "name":"AWS Partner: Accreditation (Technical)",
          "expiry":""
        },
        {
          "name":"Microsoft Certified: Azure Developer Associate",
          "expiry":""
        },
        {
          "name":"Microsoft Certified: DevOps Engineer Expert",
          "expiry":""
        }
    ]
  }
  ### End Input ###

  ### Output ###
  {
  "education": [
  "Location information missing for Universiti Tenaga Nasional",
  "Location information missing for Kolej Professional Mara Beranang"
  ],
  "relatedCourseworkProjects": [
  "Year information missing for Covid Hotspot Geolocation Alert (UNISAFE)",
  "Year information missing for NZ Labour Party Website"
  ],
  "experience": [
  "Location information missing for AAA Digital Ltd",
  "Location information missing for BBB Axis",
  "Location information missing for CCC Berhad",
  "Location information missing for EEE-IT Sdn Bhd",
  "Location information missing for YCU R&D SDN BHD | FDA SDN BHD",
  "Location information missing for Yayasan Canselor UT"
  ]
  }
  ### End Output ###

  ### Input ###
  ${content}
  ### End Input ###

  ### Output ###
  `;
};
