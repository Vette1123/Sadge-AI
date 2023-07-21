import React from 'react'

import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import SideBar from '@/components/sidebar'
import SiteHeader from '@/components/site-header'

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription()

  return (
    <div className="relative h-full">
      <div className="hidden h-full w-72 bg-gray-800 md:fixed md:inset-y-0 md:flex md:flex-col">
        <SideBar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>
      <main className="md:pl-72">
        <SiteHeader />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
