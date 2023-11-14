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

export function EditCertificate({ resume, setResume }: { resume: Resume, setResume: (info: Resume) => void }) {
    const [open, setOpen] = useState(false);
    const [cert, setCert] = useState<{
        name: string | null;
        expiry: string | null;
    }[]>(resume.certifications ?? []);

    const onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const editedResume: Resume = {
            ...resume,
            certifications: cert,
        };

        setResume(editedResume);    
        setOpen(false);
    };


    const add = () => {
        const item = [
            ...cert,
            {
                name: null,
                expiry: null,
            },
        ];
        setCert(item);
     };
     
    const remove = (index: number) => {
        const item = cert.filter((_, i) => i !== index);
        setCert(item);
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
                    <h4 className="text-sm font-medium text-primary col-span-4">Certifications</h4>
                    <div className="col-span-1 flex justify-end">
                        <Button variant="outline" size="icon" onClick={ add }>
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                { cert.map((e, index) => (
                    <div key={ `edit-${index}` } className="grid gap-4">
                        <div>
                            <div className="grid grid-cols-5 gap-4 items-center mb-2">
                                <div className="col-span-4"></div>
                                <div className="col-span-1 flex justify-end">
                                    <Button variant="outline" size="icon" onClick={() => remove(index)}>
                                        <MinusIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-left">
                            Name
                            </Label>
                            <Input
                            id="name"
                            value={ e.name ?? '' }
                            onChange={(e) => {
                                const edited = [...cert];
                                edited[index].name = e.target.value;
                                setCert(edited);
                            }}
                            className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="year" className="text-left">
                            Expiry
                            </Label>
                            <Input
                            id="year"
                            value={ e.expiry ?? '' }
                            onChange={(e) => {
                                const edited = [...cert];
                                edited[index].expiry = e.target.value;
                                setCert(edited);
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