'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const { accessToken } = useAuth(); // or `accessToken` if you store tokens
  const router = useRouter();
  let token:string | null = null;
if (typeof window !== 'undefined') {
   token = localStorage.getItem('accessToken');

}
  useEffect(() => {
    console.log("test token" , token);
    
  if (!token) {
    router.push('/');
  }
//  console.log("test accessToken" , accessToken)
}, [token,router]);

  if (!token) {
    return <div className="p-3 flex justify-center items-center w-screen h-screen"><p className='py-3 px-7 bg-black text-white rounded-3xl'>
      جاري التوحيه...</p></div>;
  }
  return <>{children}</>;
};

export default ProtectedRoute;