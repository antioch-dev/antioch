import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">{children}</main>
      <Footer />
    </>
  )
}
