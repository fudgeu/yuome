'use client'
/* eslint-disable @next/next/no-img-element */
import { useCallback, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import styles from './request.module.css'
import { useRouter } from 'next/navigation'

export default function Request(props) {

  const [toNumber, setToNumber] = useState()
  const [amt, setAmt] = useState()
  const [note, setNote] = useState()

  const [showLoading, setShowLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const router = useRouter()

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();

  const submitRequest = useCallback(async () => {
    setShowLoading(true)
    const resp = await fetch(
      "/api/create-transaction",
      {
        method: "POST",
        body: JSON.stringify({
          type: 'req',
          amount: amt,
          'pn_to': toNumber,
          'pn_from': user.primaryPhoneNumber.phoneNumber,
          notes: note
        }),
        headers: {
          "content-type": "application/json",
        },
      })

      if (!resp.ok) {
        setShowError(true)
        //setTimeout(() => router.push("/"), 2000)
        props.close()
      } else {
        setShowSuccess(true)
        //setTimeout(() => router.push("/"), 2000)
        props.close()
      }
  }, [amt, note, props, toNumber, user.primaryPhoneNumber.phoneNumber])

  const displayLoadingScreen = useCallback(() => {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingContainer}>
          {(!showError && !showSuccess) && <h1>Submitting request...</h1>}
          {showError && <h1>Error</h1>}
          {showSuccess && <h1>Success!</h1>}
        </div>
      </div>
    )
  }, [showError, showSuccess])

  //console.log(`${isLoaded}; ${userId}; ${sessionId}; ${user?.primaryPhoneNumber}`)
  return (
    <div className={styles.screen}>
      <div className={styles.container}>

        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => props.close()}>
            <img src="back.svg" alt="Go back" />
          </button>
          <h1>Request</h1>
        </div>

        <form 
          className={styles.form}
          name="Request payment form"
          onSubmit={(e) => {
            e.preventDefault()
            submitRequest()
          }}
        >
          <h2>Recipient&apos;s phone number:</h2>
          <input 
            className={styles.input}
            type="tel"
            pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
            maxlength="12"
            placeholder="123 456 7890"
            value={toNumber}
            onChange={(e) => setToNumber(e.target.value)}
          />
          <h2>Amount</h2>
          <input
            className={styles.moneyInput}
            type="number"
            placeholder="5.00"
            value={amt}
            min="1"
            max="999"
            onChange={(e) => setAmt(e.target.value)}
          />
          <h2>Note</h2>
          <input
            className={styles.input}
            placeholder="Dinner 🍔"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button className={styles.requestButton} type="submit" >
            Send request
          </button>
        </form>

        {showLoading && displayLoadingScreen()}
      </div>
    </div>
  )
}