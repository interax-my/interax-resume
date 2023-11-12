'use client'

import { Button } from "@/components/ui/button";
import { UploadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ProcessResume } from "./process-resume";
import SectionContainer from "@/components/section-container";
import axios from "axios";
import { fileToBase64 } from "@/lib/base64";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { generateExtractPdfPrompt, getAiBody } from "@/lib/prompt";
import { Stream } from "stream";
import { Resume } from "@/lib/models/resume";

export function UploadResume({ onResumeInfoExtracted }: { onResumeInfoExtracted: (info: Resume) => void }) {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [isProcessing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setResumeFile(event.target.files[0]);
        }    
    };

    const onProcess = async () => {
        setProcessing(true);
        const base64String = await fileToBase64(resumeFile!);

        await axios.post('api/parse-resume', { file: base64String })
        .then(response => {
            extractData(response.data.data);
        }).catch(error => {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.response.data.message,
            });
            setProcessing(false);
        });

        //todo: remove this --for parseJson test
        // const str = " ```json\n{\n    \"personalInfo\": {\n        \"name\": \"Siti Muzallyefah Mohamad Fadli\",\n        \"occupation\": \"Mobile Application and Laravel Developer\",\n        \"experience\": 3,\n        \"location\": \"Malaysia\",\n        \"email\": \"muzallyefah@gmail.com\"\n    },\n    \"education\": [\n        {\n            \"college\": \"University Tun Hussein Onn Malaysia\",\n            \"location\": \"Malaysia\",\n            \"graduationDate\": \"01/2021\",\n            \"degree\": \"Bachelor Degree in Computer Science and Information Technology (Information Security)\",\n            \"gpa\": 3.87\n        }\n    ],\n    \"relatedCourseworkProjects\": [\n        {\n            \"name\": \"Airline Ticketing System Using C++\",\n            \"year\": null,\n            \"description\": \"Developed an airline ticketing system using C++.\"\n        },\n        {\n            \"name\": \"Android Chatting Application with Authenticated Encryption Algorithm\",\n            \"year\": null,\n            \"description\": \"Developed an Android chatting application with an authenticated encryption algorithm.\"\n        },\n        {\n            \"name\": \"File Encryption Storage Software\",\n            \"year\": null,\n            \"description\": \"Developed a file encryption storage software.\"\n        }\n    ],\n    \"skills\": [\n        \"Flutter\",\n        \"REST API\",\n        \"Google Map\",\n        \"Google Analytics\",\n        \"Push Notification\",\n        \"SOAP API\",\n        \"Git\",\n        \"Laravel\",\n        \"Mantine\",\n        \"Dart\",\n        \"Swift\",\n        \"Objective-C\",\n        \"Java\",\n        \"C#\",\n        \"PHP\",\n        \"HTML5\",\n        \"C\",\n        \"C++\",\n        \"ASP.Net\",\n        \"VB.Net\",\n        \"JavaScript\",\n        \"Typescript\",\n        \"Node.js\",\n        \"Encryption\",\n        \"Cryptanalysis\",\n        \"Steganography\",\n        \"Digital Watermarking\",\n        \"Digital Forensic\",\n        \"Authenticated Encryption\"\n    ],\n    \"experience\": [\n        {\n            \"company\": \"Deux Alpha Tech Sdn Bhd\",\n            \"location\": \"Malaysia\",\n            \"datesWorked\": \"06/2023 - present\",\n            \"title\": \"Mobile Application and Laravel Developer\",\n            \"accomplishments\": [\n                \"Develop mobile application using Flutter framework\",\n                \"Develop Web system with Laravel, vue.js, bootstrap and tailwind\",\n                \"Involved in the development of Pet Insurance website in collaboration with Etiqa\",\n                \"Use Bitbucket as code versioning tools\"\n            ]\n        },\n        {\n            \"company\": \"Exitando Sdn Bhd\",\n            \"location\": \"Malaysia\",\n            \"datesWorked\": \"07/2022 - 05/2023\",\n            \"title\": \"Senior Application Developer (Mobile App - Flutter)\",\n            \"accomplishments\": [\n                \"Led team members in the development of mobile applications\",\n                \"Translate basic design into full application frameworks and delegating project components to team members\"\n            ]\n        },\n        {\n            \"company\": \"TimeTec Cloud Sdn Bhd\",\n            \"location\": \"Malaysia\",\n            \"datesWorked\": \"02/2021 - 10/2021\",\n            \"title\": \"Mobile Application Developer\",\n            \"accomplishments\": [\n                \"Developed new modules for existing iOS Applications\",\n                \"Integrating iOS Application with Webservice\",\n                \"Fixed bugs and performance issue on iOS Applications\",\n                \"Used GitLab as code versioning tool\"\n            ]\n        },\n        {\n            \"company\": \"Interax\",\n            \"location\": \"Malaysia\",\n            \"datesWorked\": \"08/2022 - present\",\n            \"title\": \"Software Engineer\",\n            \"accomplishments\": [\n                \"Work remotely as full stack developer\",\n                \"Developed myEasyProg (https://myeasyprog.my) online learning system\",\n                \"Developed Sight Reader application to assist visually impaired person\",\n                \"Working on AI based eLearning platform\"\n            ]\n        }\n    ],\n    \"certifications\": [\n        {\n            \"name\": \"Cisco CCNA Routing and Switching\",\n            \"expiry\": \"N/A\"\n        },\n        {\n            \"name\": \"Cisco CCNAv7\",\n            \"expiry\": \"N/A\"\n        },\n        {\n            \"name\": \"Cisco Introduction to IoT\",\n            \"expiry\": \"N/A\"\n        },\n        {\n            \"name\": \"Cisco Introduction to Packet Tracker\",\n            \"expiry\": \"N/A\"\n        },\n        {\n            \"name\": \"NDG Linux Essentials\",\n            \"expiry\": \"N/A\"\n        },\n        {\n            \"name\": \"JavaScript Algorithms and Data Structures\",\n            \"expiry\": \"N/A\"\n        }\n    ]\n}\n```";
        // tryParseJson(str);
    };

    const extractData = async (content: string) => {
        const body = getAiBody(generateExtractPdfPrompt(content));

        axios.post('https://api.cohere.ai/v1/generate', body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_COHERE_API_KEY}`
            },
        })
        .then(response => {
            if (response.data.generations.length === 0) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: 'Unable to extract resume data.',
                });
            } else {
                tryParseJson(response.data.generations[0].text);
            }
        }).catch(error => {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.response.data.message,
            });
        }).finally(() => {
            setProcessing(false);
        });   
    }

    const tryParseJson = (str: string) => {
        try {
            let txt = str.replaceAll('```json', '');
            txt = txt.replaceAll('```', '');
            const json: Resume = JSON.parse(txt);
            onResumeInfoExtracted(json);
            setSuccess(true);
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: 'Unable to extract resume data.',
            });
        }
    }
    
    return (
        <SectionContainer title={"Unlock Your Potential"} description={ "Upload Your Resume for a Personalized Career Checkup" } isOpen = { true }>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-8">
                    <div className="rounded-md border px-4 py-3 text-sm text-center">
                        { resumeFile ? `Resume: ${resumeFile.name}` : 'You have not upload any file' }
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                    { isProcessing ? (
                        <Button disabled variant={ 'secondary' } className="w-full p-5">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing
                        </Button>
                    ) : (
                        <div className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 rounded cursor-pointer p-3 text-center">
                            <Label htmlFor="resume" className="flex justify-center items-center cursor-pointer w-full">
                                <UploadIcon className="mr-2 h-4 w-4" /> Upload Resume
                            </Label>
                            <Input id="resume" type="file" accept=".pdf" style={{ display: 'none' }} onChange={ onFileSelected } />
                        </div>
                    )} 
                </div>
            </div>
            <ProcessResume hasResume={ resumeFile !== null } isProcessing = { isProcessing } isSuccess = { success } onProcess = { onProcess } />
        </SectionContainer>
    )
}