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
import { EditIcon } from "lucide-react"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function EditPersonalInfo({ resume, setResume }: { resume: Resume, setResume: (info: Resume) => void }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(resume.personalInfo?.name ?? '');
    const [occupation, setOccupation] = useState(resume.personalInfo?.occupation ?? '');
    const [experience, setExperience] = useState(resume.personalInfo?.experience ?? '');
    const [email, setEmail] = useState(resume.personalInfo?.email ?? '');
    const [location, setLocation] = useState(resume.personalInfo?.location ?? '');

    const onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const editedResume: Resume = {
            ...resume,
            personalInfo: {
                name: name,
                occupation: occupation,
                experience: experience !== '' ? Number(experience) : null,
                location: location,
                email: email,
            }
        };

        setResume(editedResume);    
        setOpen(false);
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
                <div className="grid gap-4 py-4">
                    <h4 className="text-sm font-medium text-primary">Personal Info</h4>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                        Name
                        </Label>
                        <Input
                        id="name"
                        value={ name }
                        onChange={(e) => setName(e.target.value)}
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="occupation" className="text-left">
                        Occupation
                        </Label>
                        <Input
                        id="occupation"
                        value={ occupation }
                        onChange={(e) => setOccupation(e.target.value)}
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="experience" className="text-left">
                        Experience
                        </Label>
                        <Input
                        id="experience"
                        value={ experience }
                        onChange={(e) => setExperience(e.target.value)}
                        type="number"
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-left">
                        Email
                        </Label>
                        <Input
                        id="email"
                        value={ email }
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-left">
                        Location
                        </Label>
                        <Input
                        id="location"
                        value={ location }
                        onChange={(e) => setLocation(e.target.value)}
                        className="col-span-3"
                        />
                    </div>
                </div>
            </ScrollArea>
            <DialogFooter>
                <Button type="submit" onClick={ onSubmit }>Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}