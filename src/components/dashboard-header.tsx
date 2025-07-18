'use client';

import { Loader2 } from 'lucide-react';
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="h-6 w-32 rounded-md bg-muted animate-pulse" />
      </header>
    );
  }

  const title = getTitleFromPath(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold font-headline">{title}</h1>
        </div>
    </header>
  );
}
