'use client'

import { useState, useCallback } from 'react'
import styles from './name-setup.module.css'
import { useRouter } from 'next/navigation'

export default function NameSetup(props) {

  const [newName, setNewName] = useState('')
  const router = useRouter()

  const submitName = useCallback(() => {
    if (props.number == null) return
    fetch(
      "/api/create-user",
      {
        method: "POST",
        body: JSON.stringify({
          name: newName,
          phone_number: props.number
        }),
        headers: {
          "content-type": "application/json",
        },
      }).then((resp) => {
        console.log(resp)
        props.removePrompt()
        //setTimeout(() => router.refresh(), 500)
      })
  }, [newName, props.number, router])

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <h1>Hi, Welcome to yuome!</h1>
        <p>To get started, please provide a name</p>
        <aside>TIP: Try to use a name that your friends will recognize you by, whether its your first name, a nick name, or something else!</aside>
        <form 
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()
            submitName()
          }
        }
        >
          <input 
            className={styles.input}
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className={styles.button} role="submit">Get started!</button>
        </form>
      </div>
    </div>
  )
}