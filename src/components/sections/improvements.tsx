import SectionContainer from "@/components/section-container"
import { Suggestions } from "@/lib/models/suggestions";
import { RefObject } from "react";

export default function Improvements({
  suggestions,
  accordionRef,
  onChange
}: {
  suggestions: Suggestions,
  accordionRef: RefObject<HTMLButtonElement>,
  onChange?: () => void
}) {
  return (
    <SectionContainer title={"Suggested Improvements"} accordionRef={accordionRef} onChange={onChange}>
      {suggestions && Object.keys(suggestions).map((category, index) => (
        <div key={index}>
          <h3 className="font-semibold my-2 capitalize">{category}</h3>
          <ul className="list-disc list-outside pl-4">
            {suggestions[category].map((item: any, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </SectionContainer>
  )
}