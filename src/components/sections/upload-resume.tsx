'use client'

import { Button } from "@/components/ui/button";
import { UploadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ProcessResume } from "./process-resume";
import SectionContainer from "@/components/section-container";

interface UploadResumeProps {
    resume: File | null, 
    onSelect: (file: File) => void;
}

export function UploadResume({ resume, onSelect }: UploadResumeProps) {
    const [isProcessing, setProcessing] = useState(false);

    const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            onSelect(event.target.files[0]);
        }    
    };

    const onProcess = () => {
        setProcessing(true);
    };
    
    return (
        <SectionContainer title={"Unlock Your Potential"} description={ "Upload Your Resume for a Personalized Career Checkup" }>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-8">
                    <div className="rounded-md border px-4 py-3 text-sm text-center">
                        { resume ? `Resume: ${resume.name}` : 'You have not upload any file' }
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                    { isProcessing ? (
                        <Button disabled variant={ 'secondary' } className="w-full p-5">
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
            <ProcessResume hasResume={ resume !== null } isProcessing = { isProcessing } onProcess = { onProcess } />
        </SectionContainer>
    )
}