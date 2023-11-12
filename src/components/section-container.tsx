import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SectionContainerProp {
  title: string,
  description?: string | null,
  isOpen?: boolean,
  children: React.ReactNode,
}

export default function SectionContainer( { title, description = null, isOpen = false, children }: SectionContainerProp ) {
  return (
    <Card className="w-full">
        <Accordion type="single" collapsible  defaultValue="item-1">
        <AccordionItem value="item-1" className="border-0">
          <CardHeader>
            <AccordionTrigger className="text-start">
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