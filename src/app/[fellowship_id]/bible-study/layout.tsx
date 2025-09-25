export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen bg-background">
      {children}
    </section>
  )
}
