import { Separator } from "@/components/ui/seperator";
import { Button } from "@/components/ui/button";

export function ProcessResume() {
    return (
        <div className="grid gap-2">
            <Separator className="mt-4 mb-6" />
            <div className="flex justify-end">
                <Button className="w-full sm:w-auto">Process Resume</Button>
            </div>
        </div>
    )
}