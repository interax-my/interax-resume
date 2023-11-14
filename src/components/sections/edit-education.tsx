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

export function EditEducation({ resume, setResume }: { resume: Resume, setResume: (info: Resume) => void }) {
    const [open, setOpen] = useState(false);
    const [education, setEducation] = useState<{
        college: string | null;
        location: string | null;
        graduationDate: string | null;
        degree: string | null;
        gpa: number | null;
    }[]>(resume.education ?? []);

    const onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const editedResume: Resume = {
            ...resume,
            education: education,
        };

        setResume(editedResume);    
        setOpen(false);
    };


    const add = () => {
        const item = [
            ...education,
            {
                college: null,
                location: null,
                graduationDate: null,
                degree: null,
                gpa: null,
            },
        ];
        setEducation(item);
     };
     
    const remove = (index: number) => {
        const item = education.filter((_, i) => i !== index);
        setEducation(item);
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
                    <h4 className="text-sm font-medium text-primary col-span-4">Education</h4>
                    <div className="col-span-1 flex justify-end">
                        <Button variant="outline" size="icon" onClick={ add }>
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                { education.map((e, index) => (
                    <div key={ `edit-${index}` } className="grid gap-4">
                        <div>
                            <div className="grid grid-cols-5 gap-4 items-center mb-2">
                                <Label htmlFor="name" className="col-span-4">
                                Course/Major
                                </Label>
                                <div className="col-span-1 flex justify-end">
                                    <Button variant="outline" size="icon" onClick={() => remove(index)}>
                                        <MinusIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Input
                            id="name"
                            value={ e.degree ?? '' }
                            onChange={(e) => {
                                const edited = [...education];
                                edited[index].degree = e.target.value;
                                setEducation(edited);
                            }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="college" className="text-left">
                            College
                            </Label>
                            <Input
                            id="college"
                            value={ e.college ?? '' }
                            onChange={(e) => {
                                const edited = [...education];
                                edited[index].college = e.target.value;
                                setEducation(edited);
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
                                const edited = [...education];
                                edited[index].location = e.target.value;
                                setEducation(edited);
                            }}
                            className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-left">
                            Grad Date
                            </Label>
                            <Input
                            id="date"
                            value={ e.graduationDate ?? '' }
                            onChange={(e) => {
                                const edited = [...education];
                                edited[index].graduationDate = e.target.value;
                                setEducation(edited);
                            }}
                            className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pointer" className="text-left">
                            CGPA
                            </Label>
                            <Input
                            id="pointer"
                            value={ e.gpa ?? '' }
                            type="number"
                            onChange={(e) => {
                                const edited = [...education];
                                edited[index].gpa = e.target.value && e.target.value !== '' ? Number(e.target.value) : null;
                                setEducation(edited);
                            }}
                            className="col-span-3"
                            />
                        </div>
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