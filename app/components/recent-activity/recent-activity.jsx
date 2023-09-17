import styles from './recent-activity.module.css'
import ActivityItem from '../activity-item/activity-item'
import { useCallback } from 'react'

const testItem = {
  type: 'request',
  from: 'UserX',
  amount: 25,
  note: "McDonalds"
}

const testItem2 = {
  type: 'payment',
  from: 'UserY',
  amount: 30,
  note: "Gas"
}

export default function RecentActivity(props) {

  const parseTransactions = useCallback(() => {
    // Fix user phone number
    let curUser = props.curUser
    if (curUser.startsWith("+1")) {
      curUser = curUser.substring(2, 12)
    }

    const parsedTransactions = props.transactions.map((transaction) => {
      const parsed = {}
      parsed.amount = transaction.amount;
      parsed.note = transaction.notes;
      parsed.id = transaction.id;
      parsed.cancelled = !transaction.status

      console.log(transaction.pn_from)
      if (curUser === transaction.pn_from) {
        if (transaction.type === "req") {
          parsed.type = "requestTo"
        } else if (transaction.type === 'pay') {
          parsed.type = "paymentTo"
        }
        parsed.user = transaction.pn_to
      } else if (curUser === transaction.pn_to) {
        if (transaction.type === "req") {
          parsed.type = "requestFrom"
        } else if (transaction.type === 'pay') {
          parsed.type = "paymentFrom"
        }
        parsed.user = transaction.pn_from
      }

      return parsed
    })

    return parsedTransactions.map((obj) => <ActivityItem key={obj.id} item={obj} />)
  }, [props.curUser, props.transactions])

  return (
    <div className={styles.container}>
      {parseTransactions()}
    </div>
  )
}