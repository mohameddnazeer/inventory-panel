'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuth(); // or `accessToken` if you store tokens
  
  
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push('/login');
    }
  }, [accessToken]);

  if (!accessToken) {
    return <div className="p-4">Redirecting...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
