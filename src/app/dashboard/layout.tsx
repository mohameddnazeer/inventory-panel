'use client'
import '../globals.css'
import Sidebar from '@/components/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex items-center justify-between max-h-screen bg-gray-100 text-gray-900 w-full">
        <Sidebar />
        <div className="flex flex-col flex-1 h-[90vh] w-full bg-transparent">
          <main className="p-4">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
