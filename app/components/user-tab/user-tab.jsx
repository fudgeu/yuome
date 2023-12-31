'use client'
/* eslint-disable @next/next/no-img-element */
import styles from './user-tab.module.css'
import { useState, useCallback, useEffect } from 'react'
import clsx from 'clsx'
import Transaction from '../transaction/transaction'
import PayScreen from '../pay-screen/pay-screen'

export default function UserTab(props) {

  const [showPayScreen, setShowPayScreen] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [name, setName] = useState(props.user)

  // Get user name, if it exists
  useEffect(() => {
    fetch(
      "/api/get-user-name",
      {
        method: "POST",
        body: JSON.stringify({
          phone_number: props.user
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then((resp) => {
        return resp.json()
      }).then((json) => {
        //console.log(`test ${json[0]?.name}`)
        if (json[0]?.name != null) {
          setName(json[0].name)
        }
      }
    )
  })

  const calculateBalance = useCallback(() => {
    let totalBalance = 0
    props.tab.forEach((transaction) => {
      if (transaction.cancelled) return
      if (transaction.type === 'requestFrom' || transaction.type === 'paymentFrom') {
        totalBalance -= transaction.amount
      } else if (transaction.type === 'requestTo' || transaction.type === 'paymentTo') {
        totalBalance += transaction.amount
      }
    })

    if (totalBalance == 0) {
      return <p>${totalBalance}</p>
    } else if (totalBalance < 0) {
      return <p className={styles.negative}>-${Math.abs(totalBalance)}</p>
    } else if (totalBalance > 0) {
      return <p className={styles.positive}>${totalBalance}</p>
    }
  }, [props])

  const getExpandedContent = useCallback(() => {
    const content = props.tab.toReversed().map((transaction) => {
      return (
        <Transaction 
          key={transaction.id}
          id={transaction.id}
          type={transaction.type}
          amount={transaction.amount}
          user={props.user}
          note={transaction.note}
          cancelled={transaction.cancelled}
          screenName={name}
          self={props.self}
          update={props.update}
        />
      )
    })
    return (
      <div className={styles.transactionContainer}>
        <div className={styles.transactionContainerLeftDeco} />
        <div className={styles.transactionInner}>
          {content}
        </div>
      </div>
    )
      content
  }, [name, props.self, props.tab, props.update, props.user])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{name}</h3>
        <div className={styles.rightElements}>
          <button 
            className={styles.payButton}
            role="button"
            onClick={() => {setShowPayScreen(true)}}
          >
            <img 
              src="money.svg" 
              alt="Pay an amount"
            />
            Pay amount
          </button>
          {calculateBalance()}
          <button 
            className={styles.expandButton}
            role="button"
            onClick={() => setOpen(!isOpen)}
          >
            <img 
              className={
                clsx({
                  [styles.expanded]: isOpen
                })
              }
              src="chevron.svg" 
              alt="Show more info"
            />
          </button>
        </div>
      </div>
      {isOpen && getExpandedContent()}
      {showPayScreen && 
        <PayScreen 
          to={props.user}
          from={props.self}
          screenName={name}
          close={() => {
            setShowPayScreen(false);
            props.update()
          }}
        />}
    </div>
  )
}