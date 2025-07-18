'use client';

import Link from 'next/link';
import { Car } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { UserNav } from './user-nav';

export function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');
  const isAuth = pathname.startsWith('/auth');

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Car className="h-6 w-6 text-primary" />
        <span className="ml-2 text-xl font-bold font-headline">RoadRemote</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        { !isDashboard && !isAuth && (
           <>
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                Features
            </Link>
            <Link href="#roles" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                Get Started
            </Link>
           </>
        )}
        {isDashboard && <UserNav />}
      </nav>
    </header>
  );
}
