import { Separator } from "@/components/ui/seperator";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ProcessResumeProps {
    hasResume: boolean, 
    isProcessing: boolean,
    isSuccess: boolean,
    onProcess: () => void;
}

export function ProcessResume({hasResume, isProcessing, isSuccess, onProcess}: ProcessResumeProps ) {
    return (
        <div className="grid gap-2">
            <Separator className="mt-4 mb-6" />
            <div className="flex justify-end">
                <Button disabled={ isProcessing || !hasResume } className="w-full sm:w-auto" onClick={ onProcess }>
                    { isProcessing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : 'Extract Resume' }
                    </Button>
            </div>
            { isSuccess && (
                <Label className="flex items-center font-semibold text-primary">
                    <CheckCircle className="mr-2" />
                    <span>Resume has been extracted successfully.</span>
                </Label>
            ) }
        </div>
    )
}