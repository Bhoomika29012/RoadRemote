'use client';

import { CheckCircle, Car, ShieldCheck, Wrench, Search, Star, CircleDotDashed } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useState } from 'react';
import { RatingDialog } from './rating-dialog';

const statuses = [
  { text: 'Request Initiated', icon: <Search /> },
  { text: 'Finding Help', icon: <CircleDotDashed /> },
  { text: 'Helper Assigned', icon: <ShieldCheck /> },
  { text: 'Help on the way', icon: <Car /> },
  { text: 'Service Completed', icon: <Wrench /> },
  { text: 'Rating Submitted', icon: <Star /> },
];

interface StatusTrackerProps {
  currentStep: number;
  helperName?: string;
  serviceCompleted: boolean;
  ratingSubmitted: boolean;
  onRateHelper: () => void;
}

export function StatusTracker({
  currentStep,
  helperName,
  serviceCompleted,
  ratingSubmitted,
  onRateHelper,
}: StatusTrackerProps) {
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);

  const handleRatingSubmit = (rating: number, comment: string) => {
    onRateHelper();
    setIsRatingDialogOpen(false);
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Request Status</CardTitle>
          {helperName && <CardDescription>Your helper is {helperName}.</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {statuses.map((status, index) => (
              <div key={index} className="flex items-center gap-4">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                    index < currentStep ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                  )}
                >
                  {index < currentStep ? <CheckCircle className="h-5 w-5" /> : status.icon}
                </div>
                <div className="flex-1">
                  <p className={cn('font-medium', index < currentStep ? 'text-foreground' : 'text-muted-foreground')}>
                    {status.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {serviceCompleted && !ratingSubmitted && (
            <Button className="w-full mt-6" onClick={() => setIsRatingDialogOpen(true)}>
              <Star className="mr-2 h-4 w-4" />
              Rate Your Helper
            </Button>
          )}
          {ratingSubmitted && (
             <div className="text-center mt-6 p-4 bg-secondary rounded-lg">
                <p className="font-semibold text-primary">Thanks for your feedback!</p>
             </div>
          )}
        </CardContent>
      </Card>
      <RatingDialog
        open={isRatingDialogOpen}
        onOpenChange={setIsRatingDialogOpen}
        onSubmit={handleRatingSubmit}
        helperName={helperName}
      />
    </>
  );
}
