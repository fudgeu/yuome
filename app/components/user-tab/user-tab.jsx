'use client'
/* eslint-disable @next/next/no-img-element */
import styles from './user-tab.module.css'
import { useState, useCallback } from 'react'
import clsx from 'clsx'
import Transaction from '../transaction/transaction'

// Prop: user, transactions
// For now:
/*
user: {
  user: string;
  tabs: {
    "3525758678": [
      {
        type: 'requestFrom'
        amount: number;
        created: date?;
        note: string
      },
      {
        type: 'requestTo'
        amount: number;
        created: date?;
        note: string
      },
      {
        type: 'paymentTo'
        amount: number;
        created: date?;
        note: string
      },
      {
        type: 'paymentFrom'
        amount: number;
        created: date?;
        note: string
      },
    ],
    "8132351582": [
      {
        type: 'paymentTo'
        amount: number;
        created: date?;
        note: string
      }
    ]
  }
}
*/

export default function UserTab(props) {

  const [isOpen, setOpen] = useState(false)

  const calculateBalance = useCallback(() => {
    let totalBalance = 0
    props.tab.forEach((transaction) => {
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
    const content = props.tab.map((transaction) => {
      return (<Transaction key={transaction.id} type={transaction.type} amount={transaction.amount} user={props.user} note={transaction.note} />)
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
  }, [props.tab, props.user])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{props.user}</h3>
        <div className={styles.rightElements}>
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
    </div>
  )
}