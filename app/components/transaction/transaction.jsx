'use client'
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from 'react'
import styles from './transaction.module.css'

export default function Transaction(prop) {

  const [notifMessage, setNotifMessage] = useState('')
  const [notifTimeoutId, setNotifTimeoutId] = useState(null)

  const getBulletPoint = useCallback(() => {
    if (prop.type === 'requestTo' || prop.type === 'paymentFrom') {
      return <div className={styles.green} />
    } else if (prop.type === 'requestFrom' || prop.type === 'paymentTo') {
      return <div className={styles.red} />
    }
  }, [prop.type])

  const getText = useCallback(() => {
    let returnText
    if (prop.type === 'requestTo') {
      returnText = `You requested $${prop.amount} from ${prop.screenName}`
    } else if (prop.type === 'requestFrom') {
      returnText = `${prop.screenName} requested $${prop.amount} from you`
    } else if (prop.type === 'paymentTo') {
      returnText = `You paid ${prop.screenName} $${prop.amount}`
    } else if (prop.type === 'paymentFrom') {
      returnText = `${prop.screenName} paid you $${prop.amount}`
    }
    if (prop.note != null && prop.note !== "") {
      returnText = `${returnText}: ${prop.note}`
    }
    return <p>{returnText}</p>
  }, [prop.amount, prop.note, prop.type, prop.screenName])

  const showNotif = useCallback((message) => {
    setNotifMessage(message)
    if (notifTimeoutId != null) {
      clearTimeout(notifTimeoutId)
    }
    setNotifTimeoutId(
      setTimeout(() => {
        setNotifMessage("")
        setNotifTimeoutId(null)
      },
      4000)
    )
  }, [notifTimeoutId])

  const markPaid = useCallback((reversed) => {
    if (self == null) return;
    showNotif("Marking as paid back...")
    fetch(
      "/api/create-transaction",
      {
        method: "POST",
        body: JSON.stringify({
          type: 'pay',
          amount: prop.amount,
          'pn_to': reversed ? prop.self : prop.user,
          'pn_from': reversed ? prop.user : prop.self,
          notes: prop.note
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then((resp) => {
        if (resp.ok) {
          showNotif("Succesfully marked as paid back!")
        } else {
          showNotif("An error occured - please try again later")
        }
      })
  }, [prop.amount, prop.note, prop.self, prop.user, showNotif])

  const markCanceled = useCallback(() => {
    if (self == null) return;
    showNotif("Marking as paid back...")
    fetch(
      "/api/create-transaction",
      {
        method: "POST",
        body: JSON.stringify({
          type: 'pay',
          amount: prop.amount,
          'pn_to': reversed ? prop.self : prop.user,
          'pn_from': reversed ? prop.user : prop.self,
          notes: prop.note
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then((resp) => {
        if (resp.ok) {
          showNotif("Succesfully marked as paid back!")
        } else {
          showNotif("An error occured - please try again later")
        }
      })
  }, [])

  const getButtons = useCallback(() => {
    if (prop.type.startsWith("request")) {
      return (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => markPaid(prop.type === "requestTo")}>
            <img src="money.svg" alt="" /> Pay back
          </button>
          <button className={styles.button}>
            <img src="cancel.svg" alt="" /> Cancel
          </button>
        </div>
      )
    } else if (prop.type.startsWith("payment")) {
      return (
        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <img src="undo.svg" alt="" /> Undo
          </div>
        </div>
      )
    }
  }, [markPaid, prop.type])

  const getNotif = useCallback(() => {
    if (notifMessage === '') return []
    return (
      <div className={styles.notifContainer}>
        <p>{notifMessage}</p>
      </div>
    )
  }, [notifMessage])

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        {getBulletPoint()}
        {getText()}
      </div>
      {getButtons()}
      {getNotif()}
    </div>
  )
}