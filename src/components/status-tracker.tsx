'use client';

import { CheckCircle, Car, ShieldCheck, Wrench, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const statuses = [
  { text: 'Request Initiated', icon: <Search /> },
  { text: 'Finding Help', icon: <Search /> },
  { text: 'Helper Assigned', icon: <ShieldCheck /> },
  { text: 'Help on the way', icon: <Car /> },
  { text: 'Service Completed', icon: <Wrench /> },
];

interface StatusTrackerProps {
    currentStep: number;
}

export function StatusTracker({ currentStep }: StatusTrackerProps) {
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
                    index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                    )}
                >
                    {index < currentStep ? <CheckCircle className="h-5 w-5" /> : status.icon}
                </div>
                <div className="flex-1">
                    <p className={cn('font-medium', index <= currentStep ? 'text-foreground' : 'text-muted-foreground')}>
                        {status.text}
                    </p>
                </div>
                </div>
            ))}
            </div>
      </CardContent>
    </Card>
  );
}
