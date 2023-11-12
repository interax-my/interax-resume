import SectionContainer from "@/components/section-container"

export default function Improvements() {
  return (
    <SectionContainer title={"Suggested Improvements"}>
      <h4 className="font-semibold my-2">Suggestions</h4>
      <ul className="list-disc list-inside mb-8">
        <li>Do not <span className="uppercase text-red-500 font-bold">lie</span> in your resume.</li>
        <li>Do not <span className="uppercase text-red-500 font-bold">lie</span> in your resume.</li>
        <li>Do not <span className="uppercase text-red-500 font-bold">lie</span> in your resume.</li>
      </ul>

      <h4 className="font-semibold my-2">Corrections</h4>
      <ul className="list-disc list-inside">
        <li>You mistyped <span className="text-green-500">internship</span> for <span className="text-orange-500">interzsip</span>.</li>
      </ul>
    </SectionContainer>
  )
}