// app/layout.jsx
import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <UserProvider>
      <body className={inter.className}>{children}</body>
      </UserProvider>
      </html>
    </ClerkProvider>
  );
}