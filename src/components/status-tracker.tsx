'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Loader, ShieldCheck, Wrench, Car } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const statuses = [
  { text: 'Request Sent', icon: <CheckCircle /> },
  { text: 'Helper Assigned', icon: <ShieldCheck /> },
  { text: 'Help on the way', icon: <Car /> },
  { text: 'Service Completed', icon: <Wrench /> },
];

export function StatusTracker() {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
                    {index === currentStatus && currentStatus < statuses.length -1 && isClient && (
                         <div className="flex items-center gap-2 text-sm text-primary">
                            <CheckCircle className="h-4 w-4" />
                            <span>Done!</span>
                        </div>
                    )}
                    {index === statuses.length - 1 && currentStatus === statuses.length -1 && (
                         <div className="flex items-center gap-2 text-sm text-primary">
                            <CheckCircle className="h-4 w-4" />
                            <span>Done!</span>
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
