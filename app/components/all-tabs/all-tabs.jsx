'use client'
import styles from './all-tabs.module.css'
import UserTab from '../user-tab/user-tab'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

const testTab = [
  {
    type: 'requestFrom',
    amount: 50,
    created: "8/10/23",
    note: "McDonalds",
    id: "wfevfvseb"
  },
  {
    type: 'requestTo',
    amount: 25,
    created: "8/10/23",
    note: "Gas",
    id: "wfevfasdfb"
  },
  {
    type: 'paymentTo',
    amount: 5,
    created: "8/10/23",
    note: "Taxes",
    id: "wfqwerseb"
  }
]

export default function AllTabs() {

  const [tabs, setTabs] = useState({});
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (user == null) return
    fetch(
      "/api/get-user-info",
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
        console.log(json)

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
              sortedData[transaction.pn_from] = {
                type: "requestFrom",
              }
            } else if (transaction.type === 'pay') {
              sortedData[transaction.pn_from] = {
                type: "paymentFrom"
              }
            }
            if (sortedData[transaction.pn_from] == null) sortedData[transaction.pn_from] = []
            sortedData[transaction.pn_from].push(parsedTransaction)
          }
        })
        setTabs(sortedData)
      })
  }, [user])

  return (
    <div className={styles.tabList}>
      {Object.keys(tabs).map((user) => {
        console.log(`mapping: ${user}`)
        console.log(tabs[user])
        return (<UserTab key={user} user={user} tab={tabs[user]} />)
      })}
    </div>
  )
}

/*
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
      */