'use client'
/* eslint-disable @next/next/no-img-element */
import styles from './page.module.css'
import Dashboard from './components/dashboard/dashboard'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import NameSetup from './components/name-setup/name-setup';

export default function Home() {
  const [showNameSetup, setShowNameSetup] = useState(false)

  const router = useRouter()
  const { isSignedIn, user } = useUser();

  // Check if signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in")
    }
  })

  // Prompt name setup if no name detected
  useEffect(() => {
      if (user == null) return
      const name = null // replace with api call for user
      if (name == null) {
        setShowNameSetup(true)
      }
  }, [user])

  return (
    <main>
      <Dashboard />
      {showNameSetup && <NameSetup number={user?.primaryPhoneNumber.phoneNumber} />}
    </main>
  )
}
