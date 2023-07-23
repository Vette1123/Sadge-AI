'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { MoveLeft } from 'lucide-react'

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <div className="relative h-full bg-[#111827]">
      <div
        className="absolute top-0 m-6 flex cursor-pointer gap-4 text-gray-200"
        onClick={() => router.push('/')}
      >
        <MoveLeft /> Back
      </div>
      <div className="flex h-full items-center justify-center">{children}</div>
    </div>
  )
}

export default Layout
