'use client'
import styles from './all-tabs.module.css'
import UserTab from '../user-tab/user-tab'
import { useEffect } from 'react'
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

  const { isSignedIn, user } = useUser();

  useEffect(() => {
    fetch(
      "/api/get-user-info",
      {
        method: "POST",
        body: JSON.stringify({
          phone_number: user?.primaryPhoneNumber.phoneNumber
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then((resp) => {
        console.log(resp)
      })
  }, [user?.primaryPhoneNumber])

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
}