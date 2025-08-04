import { HeroSection } from '@/components/hero-section'
import { FellowshipSearch } from '@/components/fellowship-search'
import { RegisterFellowship } from '@/components/register-fellowship'
import { HighlightsSection } from '@/components/highlights-section'
import { FeaturesSection } from '@/components/features-section'
import { DownloadSection } from '@/components/download-section'
import { VideoSection } from '@/components/video-section'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FellowshipSearch />
      <RegisterFellowship />
      <HighlightsSection />
      <FeaturesSection />
      <VideoSection />
      <DownloadSection />
    </div>
  )
}
