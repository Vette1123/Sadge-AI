import React from 'react'

import SideBar from '@/components/sidebar'
import { SiteHeader } from '@/components/site-header'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full">
      <div className="z-[80] hidden h-full w-72 bg-gray-800 md:fixed md:inset-y-0 md:flex md:flex-col">
        <SideBar />
      </div>
      <main className="md:pl-72">
        <SiteHeader />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
