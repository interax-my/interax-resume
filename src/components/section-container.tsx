import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

export default function SectionContainer({ title, children }: { title: String, children: React.ReactNode }) {
  return (
    <Card className="w-full px-8">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-0">
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}