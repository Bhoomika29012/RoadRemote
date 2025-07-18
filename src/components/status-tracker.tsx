'use client';

import { CheckCircle, Car, ShieldCheck, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const statuses = [
  { text: 'Request Sent', icon: <CheckCircle /> },
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
                    {index <= currentStep && (
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
