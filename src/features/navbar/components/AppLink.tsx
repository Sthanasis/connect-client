import { useRouter, usePathname } from 'next/navigation';
import { MouseEvent, ReactNode } from 'react';

interface AppLinkProps {
  children: ReactNode | JSX.Element | string;
  href: string;
  onTransitionEnd?: () => void;
}

export default function AppLink({
  children,
  href,
  onTransitionEnd,
}: AppLinkProps) {
  const router = useRouter();
  const isActive = usePathname() === href;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isActive) return;
    router.push(href);
  };

  return (
    <a
      href={href}
      className={`p-4 transition-colors duration-100 cursor-pointer w-full sm:w-auto ${
        isActive ? 'bg-slate-600 text-snow-white' : ''
      }`}
      onTransitionEnd={onTransitionEnd}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
