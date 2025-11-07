import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Frame Motion and Animation Studies',
  description: 'Estudos sobre animações e motion design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

