/* eslint-disable @next/next/no-img-element */
import { useCallback } from 'react'
import styles from './transaction.module.css'

/*
  prop.type = 'requestTo' | 'requestFrom' | 'paymentTo' | 'paymentFrom'
  prop.amount: number
  prop.user: string
*/

export default function Transaction(prop) {

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
      returnText = `You requested $${prop.amount} from ${prop.user}`
    } else if (prop.type === 'requestFrom') {
      returnText = `${prop.user} requested $${prop.amount} from you`
    } else if (prop.type === 'paymentTo') {
      returnText = `You paid ${prop.user} $${prop.amount}`
    } else if (prop.type === 'paymentFrom') {
      returnText = `${prop.user} paid you $${prop.amount}`
    }
    if (prop.note != null && prop.note !== "") {
      returnText = `${returnText}: ${prop.note}`
    }
    return <p>{returnText}</p>
  }, [prop.amount, prop.note, prop.type, prop.user])

  const getButtons = useCallback(() => {
    if (prop.type.startsWith("request")) {
      return (
        <div className={styles.buttonContainer}>
          <div className={styles.button}>
          <img src="money.svg" alt="" /> Pay back
          </div>
          <div className={styles.button}>
            <img src="cancel.svg" alt="" /> Cancel
          </div>
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
  }, [prop.type])

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        {getBulletPoint()}
        {getText()}
      </div>
      {getButtons()}
    </div>
  )
}