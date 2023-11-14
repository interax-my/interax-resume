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

export function EditProject({ resume, setResume }: { resume: Resume, setResume: (info: Resume) => void }) {
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState<{
        name: string | null;
        year: number | null;
        description: string | null;
    }[]>(resume.relatedCourseworkProjects ?? []);

    const onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const editedResume: Resume = {
            ...resume,
            relatedCourseworkProjects: project,
        };

        setResume(editedResume);    
        setOpen(false);
    };


    const add = () => {
        const item = [
            ...project,
            {
                name: null,
                year: null,
                description: null,
            },
        ];
        setProject(item);
     };
     
    const remove = (index: number) => {
        const item = project.filter((_, i) => i !== index);
        setProject(item);
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
                    <h4 className="text-sm font-medium text-primary col-span-4">Projects</h4>
                    <div className="col-span-1 flex justify-end">
                        <Button variant="outline" size="icon" onClick={ add }>
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                { project.map((e, index) => (
                    <div key={ `edit-${index}` } className="grid gap-4">
                        <div>
                            <div className="grid grid-cols-5 gap-4 items-center mb-2">
                                <Label htmlFor="name" className="col-span-4">
                                Project Name
                                </Label>
                                <div className="col-span-1 flex justify-end">
                                    <Button variant="outline" size="icon" onClick={() => remove(index)}>
                                        <MinusIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Input
                            id="name"
                            value={ e.name ?? '' }
                            onChange={(e) => {
                                const edited = [...project];
                                edited[index].name = e.target.value;
                                setProject(edited);
                            }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="year" className="text-right">
                            Year
                            </Label>
                            <Input
                            id="year"
                            value={ e.year ?? '' }
                            type="number"
                            onChange={(e) => {
                                const edited = [...project];
                                edited[index].year = e.target.value ? Number(e.target.value) : null;
                                setProject(edited);
                            }}
                            className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                            Description
                            </Label>
                            <Input
                            id="description"
                            value={ e.description ?? '' }
                            onChange={(e) => {
                                const edited = [...project];
                                edited[index].description = e.target.value;
                                setProject(edited);
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