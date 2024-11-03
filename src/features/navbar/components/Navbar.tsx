'use client';

import { routeConfig } from '../configs/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@/shared/components/button/Button';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AppLink from './AppLink';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [docEnv, setDocEnv] = useState(false);

  function transitionEndHandler() {
    if (isOpen) setIsOpen(false);
  }

  useEffect(() => {
    if (!!document) setDocEnv(true);
  }, []);

  return (
    <>
      <div className="w-full flex px-4 justify-between sm:justify-start gap-8 shadow-sm border-b sticky top-0 bg-snow-white">
        <div className="p-4 cursor-default">MY APP</div>
        <ul className="sm:flex hidden sm:visible">
          {routeConfig.map((route) => (
            <li key={route.href} className="flex w-full">
              <AppLink href={route.href}>{route.name}</AppLink>
            </li>
          ))}
        </ul>
        <div className="flex sm:hidden">
          <Button variant="text" onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faBars} size="xl" />
          </Button>
        </div>
      </div>
      {docEnv &&
        createPortal(
          <div
            className={'fixed sm:hidden h-screen w-screen duration-300 top-14 transition-transform translate-x-full '.concat(
              isOpen ? '!translate-x-0' : ''
            )}
          >
            <ul
              className={'bg-snow-white h-full duration-300 transition-opacity opacity-0 '.concat(
                isOpen ? '!opacity-100' : ''
              )}
            >
              {routeConfig.map((route) => (
                <li key={route.href} className="flex w-full">
                  <AppLink
                    href={route.href}
                    onTransitionEnd={transitionEndHandler}
                  >
                    {route.name}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>,
          document.querySelector('body')!
        )}
    </>
  );
}
