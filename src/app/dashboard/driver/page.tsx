'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPlaceholder } from '@/components/map-placeholder';
import { ChatWindow } from '@/components/chat-window';
import { Car, Wrench, HeartHandshake } from 'lucide-react';
import { mockVolunteers } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { findGarages, FindGaragesOutput } from '@/ai/flows/find-garages-flow';
import { Skeleton } from '@/components/ui/skeleton';

export default function DriverDashboard() {
  const [garages, setGarages] = useState<FindGaragesOutput | null>(null);
  const [loadingGarages, setLoadingGarages] = useState(true);

  useEffect(() => {
    // For demo purposes, we'll use a fixed location.
    // In a real app, you would use the browser's geolocation API.
    const currentLocation = 'Mountain View, CA';

    async function getGarages() {
      try {
        setLoadingGarages(true);
        const result = await findGarages({ location: currentLocation });
        setGarages(result);
      } catch (error) {
        console.error('Error finding garages:', error);
        // Handle error state in UI if necessary
      } finally {
        setLoadingGarages(false);
      }
    }

    getGarages();
  }, []);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Card className="bg-gradient-to-br from-primary to-blue-400 text-primary-foreground">
          <CardHeader>
            <CardTitle>Need Assistance?</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Click the button below to send a help request with your current location.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" variant="secondary" className="text-lg font-bold shadow-lg hover:scale-105 transition-transform">
              <Car className="mr-2 h-5 w-5" /> Request Help
            </Button>
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-1 gap-8">
            <ChatWindow />
        </div>

        <div>
            <h2 className="text-2xl font-bold mb-4 font-headline">Nearby Help</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><HeartHandshake className="text-primary"/> Available Volunteers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mockVolunteers.map(v => (
                            <div key={v.id}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">{v.name}</p>
                                        <p className="text-sm text-muted-foreground">{v.distance} miles away</p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {v.skills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline">Request</Button>
                                </div>
                                <Separator className="my-4"/>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Wrench className="text-primary"/> Nearby Garages</CardTitle>
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
                        {!loadingGarages && garages?.garages.map((g, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">{g.name}</p>
                                        <p className="text-sm text-muted-foreground">{g.address}</p>
                                    </div>
                                    <Button size="sm" variant="outline">Request</Button>
                                </div>
                                {index < garages.garages.length - 1 && <Separator className="my-4"/>}
                            </div>
                        ))}
                         {!loadingGarages && garages?.garages.length === 0 && (
                            <p className="text-sm text-muted-foreground">No garages found nearby.</p>
                         )}
                    </CardContent>
                </Card>
            </div>
        </div>

      </div>
      <div className="lg:col-span-1">
        <MapPlaceholder />
      </div>
    </div>
  );
}
