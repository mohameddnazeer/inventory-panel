import React from 'react'
import { redirect } from 'next/navigation';
  const Page = () => {
      redirect('/login');
  return (
    <div className="flex justify-center items-center w-[90vw] h-[80vh]  ">
      
      <p className="text-3xl text-zinc-500">Landing Page</p>
    </div>
  );
}

export default Page;
