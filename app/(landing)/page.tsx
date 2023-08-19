import { LandingContent } from '@/components/landing-content'
import { LandingHero } from '@/components/landing-hero'
import { LandingNavbar } from '@/components/landing-navbar'

const LandingPage = () => {
  return (
    <>
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </>
  )
}

export default LandingPage
