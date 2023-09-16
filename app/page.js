/* eslint-disable @next/next/no-img-element */
import styles from './page.module.css'
import Dashboard from './components/dashboard/dashboard'

export default function Home() {
  return (
    <main className={styles.main}>

      <nav className={styles.navbar}>
        <img src="/yuome-logo-white.png" alt="yuome" />
        <a href="/api/auth/login">Login</a>
        <a href="/api/auth/logout">Logout</a>
      </nav>

      <Dashboard />

    </main>
  )
}
