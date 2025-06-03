'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { FaCashRegister, FaClipboardList } from 'react-icons/fa';
import { MdInventory2, MdCategory } from "react-icons/md";
import { IoHome, IoLogOutSharp } from "react-icons/io5";
import ThemeToggler from './ui/ThemeToggler';

const navLinks = [
  { href: '/dashboard', label: 'الصفحة الرائسية', icon: <IoHome className="w-5 h-5" /> },
  { href: '/dashboard/inventory', label: 'العهدة', icon: <MdInventory2 className="w-5 h-5" /> },
  { href: '/dashboard/expenses', label: 'المصروف', icon: <FaCashRegister className="w-5 h-5" /> },
  { href: '/dashboard/loans', label: 'السلفة', icon: <FaClipboardList className="w-5 h-5" /> },
  { href: '/dashboard/categories', label: 'الاصناف', icon: <MdCategory className="w-5 h-5" /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const route = useRouter();

  function logOut() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      route.push('/');
    }
  }

  return (
    <aside className="relative w-64 h-[94.8vh]   bg-white  border-l border-gray-300  shadow-md p-4 flex flex-col justify-between">
      
      
      <div>
        <div className="mb-4">
          <Image src="/images/foeLogo.png" width={250} height={250} alt="logo" className="mx-auto" />
        </div>

        <nav className="space-y-3">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'p-2 rounded hover:bg-blue-100  transition text-xl flex items-center gap-2',
                pathname === link.href
                  ? 'bg-blue-500 text-white hover:bg-blue-400 '
                  : 'text-gray-700 '
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      
      <div className="space-y-4">
        <ThemeToggler />

        <button
          onClick={logOut}
          className="w-full  flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition duration-150 cursor-pointer"
        >
          <IoLogOutSharp size={20} />
          <span className="text-lg">تسجيل خروج</span>
        </button>
      </div>
    </aside>
  );
}
