import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

// import Header from '@/components/header'
import './globals.css'

// Mantine ui provider
import '@mantine/core/styles.css'
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps
} from '@mantine/core'

//componets
import Header from '@/components/header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Plus tickets',
  description: 'Compra tickets de eventos totalmente online'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh`}
      >
        <MantineProvider>
          <Header />
          {children}
        </MantineProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
