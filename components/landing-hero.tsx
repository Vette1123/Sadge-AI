'use client'

import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import Marquee from 'react-fast-marquee'
import TypewriterComponent from 'typewriter-effect'

import { Button } from '@/components/ui/button'

export const LandingHero = () => {
  const { isSignedIn } = useAuth()

  return (
    <div className="min-h-[calc(100vh-6rem)] space-y-12 py-36 text-center font-bold text-white">
      <div className="space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
        <h1>The Best AI Tool for</h1>
        <div className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          <TypewriterComponent
            options={{
              strings: [
                'Chatbot.',
                'Photo Generation.',
                'Blog Writing.',
                'Mail Writing.',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm font-light text-zinc-400 md:text-xl">
        Create content using AI 10x faster.
      </div>
      <div>
        <Link href={isSignedIn ? '/dashboard' : '/register'}>
          <Button
            variant="premium"
            className="rounded-full p-4 font-semibold md:p-6 md:text-lg"
          >
            Start Generating For Free
          </Button>
        </Link>
      </div>
      <div className="text-xs font-normal text-zinc-400 md:text-sm">
        No credit card required.
      </div>
      <Marquee speed={70} className="tracking-widest">
        Next Generation AI Powered by OpenAI - Generate Images, Text, Code,
        Video, Audio, and more.
      </Marquee>
    </div>
  )
}
