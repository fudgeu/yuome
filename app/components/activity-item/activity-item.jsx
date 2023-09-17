import styles from './activity-item.module.css'
import { useCallback } from 'react'

export default function ActivityItem(props) {

  const getTitleText = useCallback(() => {
    console.log(props.item.type)
    if (props.item.type === 'requestFrom') {
      return (<h2>{props.item.user} requested</h2>)
    } else if (props.item.type === 'paymentTo') {
      return (<h2>You paid {props.item.user}</h2>)
    } else if (props.item.type === 'requestTo') {
      return (<h2>You requested {props.item.user}</h2>)
    } else if (props.item.type === 'paymentFrom') {
      return (<h2>{props.item.user} paid you</h2>)
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