'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Loader, ShieldCheck, Wrench, Car } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const statuses = [
  { text: 'Request Sent', icon: <CheckCircle /> },
  { text: 'Volunteer Found', icon: <ShieldCheck /> },
  { text: 'Help on the way', icon: <Car /> },
  { text: 'Request Completed', icon: <Wrench /> },
];

export function StatusTracker() {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && currentStatus < statuses.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatus((prevStatus) => prevStatus + 1);
      }, 3000); // 3-second delay for demo purposes
      return () => clearTimeout(timer);
    }
  }, [currentStatus, isClient]);

  return (
    <Card>
        <CardHeader>
            <CardTitle>Request Status</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
            {statuses.map((status, index) => (
                <div key={index} className="flex items-center gap-4">
                <div
                    className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                    index <= currentStatus ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                    )}
                >
                    {index < currentStatus ? <CheckCircle className="h-5 w-5" /> : status.icon}
                </div>
                <div className="flex-1">
                    <p className={cn('font-medium', index <= currentStatus ? 'text-foreground' : 'text-muted-foreground')}>
                        {status.text}
                    </p>
                    {index === currentStatus && isClient && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader className="h-4 w-4 animate-spin" />
                            <span>In progress...</span>
                        </div>
                    )}
                </div>
                </div>
            ))}
            </div>
      </CardContent>
    </Card>
  );
}
