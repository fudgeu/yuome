/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <img src="/yuome-logo-white.png" alt="yuome" />
    </main>
  )
}
