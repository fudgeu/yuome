'use client'
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from 'react'
import styles from './transaction.module.css'
import clsx from 'clsx'

export default function Transaction(prop) {

  const [notifMessage, setNotifMessage] = useState('')
  const [notifTimeoutId, setNotifTimeoutId] = useState(null)

  const getBulletPoint = useCallback(() => {
    return (
      <div className={
        clsx({
          [styles.green]: prop.type === 'requestTo' || prop.type === 'paymentFrom',
          [styles.red]: prop.type === 'requestFrom' || prop.type === 'paymentTo',
          [styles.bulletCancelled]: prop.cancelled
        })
     }/>
    )
  }, [prop.cancelled, prop.type])

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
      returnText = `${returnText} for '${prop.note}'`
    }
    return (
      <p className={clsx({
        [styles.cancelled]: prop.cancelled
      })}>
        {returnText}
      </p>
    )
  }, [prop.type, prop.note, prop.cancelled, prop.amount, prop.screenName])

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
          prop.update()
        } else {
          showNotif("An error occured - please try again later")
        }
      })
  }, [prop, showNotif])

  const markCancelled = useCallback((reverse) => {
    if (self == null) return;
    showNotif(`Marking as ${reverse ? "uncancelled" : "cancelled"}...`)
    fetch(
      "/api/edit-status",
      {
        method: "POST",
        body: JSON.stringify({
          id: prop.id,
          status: reverse ? true : false
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then((resp) => {
        if (resp.ok) {
          showNotif(`Succesfully marked as ${reverse ? "uncancelled" : "cancelled"}!`)
          prop.update()
        } else {
          showNotif("An error occured - please try again later")
        }
      })
  }, [prop, showNotif])

  const getButtons = useCallback(() => {
    if (prop.type === "requestFrom" && !prop.cancelled) {
      return (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => markPaid(prop.type === "requestTo")}>
            <img src="money.svg" alt="" /> Quick pay
          </button>
          <button className={styles.button} onClick={() => markCancelled(false)}>
            <img src="cancel.svg" alt="" /> Cancel
          </button>
        </div>
      )
    } else if (prop.type === "requestTo" && !prop.cancelled) {
      return (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => markCancelled(false)}>
            <img src="cancel.svg" alt="" /> Cancel
          </button>
        </div>
      )
    } else if (prop.type === "paymentFrom" && !prop.cancelled) {
      return (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => markCancelled(false)}>
            <img src="cancel.svg" alt="" /> Invalidate
          </button>
        </div>
      )
    } else if (prop.type === "paymentTo" && !prop.cancelled) {
      return (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => markCancelled(false)}>
            <img src="undo.svg" alt="" /> Undo
          </button>
        </div>
      )
    } else if (prop.type.startsWith("request") && prop.cancelled) {
      return (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => markCancelled(true)}>
            <img src="undo.svg" alt="" /> Uncancel
          </button>
        </div>
      )
    } else if (prop.type === "paymentFrom" && prop.cancelled) {
      return (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => markCancelled(true)}>
            <img src="undo.svg" alt="" /> Revalidate
          </button>
        </div>
      )
    } else if (prop.type === "paymentTo" && prop.cancelled) {
      return (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => markCancelled(true)}>
            <img src="undo.svg" alt="" /> Redo
          </button>
        </div>
      )
    }
  }, [markCancelled, markPaid, prop.cancelled, prop.type])

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