import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import Provider from './provider/provider'


//go to top of screen button
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <body>
        <Provider>
          <Navbar/>
          {children}
        </Provider>
      </body>
    </html>
  )
}
