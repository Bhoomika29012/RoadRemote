'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatWindow } from '@/components/chat-window';
import { HeartHandshake, Wrench, Bot } from 'lucide-react';
import { mockVolunteers } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { findGarages, FindGaragesOutput } from '@/ai/flows/find-garages-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { StatusTracker } from '@/components/status-tracker';
import { AiChatbot } from '@/components/ai-chatbot';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type RequestStatus = 'idle' | 'requested' | 'available' | 'confirmed';

export default function DriverDashboard() {
  const [garages, setGarages] = useState<FindGaragesOutput | null>(null);
  const [loadingGarages, setLoadingGarages] = useState(false);
  const [helpRequested, setHelpRequested] = useState(false);
  const [helperAssigned, setHelperAssigned] = useState<{ id: string; name: string } | null>(null);
  const [requestStatuses, setRequestStatuses] = useState<Record<string, RequestStatus>>({});
  const [serviceCompleted, setServiceCompleted] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const { toast } = useToast();

  const fetchGarages = () => {
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
  }

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
    fetchGarages();
    toast({
        title: 'Request Sent',
        description: 'Finding nearby help for you.',
    });
  };

  const handleRequestHelp = (id: string, name: string) => {
    setRequestStatuses(prev => ({ ...prev, [id]: 'requested' }));
    toast({
      title: 'Request Sent',
      description: `Your request has been sent to ${name}.`,
    });

    // Simulate helper becoming available
    const delay = Math.random() * (7000 - 3000) + 3000;
    setTimeout(() => {
      // Only set to available if no one else has been confirmed
      if (!helperAssigned) {
         setRequestStatuses(prev => ({ ...prev, [id]: 'available' }));
      }
    }, delay);
  };

  const handleConfirmHelper = (id: string, name: string) => {
    setHelperAssigned({ id, name });
    setRequestStatuses(prev => ({ ...prev, [id]: 'confirmed' }));
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

  const getButton = (id: string, name: string) => {
    const status = requestStatuses[id] || 'idle';
    
    if (helperAssigned && helperAssigned.id !== id) {
       return <Button size="sm" variant="outline" disabled>Unavailable</Button>;
    }

    switch (status) {
      case 'idle':
        return <Button size="sm" variant="outline" onClick={() => handleRequestHelp(id, name)}>Request</Button>;
      case 'requested':
        return <Button size="sm" variant="outline" disabled>Requested...</Button>;
      case 'available':
        return <Button size="sm" onClick={() => handleConfirmHelper(id, name)}>Accept</Button>;
      case 'confirmed':
        return <Button size="sm" variant="success" disabled>Confirmed</Button>;
      default:
        return null;
    }
  };

  const getStatusStep = () => {
    if (ratingSubmitted) return 6;
    if (serviceCompleted) return 5;
    if (helperAssigned) return 3; // Covers assigned and on the way
    if (helpRequested) return 2;
    return 1;
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
                         {getButton(v.id, v.name)}
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
                            {getButton(`garage-${index}`, g.name)}
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
