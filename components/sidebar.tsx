'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { sideBarRoutes } from '@/lib/constants'
import { montserrat } from '@/lib/fonts'
import { cn } from '@/lib/utils'

function SideBar() {
  const pathname = usePathname()
  return (
    <div className="flex h-full flex-col space-y-4 bg-[#111827] py-4 text-white">
      <div className="flex-1 px-3 py-2">
        <Link href="/dashboard" className="mb-14 flex items-center pl-3">
          <div className="relative mr-4 h-8 w-8">
            <Image fill src="/assets/logo.png" alt="logo" />
          </div>
          <h1 className={cn('text-2xl font-bold', montserrat.className)}>
            Sadge AI
          </h1>
        </Link>
        <div className="space-y-1">
          {sideBarRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-white/10 hover:text-white',
                pathname === route.href
                  ? 'bg-white/10 text-white'
                  : 'text-zinc-400'
              )}
            >
              <div className="flex flex-1 items-center">
                <route.icon className={cn('mr-3 h-5 w-5', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar
