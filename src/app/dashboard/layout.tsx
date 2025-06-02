'use client'
import '../globals.css'
import Sidebar from '@/components/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex justify-between max-h-screen w-full bg-gray-100 text-gray-900 transition-colors duration-300">

        <Sidebar />
        <div className="flex flex-col flex-1 h-screen w-full bg-transparent p-2 lg:p-6">
          <main>{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
