'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routeConfig } from '../configs/routes';
export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="w-full flex px-4 justify-start gap-8 shadow-sm border-b sticky top-0 bg-snow-white">
      <Link className="p-4 cursor-pointer" href="/">
        ESHOP
      </Link>
      <ul className="md:flex hidden sm:visible">
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
