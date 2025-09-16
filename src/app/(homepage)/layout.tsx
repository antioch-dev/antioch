import { HomeHeader } from "@/components/homeHeader"
import { Footer } from "@/components/footer"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeHeader />
      {children}
      <Footer />
    </>
  )
}
