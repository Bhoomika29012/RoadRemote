'use client';

import Link from 'next/link';
import { Car, Loader2 } from 'lucide-react';
import { UserNav } from './user-nav';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

function getTitleFromPath(path: string): string {
    if (path.includes('driver')) return 'Driver Dashboard';
    if (path.includes('volunteer/availability')) return 'Volunteer Availability';
    if (path.includes('volunteer')) return 'Volunteer Dashboard';
    if (path.includes('garage')) return 'Garage Dashboard';
    return 'Dashboard';
}

export function DashboardHeader() {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <Car className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold font-headline hidden sm:inline-block">RoadRemote</span>
            </Link>
             {isClient ? (
                <>
                    <div className="h-6 w-px bg-border hidden sm:block" />
                    <h1 className="text-xl font-semibold font-headline">{title}</h1>
                </>
            ) : (
                <>
                    <div className="h-6 w-px bg-border hidden sm:block" />
                    <div className="w-32 h-6 rounded-md bg-muted animate-pulse" />
                </>
            )}
        </div>
      <div className="ml-auto flex items-center gap-2">
         {isClient ? <UserNav /> : <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />}
      </div>
    </header>
  );
}
