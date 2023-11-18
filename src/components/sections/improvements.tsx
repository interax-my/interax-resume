import SectionContainer from "@/components/section-container"
import { Suggestion, suggestionTitle } from "@/lib/models/suggestions";
import { RefObject } from "react";

export default function Improvements({
  suggestions,
  accordionRef,
  onChange
}: {
  suggestions: Suggestion | null,
  accordionRef: RefObject<HTMLButtonElement>,
  onChange?: () => void
}) {
  return (
    <SectionContainer title={"Suggested Improvements"} accordionRef={accordionRef} onChange={onChange}>
    { suggestions == null ? (
      <h3 className="font-semibold my-2">N/A</h3>
    ) : (
      <div>
        {Object.keys(suggestions).map((key) => {
          const keyAsString = key as keyof Suggestion;
          if (suggestions[keyAsString].length !== 0) {
            return (
              <div key={keyAsString}>
               <h3 className="font-semibold mb-2 mt-4 text-primary">{suggestionTitle(keyAsString)}</h3>
               <ul className="list-disc list-outside pl-4">
                {suggestions[keyAsString].map((e, index) => (
                  <li key={`${keyAsString}-${index}`} className="mb-2">{e}</li>
                ))}
               </ul>
              </div>
            );
          } else {
            return (
              <div key={keyAsString}>
               <h3 className="font-semibold mb-2 mt-4 text-primary">{suggestionTitle(keyAsString)}</h3>
               <ul className="list-disc list-outside pl-4">
                <li className="text-green-500">Nothing to improve.</li>
               </ul>
              </div>
            );
          }
        })}
      </div>
    )
    }
    </SectionContainer>
  )
}