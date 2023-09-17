'use client'
/* eslint-disable @next/next/no-img-element */
import styles from './page.module.css'
import Dashboard from './components/dashboard/dashboard'
import { useRouter } from 'next/navigation';
import { useClerk, useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import NameSetup from './components/name-setup/name-setup';

export default function Home() {
  const [showNameSetup, setShowNameSetup] = useState(false)

  const router = useRouter()
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk()


  console.log(`signed in: ${isSignedIn} loaded: ${isLoaded}`)

  // Check if signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in")
    }
  }, [isLoaded, isSignedIn, router])

  // Prompt name setup if no name detected
  useEffect(() => {
      if (!isLoaded || !isSignedIn || user == null) return
      
      fetch(
        "/api/get-user-name",
        {
          method: "POST",
          body: JSON.stringify({
            phone_number: user?.primaryPhoneNumber.phoneNumber
          }),
          headers: {
            "content-type": "application/json",
          },
        }).then((resp) => {
          return resp.json()
        }).then((json) => {
          console.log(`test ${json[0]?.name}`)
          if (json[0]?.name == null) {
            setShowNameSetup(true)
          }
        }
      )
  }, [isLoaded, isSignedIn, user])

  return (
    <main>
      <Dashboard />
      <div className={styles.footer}>
        <p>Logged in as {user?.primaryPhoneNumber.phoneNumber}</p>
        <button className={styles.signOutButton} onClick={() => signOut()}>
          Sign out
        </button>
      </div>
      {showNameSetup && 
        <NameSetup 
          number={user?.primaryPhoneNumber.phoneNumber}
          removePrompt={() => setShowNameSetup(false)} 
        />
      }
    </main>
  )
}
