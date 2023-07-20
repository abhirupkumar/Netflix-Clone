import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account Settings - Netflix',
  description: 'Watch your favorite movies and TV shows on Netflix.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <section className="flex flex-col items-center">
          {children}
      </section>
  )
}
