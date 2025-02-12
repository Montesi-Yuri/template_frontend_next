import { Inter } from 'next/font/google'
import './globals.css'
import { ErrorProvider } from '@/providers/ErrorProvider'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f9e9' }, // ivory
    { media: '(prefers-color-scheme: dark)', color: '#153243' },  // prussian
  ],
}

export const metadata = {
  title: 'Clarus',
  description: 'Software per la gestione dei dati e ottimizzazione dei processi aziendali',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    apple: {
      url: '/apple-icon.png',
      type: 'image/png',
      sizes: '180x180',
    },
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#153243', // Il colore prussian
      },
    ],
  },
  manifest: '/manifest.json', // Se vuoi supportare PWA
}

export default function RootLayout({ children }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorProvider>
          {children}
        </ErrorProvider>
      </body>
    </html>
  )
} 