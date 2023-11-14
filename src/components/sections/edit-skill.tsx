'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Resume } from "@/lib/models/resume"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { EditIcon } from "lucide-react"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/seperator"

export function EditSkill({ resume, setResume }: { resume: Resume, setResume: (info: Resume) => void }) {
    const [open, setOpen] = useState(false);
    const [skill, setSkill] = useState<string[]>(resume.skills ?? []);

    const onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const editedResume: Resume = {
            ...resume,
            skills: skill,
        };

        setResume(editedResume);    
        setOpen(false);
    };


    const add = () => {
        const item = [
            ...skill,
            ''
        ];
        setSkill(item);
     };
     
    const remove = (index: number) => {
        const item = skill.filter((_, i) => i !== index);
        setSkill(item);
    };
     
    return (
    <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild>
            <Button variant='link'>
                <EditIcon className="mr-2 h-4 w-4" />
                Edit
            </Button>
        </DialogTrigger>
        <DialogContent className="h-4/5">
            <DialogHeader>
                <DialogTitle>Edit Info</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-full px-3">
                <div className="grid gap-5 py-4">
                <div className="grid grid-cols-5 gap-4 items-center">
                    <h4 className="text-sm font-medium text-primary col-span-4">Skills</h4>
                    <div className="col-span-1 flex justify-end">
                        <Button variant="outline" size="icon" onClick={ add }>
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                { skill.map((e, index) => (
                    <div key={ `edit-${index}` } className="grid grid-cols-5 gap-4 items-center mb-2">
                        <Input
                        value={ e ?? '' }
                        onChange={(e) => {
                            const edited = [...skill];
                            edited[index] = e.target.value;
                            setSkill(edited);
                        }}
                        className="col-span-4"
                        />
                        <div className="col-span-1 flex justify-end">
                            <Button variant="outline" size="icon" onClick={() => remove(index)}>
                                <MinusIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ) )}
            </div>
            </ScrollArea>
            <DialogFooter>
                <Button type="submit" onClick={ onSubmit }>Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}