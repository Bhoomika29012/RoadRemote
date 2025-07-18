'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { mockHelpRequests, type HelpRequest } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function VolunteerDashboard() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<HelpRequest[]>(mockHelpRequests);
  const [acceptedJobId, setAcceptedJobId] = useState<string | null>(null);

  const handleAccept = (id: string, driverName: string) => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === id ? { ...req, status: 'Accepted' } : req
      )
    );
    setAcceptedJobId(id);
    toast({
      title: (
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <span>Request Accepted!</span>
        </div>
      ),
      description: `You are now assigned to help ${driverName}. The driver has been notified.`,
      variant: 'default',
    });
  };

  const getStatusBadge = (status: HelpRequest['status']) => {
    switch(status) {
        case 'Pending':
            return <Badge variant="destructive">{status}</Badge>;
        case 'Accepted':
            return <Badge variant="success">{status}</Badge>;
        default:
            return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-8">
      <Alert>
        <AlertTitle>Welcome, Volunteer!</AlertTitle>
        <AlertDescription>
            Your availability and skills are not set up. Please{' '}
            <Link href="/dashboard/volunteer/availability" className="font-semibold underline">complete your profile</Link>
            {' '}to start receiving help requests.
        </AlertDescription>
      </Alert>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Availability Status</CardTitle>
            <CardDescription>Toggle to start or stop receiving new requests.</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="availability-mode" defaultChecked/>
            <label htmlFor="availability-mode" className="font-medium">Available</label>
          </div>
        </CardHeader>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4 font-headline">Nearby Help Requests</h2>
        <div className="space-y-4">
          {requests.map((req) => (
            <Card key={req.id}>
              <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <CardTitle>{req.issue}</CardTitle>
                    <CardDescription>{req.driverName} - {req.vehicle}</CardDescription>
                  </div>
                   {getStatusBadge(req.status)}
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1.5" />
                  <span>{req.location} ({req.distance} miles away)</span>
                </div>
                <Separator className="my-4"/>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">{req.timestamp}</p>
                    <Button 
                      onClick={() => handleAccept(req.id, req.driverName)}
                      disabled={req.status !== 'Pending' || (acceptedJobId !== null && acceptedJobId !== req.id)}
                    >
                      {req.status === 'Accepted' ? 'Accepted' : 'Accept Request'}
                    </Button>
                </div>
              </CardContent>
            </Card>
          ))}
           {requests.filter(req => req.status === 'Pending').length === 0 && (
             <Card className="text-center p-8">
                <p className="text-muted-foreground">No active requests in your area. Check back soon!</p>
             </Card>
           )}
        </div>
      </div>
    </div>
  );
}
