'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routeConfig } from '../configs/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@/shared/components/button/Button';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full flex px-4 justify-between sm:justify-start gap-8 shadow-sm border-b sticky top-0 bg-snow-white">
        <Link className="p-4 cursor-pointer" href="/">
          MY APP
        </Link>
        <ul className="sm:flex hidden sm:visible">
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
        <div className="flex sm:hidden">
          <Button variant="text" onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faBars} size="xl" />
          </Button>
        </div>
      </div>
      {createPortal(
        <div
          className={'fixed sm:hidden h-screen w-screen pt-14 duration-300 transition-transform translate-x-full'.concat(
            isOpen ? 'translate-x-0' : ''
          )}
        >
          <ul
            className={'bg-snow-white h-full transition-opacity opacity-0'.concat(
              isOpen ? 'opacity-100' : ''
            )}
          >
            {routeConfig.map((route) => (
              <li
                className="flex"
                key={route.href}
                onClick={() => setIsOpen(false)}
              >
                <Link
                  className={`p-4 cursor-pointer w-full ${
                    pathname === route.href
                      ? 'bg-slate-600 text-snow-white'
                      : ''
                  }`}
                  href={route.href}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>,
        document.body
      )}
    </>
  );
}
