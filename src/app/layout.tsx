import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vibe Stack — AI-Powered Next.js Boilerplate',
  description:
    'The production-ready Next.js 15 + Supabase starter designed for AI-assisted development. Ship secure, scalable apps in hours with battle-tested Cursor rules.',
  keywords: [
    'Next.js boilerplate',
    'Supabase starter',
    'Cursor rules',
    'AI coding',
    'vibe coding',
    'Next.js 15',
    'React 19',
  ],
  openGraph: {
    title: 'Vibe Stack — AI-Powered Next.js Boilerplate',
    description:
      'Ship production apps in hours, not months. 15 battle-tested AI rules prevent hallucinations.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
