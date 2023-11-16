'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export function PDFViewer({ url }: { url: string }) {
    return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant='secondary'>
                View Uploaded Resume
            </Button>
        </DialogTrigger>
        <DialogContent className="h-4/5 max-w-full">
        <object data={url} type="application/pdf" width="100%" height="100%">
            <p>It appears you don't have a PDF plugin for this browser. No biggie... you can <a href={url}>click here to download the PDF file.</a></p>
        </object>
        </DialogContent>
    </Dialog>
    )
}