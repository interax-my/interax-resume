import SectionContainer from "@/components/section-container"

export default function Improvements({
  suggestions
}: {
  suggestions: {
    improvements: string[],
    corrections: { error: string, suggestion: string }[]
  } | null
}) {
  const improvements = suggestions && suggestions.improvements;
  const corrections = suggestions && suggestions.corrections;

  const renderImprovements = () => {
    if (improvements && Array.isArray(improvements)) {
      const mappedImprovements = improvements.map((improvement, index) => {
        return <li key={index}>{improvement}</li>;
      });

      return mappedImprovements;
    } else {
      return <p>Nothing to see here.</p>
    }
  }
  const renderCorrections = () => {
    if (corrections && Array.isArray(corrections)) {
      const mappedCorrections = corrections.map((correction, index) => {
        return (
          <li key={index}>
            <span className="text-red-500 font-semibold">Error:</span> {correction.error} <br></br>
            <span className="text-green-500 font-semibold">Correction:</span> {correction.suggestion}
          </li>)
      });

      return mappedCorrections;
    } else {
      return <p>Nothing to see here.</p>
    }
  }

  return (
    <SectionContainer title={"Suggested Improvements"}>
      <h4 className="font-semibold my-2">Suggestions</h4>
      <ul className="list-disc list-outside pl-4 mb-8">
        {renderImprovements()}
      </ul>

      <h4 className="font-semibold my-2">Corrections</h4>
      <ul className="list-disc list-outside pl-4">
        {renderCorrections()}
      </ul>
    </SectionContainer>
  )
}