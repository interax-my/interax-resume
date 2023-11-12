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
import { getAiBody } from "@/lib/prompt";

export function UploadResume() {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [isProcessing, setProcessing] = useState(false);

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
    };

    const extractData = async (content: string) => {
        const body = getAiBody(content);

        axios.post('https://api.cohere.ai/v1/generate', body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_COHERE_API_KEY}`
            },
        })
        .then(response => {
            console.log(response.data);
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
            <ProcessResume hasResume={ resumeFile !== null } isProcessing = { isProcessing } onProcess = { onProcess } />
        </SectionContainer>
    )
}