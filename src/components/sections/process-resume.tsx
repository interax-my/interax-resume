import { Separator } from "@/components/ui/seperator";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProcessResumeProps {
    hasResume: boolean, 
    isProcessing: boolean,
    onProcess: () => void;
}

export function ProcessResume({hasResume, isProcessing, onProcess}: ProcessResumeProps ) {
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
                    ) : 'Process Resume' }
                    </Button>
            </div>
        </div>
    )
}