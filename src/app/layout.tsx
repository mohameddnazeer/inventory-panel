import './globals.css'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer' // ⬅️ تأكد إنك مستورد الفوتر هنا
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'لوحة الإدارة',
  description: 'لوحة متابعة العهدة والمصروف والسلفة',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex max-h-screen bg-gradient-to-bl from-transparent via-orange-50 to-orange-300 text-gray-900">
        <div className="flex flex-col  flex-1 h-screen ">
          <main className="flex p-6">{children}</main>
          <Footer />
        </div> 
      </body>
    </html>
  )
}
