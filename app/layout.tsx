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
      <body className="min-h-screen bg-ink text-rice antialiased">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-ink to-ink -z-10" />
        {children}
      </body>
    </html>
  )
}
