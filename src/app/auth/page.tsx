'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, Wrench, HeartHandshake, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const roleConfig = {
  driver: {
    icon: <Car className="h-6 w-6 text-primary" />,
    title: 'Driver',
    description: "Get help on the road.",
  },
  garage: {
    icon: <Wrench className="h-6 w-6 text-primary" />,
    title: 'Garage',
    description: "Find and accept jobs.",
  },
  volunteer: {
    icon: <HeartHandshake className="h-6 w-6 text-primary" />,
    title: 'Volunteer',
    description: "Lend a helping hand.",
  },
};

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get('role') || 'driver';
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { icon, title, description } = roleConfig[role as keyof typeof roleConfig] || roleConfig.driver;
  
  // This is a mock function. In a real app, this would handle Firebase auth.
  const handleAuthAction = () => {
    // For volunteers, redirect to availability form on first login.
    // We'll simulate this being a first login.
    if (role === 'volunteer') {
      router.push('/dashboard/volunteer/availability');
    } else {
      router.push(`/dashboard/${role}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
       <header className="px-4 lg:px-6 h-14 flex items-center bg-background/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b">
         <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Car className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold font-headline">RoadRemote</span>
        </Link>
       </header>
      <Tabs defaultValue="login" className="w-full max-w-md mx-4">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-2">
                {icon}
                <CardTitle className="text-2xl font-headline">
                    {title} Portal
                </CardTitle>
            </div>
            <CardDescription>{description} Sign in or create an account to continue.</CardDescription>
            <TabsList className="grid w-full grid-cols-2 mt-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            {!isClient ? (
                <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <>
                    <TabsContent value="login">
                    <div className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="email-login">Email</Label>
                        <Input id="email-login" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="password-login">Password</Label>
                        <Input id="password-login" type="password" required />
                        </div>
                        <Button onClick={handleAuthAction} className="w-full">
                        Login
                        </Button>
                    </div>
                    </TabsContent>
                    <TabsContent value="signup">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name-signup">Full Name</Label>
                            <Input id="name-signup" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="email-signup">Email</Label>
                        <Input id="email-signup" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="password-signup">Password</Label>
                        <Input id="password-signup" type="password" required />
                        </div>
                        <Button onClick={handleAuthAction} className="w-full">
                        Sign Up
                        </Button>
                    </div>
                    </TabsContent>
                </>
            )}
             <div className="mt-4 text-center text-sm">
                Change role? Go back to the{' '}
                <Link href="/" className="underline" prefetch={false}>
                    Home Page
                </Link>
             </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
