import { useCallback } from 'react'
import styles from './transaction.module.css'

/*
  prop.type = 'requestTo' | 'requestFrom' | 'paymentTo' | 'paymentFrom'
  prop.amount: number
  prop.user: string
*/

export default function Transaction(prop) {

  const getText = useCallback(() => {
    if (prop.type === 'requestTo') {
      return <p>You requested ${prop.amount} from {prop.user}</p>
    } else if (prop.type === 'requestFrom') {
      return <p>{prop.user} requested ${prop.amount} from you</p>
    } else if (prop.type === 'paymentTo') {
      return <p>You paid {prop.user} ${prop.amount}</p>
    } else if (prop.type === 'paymentFrom') {
      return <p>{prop.user} paid you ${prop.amount}</p>
    }
  }, [prop.amount, prop.type, prop.user])

  return (
    <div className={styles.container}>
      {getText()}
    </div>
  )
}