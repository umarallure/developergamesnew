import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'INSURVAS',
  description: 'The all-in-one operating system for insurance professionals - from lead acquisition to final issuance.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-black min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
