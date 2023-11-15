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

export function EditExperience({ resume, setResume }: { resume: Resume, setResume: (info: Resume) => void }) {
    const [open, setOpen] = useState(false);
    const [experience, setExperience] = useState<{
        company: string | null;
        location: string | null;
        datesWorked: string | null;
        title: string | null;
        responsibilities: string[];
    }[]>(resume.experience ?? []);

    const onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const editedResume: Resume = {
            ...resume,
            experience: experience,
        };

        setResume(editedResume);    
        setOpen(false);
    };


    const add = () => {
        const item = [
            ...experience,
            {
                company: null,
                location: null,
                datesWorked: null,
                title: null, 
                responsibilities: [],
            },
        ];
        setExperience(item);
     };
     
    const remove = (index: number) => {
        const item = experience.filter((_, i) => i !== index);
        setExperience(item);
    };

    const addResponsibilities = (index: number) => {
        const item = [ ...experience];
        item[index].responsibilities.push('')
        setExperience(item);
     };
     
    const removeResponsibilities = (index: number, j: number) => {
        const exp = [...experience];
        const item = exp[index].responsibilities.filter((_, i) => i !== j);
        exp[index].responsibilities = item;
        setExperience(exp);
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
                    <h4 className="text-sm font-medium text-primary col-span-4">Experience</h4>
                    <div className="col-span-1 flex justify-end">
                        <Button variant="outline" size="icon" onClick={ add }>
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                { experience.map((e, index) => (
                    <div key={ `edit-${index}` } className="grid gap-4">
                        <div>
                            <div className="grid grid-cols-5 gap-4 items-center mb-2">
                                <Label htmlFor="name" className="col-span-4">
                                Job Title
                                </Label>
                                <div className="col-span-1 flex justify-end">
                                    <Button variant="outline" size="icon" onClick={() => remove(index)}>
                                        <MinusIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Input
                            id="name"
                            value={ e.title ?? '' }
                            onChange={(e) => {
                                const edited = [...experience];
                                edited[index].title = e.target.value;
                                setExperience(edited);
                            }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="company" className="text-left">
                            Company
                            </Label>
                            <Input
                            id="company"
                            value={ e.company ?? '' }
                            onChange={(e) => {
                                const edited = [...experience];
                                edited[index].company = e.target.value;
                                setExperience(edited);
                            }}
                            className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-left">
                            Location
                            </Label>
                            <Input
                            id="location"
                            value={ e.location ?? '' }
                            onChange={(e) => {
                                const edited = [...experience];
                                edited[index].location = e.target.value;
                                setExperience(edited);
                            }}
                            className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-left">
                            Date
                            </Label>
                            <Input
                            id="date"
                            value={ e.datesWorked ?? '' }
                            onChange={(e) => {
                                const edited = [...experience];
                                edited[index].datesWorked = e.target.value;
                                setExperience(edited);
                            }}
                            className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-5 gap-4 items-center">
                            <Label className="col-span-4">Accomplishment</Label>
                            <div className="col-span-1 flex justify-end">
                                <Button variant="secondary" size="icon" onClick={() => addResponsibilities(index)}>
                                    <PlusIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <ul>
                        { e.responsibilities.map((a, i) => (
                            <li key={ `edit-a-${index}` } className="list-disc">
                                <div className="grid grid-cols-5 gap-4 items-center mb-2">
                                    <Input
                                    value={ a ?? '' }
                                    onChange={(e) => {
                                        const edited = [...experience];
                                        edited[index].responsibilities[i] = e.target.value;
                                        setExperience(edited);
                                    }}
                                    className="col-span-4"
                                    />
                                    <div className="col-span-1 flex justify-end">
                                        <Button variant="secondary" size="icon" onClick={() => removeResponsibilities(index, i)}>
                                            <MinusIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                        </ul>
                        <Separator className="mt-4 mb-6" />
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