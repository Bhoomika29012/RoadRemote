'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatWindow } from '@/components/chat-window';
import { HeartHandshake, Wrench } from 'lucide-react';
import { mockVolunteers, mockGarages } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect, useMemo } from 'react';
import { useRequestStore } from '@/lib/request-store';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { StatusTracker } from '@/components/status-tracker';
import { AiChatbot } from '@/components/ai-chatbot';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DriverDashboard() {
  const [loadingGarages, setLoadingGarages] = useState(false);
  const [helpRequested, setHelpRequested] = useState(false);
  const [helperAssigned, setHelperAssigned] = useState<{ id: string; name: string, type: 'garage' | 'volunteer' } | null>(null);
  const [serviceCompleted, setServiceCompleted] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // Zustand store for requests
  const { addRequest, requests } = useRequestStore();

  const { toast } = useToast();

  const handleInitialRequest = () => {
    setHelpRequested(true);
    // In a real app, you might fetch garages here, but for now, we just show them.
    toast({
        title: 'Request Sent',
        description: 'Finding nearby help for you.',
    });
  };

  const handleRequestHelp = (id: string, name: string, type: 'garage' | 'volunteer') => {
    if (type === 'garage') {
      const garage = mockGarages.find(g => g.id === id);
      if (garage) {
        // Add request to the shared store
        addRequest({
          driverName: 'Current User', // Placeholder name
          vehicle: 'Tesla Model Y', // Placeholder vehicle
          location: 'Main St & 1st Ave', // Placeholder issue
          issue: 'Flat Tire', // Placeholder issue
          distance: garage.distance,
          helperId: garage.id,
          helperName: garage.name,
          helperType: 'garage'
        });

        toast({
          title: 'Request Sent',
          description: `Your request has been sent to ${name}. Waiting for them to accept.`,
        });
      }
    } else {
        // Volunteer logic can be added here similarly
        toast({
          title: 'Request Sent',
          description: `Your request has been sent to ${name}.`,
        });
    }
  };

  const handleConfirmHelper = (id: string, name: string, type: 'garage' | 'volunteer') => {
    setHelperAssigned({ id, name, type });
    // Find the request associated with this helper and mark it as Confirmed
    const request = requests.find(r => r.helperId === id && r.status === 'Accepted');
    if(request) {
      useRequestStore.getState().updateRequestStatus(request.id, 'Confirmed');
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
    return mockGarages.map((g, index) => {
        const request = requests.find(r => r.helperId === g.id);
        let status: 'idle' | 'Pending' | 'Accepted' | 'Confirmed' = 'idle';
        if (request) {
            status = request.status;
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
  }, [requests, helperAssigned]);


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
                          {/* Placeholder for volunteer buttons for now */}
                          <Button size="sm" variant="outline">Request</Button>
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
                      </>
                    )}
                    {!loadingGarages &&
                      mockGarages.map((g, index) => (
                        <div key={g.id}>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{g.name}</p>
                              <p className="text-sm text-muted-foreground">{g.distance} miles away</p>
                            </div>
                            {GarageButtons[index]}
                          </div>
                          {index < mockGarages.length - 1 && <Separator className="my-4" />}
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
