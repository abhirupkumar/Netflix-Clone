import './globals.css'
import type { Metadata } from 'next'
import App from '@/constants/App';

export const metadata: Metadata = {
  title: 'NETFLIX',
  description: 'Watch your favorite movies and TV shows on Netflix.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <App children={children} />
  )
}
