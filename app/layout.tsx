import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Feng Shui | Flying Stars & Kua Calculator',
  description: 'Personal Feng Shui app with Flying Stars (Fei Xing), Kua number calculator, and Five Element remedies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fdfaf3] text-[#2d2a26] antialiased">
        {children}
      </body>
    </html>
  )
}
