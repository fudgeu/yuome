'use client'

import styles from './dashboard.module.css'
import { useState } from 'react';
import clsx from 'clsx';
import Tab from '../tab/tab'

export default function Dashboard() {
const [currentTab, setTab] = useState('activeTabs');

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