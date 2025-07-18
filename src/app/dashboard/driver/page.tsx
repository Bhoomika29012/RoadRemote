'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatWindow } from '@/components/chat-window';
import { HeartHandshake, Wrench } from 'lucide-react';
import { Garage } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect, useMemo } from 'react';
import { useAppStore } from '@/lib/request-store';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { StatusTracker } from '@/components/status-tracker';
import { AiChatbot } from '@/components/ai-chatbot';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { findGarages } from '@/ai/flows/find-garages-flow';

export default function DriverDashboard() {
  const [loadingGarages, setLoadingGarages] = useState(false);
  const [garages, setGarages] = useState<Garage[]>([]);
  const [helpRequested, setHelpRequested] = useState(false);
  const [helperAssigned, setHelperAssigned] = useState<{ id: string; name: string, type: 'garage' | 'volunteer' } | null>(null);
  const [serviceCompleted, setServiceCompleted] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // Zustand store for requests and volunteers
  const { addRequest, requests, volunteers } = useAppStore();

  const { toast } = useToast();

  const handleInitialRequest = () => {
    setLoadingGarages(true);
    setHelpRequested(true);
    toast({
        title: 'Getting your location...',
        description: 'Please allow location access to find help.',
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        toast({
          title: 'Location Found!',
          description: 'Searching for nearby garages...',
        });
        try {
          const result = await findGarages({ location: `${latitude}, ${longitude}` });
          // Ensure garages have a unique ID for key prop and request tracking
          const garagesWithIds = result.garages.map((g, i) => ({ ...g, id: `gar-${i}`, distance: Math.random() * 10 }));
          setGarages(garagesWithIds);
        } catch (error) {
          console.error('Error fetching garages:', error);
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not fetch nearby garages. Please try again.',
          });
        } finally {
          setLoadingGarages(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast({
          variant: 'destructive',
          title: 'Location Error',
          description: 'Could not get your location. Please enable location services and try again.',
        });
        setLoadingGarages(false);
        setHelpRequested(false); // Go back to initial state
      }
    );
  };


  const handleRequestHelp = (id: string, name: string, type: 'garage' | 'volunteer') => {
    const commonRequestData = {
        driverName: 'Current User', // Placeholder name
        vehicle: 'Tesla Model Y', // Placeholder vehicle
        location: 'Main St & 1st Ave', // Placeholder issue
        issue: 'Flat Tire', // Placeholder issue
        helperId: id,
        helperName: name,
    };
    
    if (type === 'garage') {
      const garage = garages.find(g => g.id === id);
      if (garage) {
        addRequest({
          ...commonRequestData,
          distance: garage.distance,
          helperType: 'garage'
        });
      }
    } else {
        const volunteer = volunteers.find(v => v.id === id);
        if (volunteer) {
            addRequest({
                ...commonRequestData,
                distance: volunteer.distance,
                helperType: 'volunteer'
            });
        }
    }

    toast({
        title: 'Request Sent',
        description: `Your request has been sent to ${name}. Waiting for them to accept.`,
    });
  };

  const handleConfirmHelper = (id: string, name: string, type: 'garage' | 'volunteer') => {
    setHelperAssigned({ id, name, type });
    // Find the request associated with this helper and mark it as Confirmed
    const request = requests.find(r => r.helperId === id && r.status === 'Accepted');
    if(request) {
      useAppStore.getState().updateRequestStatus(request.id, 'Confirmed');
    }

    toast({
      title: 'Helper Confirmed!',
      description: `You are now connected with ${name}. They will be in touch shortly.`,
    });
    
    // Simulate service completion
    setTimeout(() => {
        setServiceCompleted(true);
    }, 10000); // 10 seconds for demo
  };
  
  const handleRatingSubmit = () => {
    setRatingSubmitted(true);
     toast({
      title: 'Rating Submitted!',
      description: `Thank you for rating ${helperAssigned?.name}.`,
    });
  }

  // Memoize button components to avoid re-renders
  const GarageButtons = useMemo(() => {
    return garages.map((g, index) => {
        const request = requests.find(r => r.helperId === g.id);
        let status: 'idle' | 'Pending' | 'Accepted' | 'Confirmed' = 'idle';
        if (request) {
            status = request.status as any; // Cast for simplicity, handle other statuses if needed
        }

        if (helperAssigned && helperAssigned.id !== g.id) {
            return <Button key={g.id} size="sm" variant="outline" disabled>Unavailable</Button>;
        }
        if (helperAssigned && helperAssigned.id === g.id) {
            return <Button key={g.id} size="sm" variant="success" disabled>Confirmed</Button>;
        }

        switch (status) {
            case 'idle':
                return <Button key={g.id} size="sm" variant="outline" onClick={() => handleRequestHelp(g.id, g.name, 'garage')}>Request</Button>;
            case 'Pending':
                return <Button key={g.id} size="sm" variant="outline" disabled>Requested...</Button>;
            case 'Accepted':
                return <Button key={g.id} size="sm" onClick={() => handleConfirmHelper(g.id, g.name, 'garage')}>Confirm</Button>;
            case 'Confirmed':
                return <Button key={g.id} size="sm" variant="success" disabled>Confirmed</Button>;
            default:
                return null;
        }
    });
  }, [requests, helperAssigned, garages]);
  
  const VolunteerButtons = useMemo(() => {
    return volunteers.map((v, index) => {
        const request = requests.find(r => r.helperId === v.id);
        let status: 'idle' | 'Pending' | 'Accepted' | 'Confirmed' = 'idle';
        if (request) {
            status = request.status as any;
        }

        if (helperAssigned && helperAssigned.id !== v.id) {
            return <Button key={v.id} size="sm" variant="outline" disabled>Unavailable</Button>;
        }
        if (helperAssigned && helperAssigned.id === v.id) {
            return <Button key={v.id} size="sm" variant="success" disabled>Confirmed</Button>;
        }

        switch (status) {
            case 'idle':
                return <Button key={v.id} size="sm" variant="outline" onClick={() => handleRequestHelp(v.id, v.name, 'volunteer')}>Request</Button>;
            case 'Pending':
                return <Button key={v.id} size="sm" variant="outline" disabled>Requested...</Button>;
            case 'Accepted':
                return <Button key={v.id} size="sm" onClick={() => handleConfirmHelper(v.id, v.name, 'volunteer')}>Confirm</Button>;
            case 'Confirmed':
                return <Button key={v.id} size="sm" variant="success" disabled>Confirmed</Button>;
            default:
                return null;
        }
    });
  }, [requests, helperAssigned, volunteers]);


  const getStatusStep = () => {
    if (ratingSubmitted) return 6;
    if (serviceCompleted) return 5;
    if (helperAssigned) return 3;
    if (requests.some(r => r.status === 'Pending' || r.status === 'Accepted')) return 2;
    if (helpRequested) return 1;
    return 0;
  }

  if (!helpRequested) {
    return (
        <Card className="bg-gradient-to-br from-primary to-blue-400 text-primary-foreground w-full">
            <CardHeader>
                <CardTitle>Having Car Trouble?</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                You're in the right place. Click below to find nearby help or ask our AI for guidance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleInitialRequest} size="lg" variant="secondary" className="text-lg font-bold">
                    Request Roadside Assistance
                </Button>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Tabs defaultValue="find-help">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="find-help">Find Help</TabsTrigger>
            <TabsTrigger value="ai-chat">AI Assistant</TabsTrigger>
          </TabsList>
          <TabsContent value="find-help">
             {helperAssigned && !serviceCompleted && (
                <div className="my-6">
                    <ChatWindow />
                </div>
              )}
             <div>
              <h2 className="text-2xl font-bold mb-4 font-headline mt-6">Nearby Help</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HeartHandshake className="text-primary" /> Available Volunteers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {volunteers.map((v, index) => (
                      <div key={v.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{v.name}</p>
                            <p className="text-sm text-muted-foreground">{v.distance.toFixed(1)} miles away</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {v.skills.map((s) => (
                                <Badge key={s} variant="secondary">
                                  {s}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {VolunteerButtons[index]}
                        </div>
                         {index < volunteers.length - 1 && <Separator className="my-4" />}
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
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                          </div>
                           <Skeleton className="h-8 w-20" />
                        </div>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between">
                           <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                          </div>
                           <Skeleton className="h-8 w-20" />
                        </div>
                      </>
                    )}
                    {!loadingGarages && garages.length === 0 && (
                        <p className="text-muted-foreground text-center">No garages found nearby.</p>
                    )}
                    {!loadingGarages &&
                      garages.map((g, index) => (
                        <div key={g.id}>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{g.name}</p>
                              <p className="text-sm text-muted-foreground">{g.address}</p>
                            </div>
                            {GarageButtons[index]}
                          </div>
                          {index < garages.length - 1 && <Separator className="my-4" />}
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="ai-chat">
            <AiChatbot />
          </TabsContent>
        </Tabs>
      </div>
      <div className="lg:col-span-1">
        <StatusTracker 
            currentStep={getStatusStep()} 
            helperName={helperAssigned?.name}
            onRateHelper={handleRatingSubmit}
            serviceCompleted={serviceCompleted}
            ratingSubmitted={ratingSubmitted}
        />
      </div>
    </div>
  );
}
