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

export function EditInfo({ resume, setResume }: { resume: Resume, setResume: (info: Resume) => void }) {
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
                experience: Number(experience),
                location: location,
                email: email,
            }
        };

        setResume(editedResume);    
        setOpen(false);
    };

    //todo: fill in all info
    return (
    <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild>
            <Button variant='secondary' className="w-full sm:w-auto">
                <EditIcon className="mr-2 h-4 w-4" />
                Edit
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit Info</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <h4 className="text-sm font-medium text-primary">Personal Info</h4>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
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
                    <Label htmlFor="occupation" className="text-right">
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
                    <Label htmlFor="experience" className="text-right">
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
                    <Label htmlFor="email" className="text-right">
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
                    <Label htmlFor="location" className="text-right">
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
            <DialogFooter>
                <Button type="submit" onClick={ onSubmit }>Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}