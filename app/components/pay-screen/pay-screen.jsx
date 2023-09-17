/* eslint-disable @next/next/no-img-element */
import { useCallback, useState } from 'react'
import styles from './pay-screen.module.css'

export default function PayScreen(props) {

  const [amt, setAmt] = useState()
  const [note, setNote] = useState()

  const submitRequest = useCallback(() => {
    fetch(
      "/api/create-transaction",
      {
        method: "POST",
        body: JSON.stringify({
          type: 'pay',
          amount: amt,
          'pn_to': props.to,
          'pn_from': props.from,
          notes: note
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((resp) => {
      props.close()
    })
  }, [amt, note, props])

  return (
    <div className={styles.screen}>
      <div className={styles.container}>

        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => props.close()}>
            <img src="back.svg" alt="Go back" />
          </button>
          <h1>Pay</h1>
        </div>

        <p className={styles.toText}>Sending to: <span className={styles.nameText}>{props.screenName} <span className={styles.phoneText}>({props.to})</span></span></p>

        <form 
          className={styles.form}
          name="Request payment form"
          onSubmit={(e) => {
            e.preventDefault()
            submitRequest()
          }}
        >
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
            Mark as paid
          </button>
        </form>
      </div>
    </div>
  )
}