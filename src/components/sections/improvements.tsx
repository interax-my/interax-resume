import SectionContainer from "@/components/section-container"
import { Suggestion } from "@/lib/models/suggestions";
import { RefObject } from "react";

export default function Improvements({
  suggestions,
  accordionRef,
  onChange
}: {
  suggestions: Suggestion,
  accordionRef: RefObject<HTMLButtonElement>,
  onChange?: () => void
}) {
  return (
    <SectionContainer title={"Suggested Improvements"} accordionRef={accordionRef} onChange={onChange}>
      {suggestions && Object.keys(suggestions).map((category, index) => (
        <div key={index}>
          <h3 className="font-semibold my-2 capitalize">{category}</h3>
          <ul className="list-disc list-outside pl-4">
            {!suggestions[category].answer ?
              <li className="text-orange-500">{suggestions[category].suggestion}</li>
              :
              <li className="text-green-500">Nothing to improve.</li>
            }
          </ul>
        </div>
      ))}
    </SectionContainer>
  )
}