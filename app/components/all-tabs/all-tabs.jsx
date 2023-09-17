'use client'
import styles from './all-tabs.module.css'
import UserTab from '../user-tab/user-tab'

export default function AllTabs(props) {
  return (
    <div className={styles.tabList}>
      {Object.keys(props.tabs).map((user) => {
        return (<UserTab key={user} user={user} tab={props.tabs[user]} self={props.self} update={() => props.update()} />)
      })}
    </div>
  )
}