import '../globals.css'
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
      <body className="flex max-h-screen bg-gray-100 text-gray-900">
        <Sidebar />
        <div className="flex flex-col flex-1 h-[90vh]">
          <main className="  p-4">{children}</main>
          {/* <Footer /> */}
        </div> 
      </body>
    </html>
  )
}
