export default function SampleLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-4 m-12 border-blue-500 border-2">
      {children}
    </main>
  )
}