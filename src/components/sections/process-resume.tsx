import { Separator } from "@/components/ui/seperator";
import { Button } from "@/components/ui/button";

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
                <Button disabled={ isProcessing || !hasResume } className="w-full sm:w-auto" onClick={ onProcess }>{ isProcessing ? 'Please wait' : 'Process Resume' }</Button>
            </div>
        </div>
    )
}