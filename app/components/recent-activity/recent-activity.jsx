import styles from './recent-activity.module.css'
import ActivityItem from '../activity-item/activity-item'

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

export default function RecentActivity() {
  return (
    <div className={styles.container}>
      <ActivityItem item={testItem} />
      <ActivityItem item={testItem2} />
      <ActivityItem item={testItem} />
      <ActivityItem item={testItem2} />
      <ActivityItem item={testItem} />
      <ActivityItem item={testItem2} />
    </div>
  )
}