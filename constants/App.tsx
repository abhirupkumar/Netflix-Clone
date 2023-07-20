"use client";

import { AuthProvider } from '@/hooks/useAuth';
import React from 'react'
import { RecoilRoot } from 'recoil'

const App = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
        <AuthProvider>
          {children}
          </AuthProvider>
        </RecoilRoot>
      </body>
    </html>
  )
}

export default App