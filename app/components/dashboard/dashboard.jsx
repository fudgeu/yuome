'use client'

import styles from './dashboard.module.css'
import { useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import RecentActivity from '../recent-activity/recent-activity';
import AllTabs from '../all-tabs/all-tabs';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [currentTab, setTab] = useState('activeTabs');

  const getTabView = useCallback(() => {
    if (currentTab == 'activeTabs') {
      return (
        <AllTabs />
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
          <a className={styles.requestButton} href="/request">
            Request
          </a>
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