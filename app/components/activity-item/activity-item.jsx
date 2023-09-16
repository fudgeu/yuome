import styles from './activity-item.module.css'
import { useCallback } from 'react'
/*
Prop[0]:
{
  type: 'request' | 'payment'
  from: string
  amount: number
  note: string
}
*/
export default function ActivityItem(props) {

  const getTitleText = useCallback(() => {
    if (props.item.type === 'request') {
      return (<h2>{props.item.from} requested</h2>)
    } else if (props.item.type === 'payment') {
      return (<h2>You paid {props.item.from}</h2>)
    }
  }, [props])

  return (
    <div className={styles.item}>
      {getTitleText()}
      <p className={styles.amount}>${props.item.amount}</p>
      <p className={styles.note}>{props.item.note}</p>
    </div>
  )
}