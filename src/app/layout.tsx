import './globals.css'
import Providers from './providers';
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'لوحة الإدارة',
  description: 'لوحة متابعة العهدة والمصروف والسلفة',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" >
      <body className="flex max-h-screen bg-gradient-to-bl from-transparent via-[#e0e0e0] to-orange-300 text-gray-900 dark:text-white">
        <div className="flex flex-col flex-1 h-screen ">
          <main className="flex">
            <Providers>{children}</Providers>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
