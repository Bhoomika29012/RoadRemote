'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatWindow } from '@/components/chat-window';
import { HeartHandshake, Wrench } from 'lucide-react';
import { mockVolunteers } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { findGarages, FindGaragesOutput } from '@/ai/flows/find-garages-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { StatusTracker } from '@/components/status-tracker';

export default function DriverDashboard() {
  const [garages, setGarages] = useState<FindGaragesOutput | null>(null);
  const [loadingGarages, setLoadingGarages] = useState(false);
  const [helpRequested, setHelpRequested] = useState(false);
  const [helperAssigned, setHelperAssigned] = useState(false);
  const { toast } = useToast();

  async function getGarages(location: string) {
    try {
      setLoadingGarages(true);
      const result = await findGarages({ location });
      setGarages(result);
    } catch (error) {
      console.error('Error finding garages:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch nearby garages. Please try again.',
      });
    } finally {
      setLoadingGarages(false);
    }
  }

  const handleInitialRequest = () => {
    setHelpRequested(true);
    toast({
        title: 'Request Sent',
        description: 'Finding nearby help for you.',
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getGarages(`${latitude}, ${longitude}`);
        },
        () => {
          toast({
            variant: 'destructive',
            title: 'Location Error',
            description: 'Could not get your location. Please enable location services.',
          });
          getGarages('Mountain View, CA');
        }
      );
    } else {
       toast({
        variant: 'destructive',
        title: 'Location Error',
        description: 'Geolocation is not supported by this browser.',
      });
       getGarages('Mountain View, CA');
    }
  };
  
  const handleSelectHelper = (name: string) => {
    setHelperAssigned(true);
    toast({
      title: 'Helper Requested',
      description: `Your request has been sent to ${name}. They will be in touch shortly.`,
    });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {!helpRequested ? (
          <Card className="bg-gradient-to-br from-primary to-blue-400 text-primary-foreground">
            <CardHeader>
              <CardTitle>Having Car Trouble?</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                You're in the right place. Find volunteers and professional garages below to get the help you need.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleInitialRequest} size="lg" variant="secondary" className="text-lg font-bold">
                Request Help Now
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {helperAssigned && (
              <div className="grid md:grid-cols-1 gap-8">
                <ChatWindow />
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold mb-4 font-headline">Nearby Help</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HeartHandshake className="text-primary" /> Available Volunteers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockVolunteers.map((v) => (
                      <div key={v.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{v.name}</p>
                            <p className="text-sm text-muted-foreground">{v.distance} miles away</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {v.skills.map((s) => (
                                <Badge key={s} variant="secondary">
                                  {s}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => handleSelectHelper(v.name)} disabled={helperAssigned}>
                            Request
                          </Button>
                        </div>
                        <Separator className="my-4" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="text-primary" /> Nearby Garages
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {loadingGarages && (
                      <>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </>
                    )}
                    {!loadingGarages &&
                      garages?.garages.map((g, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{g.name}</p>
                              <p className="text-sm text-muted-foreground">{g.address}</p>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => handleSelectHelper(g.name)} disabled={helperAssigned}>
                              Request
                            </Button>
                          </div>
                          {index < (garages.garages?.length ?? 0) - 1 && <Separator className="my-4" />}
                        </div>
                      ))}
                    {!loadingGarages && garages?.garages.length === 0 && (
                      <p className="text-sm text-muted-foreground">No garages found nearby.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="lg:col-span-1">
        {helpRequested ? <StatusTracker currentStep={helperAssigned ? 1 : 0} /> : <Card className="w-full h-[400px] lg:h-full flex items-center justify-center bg-muted/50"><p className="text-muted-foreground">Your request status will appear here.</p></Card>}
      </div>
    </div>
  );
}
