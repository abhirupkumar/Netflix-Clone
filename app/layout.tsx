import './globals.css'
import type { Metadata } from 'next'
import App from '@/constants/App';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'NETFLIX CLONE',
  description: 'Watch your favorite movies and TV shows on Netflix.',
  verification: {
    google: "co0B-CYrqRdI_fmi2ySiu2nYjJd2Wq8Db9ESsAv_uZE"
  }
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
