import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPlaceholder } from '@/components/map-placeholder';
import { StatusTracker } from '@/components/status-tracker';
import { ChatWindow } from '@/components/chat-window';
import { Car, Fuel, Wrench, HeartHandshake } from 'lucide-react';
import { mockGarages, mockVolunteers } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function DriverDashboard() {
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
        
        <div className="grid md:grid-cols-2 gap-8">
            <StatusTracker />
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
                        {mockGarages.map(g => (
                            <div key={g.id}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">{g.name}</p>
                                        <p className="text-sm text-muted-foreground">{g.distance} miles away</p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {g.services.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline">Request</Button>
                                </div>
                                <Separator className="my-4"/>
                            </div>
                        ))}
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
