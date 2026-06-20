'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'


export function Navbar() {
  const { isSignedIn } = useUser()

  return (
    <nav className="flex justify-between items-center p-4 bg-[#F5F5F7]">
      <Link href="/" className="text-xl font-bold text-[#007AFF]">DPP Pro</Link>
      <div className="flex gap-4 items-center">
        {isSignedIn ? (
          <>
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton signOutUrl="/" />
          </>
        ) : (
          <>
            <Link href="/sign-in">
              <Button variant="outline">Se connecter</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-[#007AFF] text-white">S’inscrire</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}