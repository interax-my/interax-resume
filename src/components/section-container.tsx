import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RefObject } from "react"

interface SectionContainerProp {
  title: string,
  description?: string | null,
  isAutoOpen?: boolean,
  children: React.ReactNode,
  accordionRef?: RefObject<HTMLButtonElement> | null,
  onChange?: () => void
}

export default function SectionContainer( { title, description = null, isAutoOpen = false, children, accordionRef = null, onChange = undefined }: SectionContainerProp ) {
  return (
    <Card className="w-full">
        <Accordion type="single" collapsible defaultValue={ isAutoOpen ? 'item-1' : '' }>
        <AccordionItem value="item-1" className="border-0">
          <CardHeader>
            <AccordionTrigger className="text-start" ref={ accordionRef }  onClick={ onChange }>
              <div>
                <CardTitle>{ title }</CardTitle>
                { description && (
                  <CardDescription>{ description }</CardDescription>
                ) } 
              </div>
            </AccordionTrigger>
          </CardHeader>  
          <AccordionContent>
            <CardContent className="grid gap-4 lg:px-20">
              {children}
            </CardContent>
          </AccordionContent>
        </AccordionItem> 
      </Accordion>
    </Card>
  )
}