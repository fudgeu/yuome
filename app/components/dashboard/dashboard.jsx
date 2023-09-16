'use client'

import styles from './dashboard.module.css'
import { useState, useCallback } from 'react';
import clsx from 'clsx';
import Tab from '../tab/tab'
import RecentActivity from '../recent-activity/recent-activity';
import UserTab from '../user-tab/user-tab';

const testTab = [
  {
    type: 'requestFrom',
    amount: 50,
    created: "8/10/23",
    note: "McDonalds"
  },
  {
    type: 'requestTo',
    amount: 25,
    created: "8/10/23",
    note: "Gas"
  },
  {
    type: 'paymentTo',
    amount: 5,
    created: "8/10/23",
    note: "Taxes"
  }
]

export default function Dashboard() {
  const [currentTab, setTab] = useState('activeTabs');

  const getTabView = useCallback(() => {
    if (currentTab == 'activeTabs') {
      return (
        <div className={styles.tabList}>
          <UserTab user="UserX" tab={testTab} />
          <UserTab user="UserY" tab={testTab} />
          <UserTab user="UserZ" tab={testTab} />
          <UserTab user="UserW" tab={testTab} />
          <UserTab user="UserXY" tab={testTab} />
          <UserTab user="UserXZ" tab={testTab} />
          <UserTab user="UserXW" tab={testTab} />
          <UserTab user="UserYZ" tab={testTab} />
          <UserTab user="UserYW" tab={testTab} />
          <UserTab user="UserYX" tab={testTab} />
          <UserTab user="UserZZ" tab={testTab} />
        </div>
      )
    } else if (currentTab == 'recentActivity') {
      return (
        <RecentActivity />
      )
    } else if (currentTab == 'previousTabs') {
      return (
        <div />
      )
    }
  }, [currentTab])

  return (
    <div className={styles.dashboard}>

      <div className={styles.balanceDisplay}>
        <div className={styles.balanceSummary}>
          <h1>Your balance is</h1>
          <h2>$23.00</h2>
          <p>3 friends owe you money, you owe 1 friend.</p>
        </div>
        <div className={styles.mainButtons}>
          <div className={styles.requestButton}>
            Request
          </div>
          <div className={styles.payButton}>
            Pay tab
          </div>
        </div>
      </div>

      <div className={styles.tabContainer}>
        <div className={styles.tabSwitcher}>
          <button 
            className={
              clsx({
                [styles.tabButton]: true,
                [styles.inactiveTab]: currentTab !== 'activeTabs'
              })
            }
            onClick={() => setTab('activeTabs')}
            role="button"
          >
            <h1>All active tabs</h1>
          </button>
          <button 
            className={
              clsx({
                [styles.tabButton]: true,
                [styles.inactiveTab]: currentTab !== 'recentActivity'
              })
            }
            onClick={() => setTab('recentActivity')}
            role="button"
          >
            <h1>Recent activity</h1>
          </button>
          <button 
            className={
              clsx({
                [styles.tabButton]: true,
                [styles.inactiveTab]: currentTab !== 'previousTabs'
              })
            }
            onClick={() => setTab('previousTabs')}
            role="button"
          >
            <h1>Previous tabs</h1>
          </button>
        </div>
        {getTabView()}
      </div>

    </div>
  )
}