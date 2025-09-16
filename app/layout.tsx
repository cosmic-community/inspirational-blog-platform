import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: 'Inspirational Blog Platform',
  description: 'A modern blog platform for sharing inspirational content with categories, mood-based filtering, and beautiful content presentation.',
  keywords: 'inspirational, blog, personal growth, gratitude, hope, faith, motivation',
  authors: [{ name: 'Cosmic' }],
  openGraph: {
    title: 'Inspirational Blog Platform',
    description: 'Share and discover inspirational content for personal growth, gratitude, and hope.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="min-h-screen flex flex-col bg-secondary-50">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}