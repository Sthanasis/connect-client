'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Navbar() {
  const pathname = usePathname();
  const routeConfig = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
  ];
  return (
    <div className="w-full flex px-4 justify-start gap-8 shadow-sm border-b sticky top-0 bg-snow-white">
      <Link className="p-4 cursor-pointer" href="/">
        ESHOP
      </Link>
      <ul className="flex">
        {routeConfig.map((route) => (
          <li className="flex" key={route.href}>
            <Link
              className={`p-4 cursor-pointer ${
                pathname === route.href ? 'bg-slate-600 text-snow-white' : ''
              }`}
              href={route.href}
            >
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
