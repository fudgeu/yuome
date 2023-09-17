/* eslint-disable @next/next/no-img-element */
'use client'

import styles from './dashboard.module.css'
import { useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import RecentActivity from '../recent-activity/recent-activity';
import AllTabs from '../all-tabs/all-tabs';
import { useUser } from '@clerk/nextjs';
import Request from '../request/request';

export default function Dashboard() {
  const [showRequest, setShowRequest] = useState(false);
  const [currentTab, setTab] = useState('activeTabs');
  const [rawTransactions, setRawTransactions] = useState();
  const [tabs, setTabs] = useState({});
  const [totalBalance, setTotalBalance] = useState(0);
  const [amtFriendsOwed, setAmtFriendsOwed] = useState(0);
  const [amtFriendsOwe, setAmtFriendsOwe] = useState(0);
  const { user } = useUser();


  const updateTabs = useCallback(() => {
    if (user == null) return
    fetch(
      "/api/get-user-transactions",
      {
        method: "POST",
        body: JSON.stringify({
          phone_number: user.primaryPhoneNumber.phoneNumber
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then((resp) => {
        return resp.json()
      }).then((json) => {
        setRawTransactions(json)
        // Fix user phone number
        let curUser = user.primaryPhoneNumber.phoneNumber
        if (curUser.startsWith("+1")) {
          curUser = curUser.substring(2, 12)
        }

        // Sort data into each user
        const sortedData = {}
        json.forEach((transaction) => {
          const parsedTransaction = {}
          parsedTransaction.amount = transaction.amount
          parsedTransaction.created = transaction.r_date
          parsedTransaction.note = transaction.notes
          parsedTransaction.cancelled = !transaction.status
          parsedTransaction.id = transaction.id
          if (curUser === transaction.pn_from) {
            if (transaction.type === "req") {
              parsedTransaction.type = "requestTo"
            } else if (transaction.type === 'pay') {
              parsedTransaction.type = "paymentTo"
            }
            if (sortedData[transaction.pn_to] == null) sortedData[transaction.pn_to] = []
            sortedData[transaction.pn_to].push(parsedTransaction)
          } else if (curUser === transaction.pn_to) {
            if (transaction.type === "req") {
              parsedTransaction.type = "requestFrom"
            } else if (transaction.type === 'pay') {
              parsedTransaction.type = "paymentFrom"
            }
            if (sortedData[transaction.pn_from] == null) sortedData[transaction.pn_from] = []
            sortedData[transaction.pn_from].push(parsedTransaction)
          }
        })
        setTabs(sortedData)
      })
  }, [user])

  useEffect(() => {
    updateTabs()
  }, [])

  // Update total balance
  useEffect(() => {
    let totalBalance = 0
    let friendsOwe = 0
    let friendsOwed = 0
    Object.values(tabs).map((tab) => {
      let friendBal = 0
      tab.forEach((transaction) => {
        if (transaction.cancelled) return
        if (transaction.type === 'requestFrom' || transaction.type === 'paymentFrom') {
          friendBal -= transaction.amount
        } else if (transaction.type === 'requestTo' || transaction.type === 'paymentTo') {
          friendBal += transaction.amount
        }
      })
      if (friendBal < 0) {
        friendsOwed += 1
      } else if (friendBal > 0) {
        friendsOwe += 1
      }
      totalBalance += friendBal
    })
    setTotalBalance(totalBalance)
    setAmtFriendsOwe(friendsOwe)
    setAmtFriendsOwed(friendsOwed)
  }, [tabs])

  const getTabView = useCallback(() => {
    if (currentTab == 'activeTabs') {
      return (
        <AllTabs tabs={tabs} self={user?.primaryPhoneNumber.phoneNumber} update={() => updateTabs()} />
      )
    } else if (currentTab == 'recentActivity') {
      return (
        <RecentActivity transactions={rawTransactions} curUser={user?.primaryPhoneNumber.phoneNumber} />
      )
    } else if (currentTab == 'previousTabs') {
      return (
        <div />
      )
    }
  }, [currentTab, rawTransactions, tabs, updateTabs, user?.primaryPhoneNumber.phoneNumber])

  const getSubText = useCallback(() => {
    let result = ""
    if (amtFriendsOwe > 0) {
      result += `${amtFriendsOwe} friend${amtFriendsOwe == 1 ? '' : 's'} owe${amtFriendsOwe == 1 ? 's' : ''} you money`
    }
    if (amtFriendsOwed > 0) {
      result += `${amtFriendsOwe > 0 ? ', y' : 'Y'}ou owe ${amtFriendsOwed} friend${amtFriendsOwed == 1 ? '' : 's'}`
    }
    result += '.'
    
    if (result === '.') return []
    return <p>{result}</p>
  }, [amtFriendsOwe, amtFriendsOwed])

  return (
    <div className={styles.dashboard}>

      <div className={styles.balanceDisplay}>
        <div className={styles.balanceSummary}>
          <h1>Your balance is</h1>
          <h2>${totalBalance}</h2>
          {getSubText()}
        </div>
        <div className={styles.mainButtons}>
          <button className={styles.requestButton} onClick={() => setShowRequest(true)}>
            <img src="/money.svg" alt="" /> Request
          </button>
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
        </div>
        {getTabView()}
      </div>
      {showRequest && <Request close={() => {
        setShowRequest(false)
        updateTabs()
      }} /> }
    </div>
  )
}