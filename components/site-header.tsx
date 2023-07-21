import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

import { siteConfig } from '@/config/site'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { MainNav } from '@/components/main-nav'
import MobileSidebar from '@/components/mobile-sidebar'
import { ThemeToggle } from '@/components/theme-toggle'

async function SiteHeader() {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription()
  return (
    <header className="sticky top-0 z-40 mb-12 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: 'icon',
                  variant: 'ghost',
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
            <UserButton afterSignOutUrl="/" />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
