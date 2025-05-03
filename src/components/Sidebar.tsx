'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { FaCashRegister, FaClipboardList } from 'react-icons/fa';
import { MdInventory2 } from "react-icons/md";
import { IoHome  } from "react-icons/io5";

const navLinks = [
  { href: '/', label: 'الصفحة الرائسية', icon: <IoHome   className="w-5 h-5" /> },
  { href: '/dashboard/inventory', label: 'العهدة', icon: <MdInventory2  className="w-5 h-5" /> },
  { href: '/dashboard/expenses', label: 'المصروف', icon: <FaCashRegister className="w-5 h-5" /> },
  { href: '/dashboard/loans', label: 'السلفة', icon: <FaClipboardList className="w-5 h-5" /> },
]

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-l border-gray-300 shadow-md p-4">
      <Image src="/images/foeLogo.png" width={250} height={250} alt='logo'/>
      <nav className="space-y-3">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              ' p-2 rounded hover:bg-blue-100 transition text-xl flex items-center gap-2',
              pathname === link.href ? 'bg-blue-500 text-white' : 'text-gray-700'
            )}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
