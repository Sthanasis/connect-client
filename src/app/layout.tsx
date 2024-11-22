import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Navbar from '@/features/navbar/components/Navbar';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Online Shop',
  description: 'An online shop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-auto w-screen pt-16 h-screen  antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <header className="w-full fixed z-10 top-0">
          <Navbar />
        </header>
        <main className="flex flex-wrap p-4 gap-8">{children}</main>
      </body>
    </html>
  );
}
