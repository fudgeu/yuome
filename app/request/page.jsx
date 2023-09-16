/* eslint-disable @next/next/no-img-element */
import styles from './page.module.css'

export default function Request() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <a href="/">
          <img className={styles.backButton} src="back.svg" alt="Go back" />
        </a>
        <h1>Request</h1>
      </div>

      <form className={styles.form}>
        <h2>Recipient&apos;s phone number:</h2>
        <input className={styles.telephoneInput} type="tel" />
        <h2>Amount</h2>
        <input className={styles.telephoneInput} />
        <h2>Note</h2>
        <input className={styles.telephoneInput} />
        <button className={styles.requestButton}>
          Send request
        </button>
      </form>

    </main>
  )
}