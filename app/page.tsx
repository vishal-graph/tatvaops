import { HeroSection } from "@/components/hero-section"
import { NavigationHeader } from "@/components/navigation-header"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <NavigationHeader />
      <HeroSection />
    </main>
  )
}
