import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/themes-provider'
import MainNav from '@/components/main-nav'
import { Toaster } from '@/components/ui/toaster'

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'InteraxResume',
  description: 'Developed by Interax',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto_mono.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MainNav></MainNav>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}