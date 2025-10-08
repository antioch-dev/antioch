import { Footer } from "@/components/footer"
import { FellowshipNavigation } from "@/components/fellowship-navigation"

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ fellowship_id: string }>
}

export default async function Layout({ children, params }: LayoutProps) {
  const { fellowship_id } = await params

  return (
    <>
      <FellowshipNavigation fellowshipId={fellowship_id} fellowshipName="Fellowship Platform" />
      <main className="min-h-screen bg-background">{children}</main>
      <Footer />
    </>
  )
}
