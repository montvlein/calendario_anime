import { Inter } from 'next/font/google'
import './globals.css'
import { AppContext } from './client/context/ContextComponent'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Anime calendar',
  description: 'Anime calendar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContext>{children}</AppContext>
      </body>
    </html>
  )
}
