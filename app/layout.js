/* eslint-disable @next/next/no-img-element */
// app/layout.jsx
import './globals.css'
import styles from './layout.module.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'yuome',
  description: 'a simpler way of keeping tabs with your friends',
}


export default function RootLayout({ children }) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <nav className={styles.navbar}>
            <img src="/yuome-logo-white.png" alt="yuome" />
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}