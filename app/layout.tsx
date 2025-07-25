import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { MovieProvider } from '@/context/MovieContext';
import { TvProvider } from '@/context/TvContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie Buddy',
  description: 'This is a website that helps you stay updated with the latest information on movies and tv shows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TvProvider>
          <MovieProvider>
            {children}
            <SpeedInsights />
          </MovieProvider>
        </TvProvider>
      </body>
    </html>
  )
}
