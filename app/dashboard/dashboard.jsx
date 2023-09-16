import styles from './dashboard.module.css'
import Tab from '../tab/tab'

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>

      <div className={styles.balanceDisplay}>
        <div className={styles.balanceSummary}>
          <h1>Your balance is</h1>
          <h2>$23.00</h2>
          <p>You are owed money from 3 friends.</p>
        </div>
        <div className={styles.balanceDetails}>
          <h1>Recent Activity</h1>
          <ul className={styles.activityList}>
            <li>X requested $5 for Gas</li>
            <li>Y payed you $10 for McDonalds</li>
            <li>You payed X $7 for 2 things</li>
            <li>W payed you $20 for everything</li>
          </ul>
        </div>
      </div>

      <div className={styles.mainButtons}>
        <div className={styles.requestButton}>
          Request
        </div>
        <div className={styles.payButton}>
          Pay tab
        </div>
      </div>

      <div className={styles.tabContainer}>
        <h1>All active tabs</h1>
        <div className={styles.tabList}>
          <Tab name="X" amount="35" />
          <Tab name="Y" amount="35" />
          <Tab name="Z" amount="35" />
          <Tab name="W" amount="35" />
          <Tab name="XY" amount="35" />
          <Tab name="XW" amount="35" />
          <Tab name="XZ" amount="35" />
          <Tab name="WX" amount="35" />
          <Tab name="YZ" amount="35" />
        </div>
      </div>

    </div>
  )
}