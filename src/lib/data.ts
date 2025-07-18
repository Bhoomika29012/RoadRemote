export interface HelpRequest {
  id: string;
  driverName: string;
  vehicle: string;
  location: string;
  issue: string;
  status: 'Pending' | 'Accepted' | 'Confirmed' | 'In-Progress' | 'Completed';
  timestamp: string;
  distance: number;
  // New fields to link request to a helper
  helperId?: string;
  helperName?: string;
  helperType?: 'garage' | 'volunteer';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Volunteer {
  id: string;
  name: string;
  skills: string[];
  tools: string[];
  distance: number;
  points: number;
  badges: Badge[];
}

export interface Garage {
  id:string;
  name: string;
  services: string[];
  distance: number;
}

import { Shield, Star, Trophy } from 'lucide-react';

export const mockBadges: Badge[] = [
    { id: 'badge-1', name: 'First Responder', description: 'Completed your first request.', icon: Shield },
    { id: 'badge-2', name: 'Good Samaritan', description: 'Completed 5 requests.', icon: Star },
    { id: 'badge-3', name: 'Roadside Hero', description: 'Completed 10 requests.', icon: Trophy },
];


export const mockHelpRequests: HelpRequest[] = [
  // This is now just initial data, the store will manage the live requests.
  // We start with an empty list for the garage and let the driver create them.
];

export const mockVolunteers: Volunteer[] = [
    { 
        id: 'vol-1', 
        name: 'John D.', 
        skills: ['Tire Change', 'Jump Start'], 
        tools: ['Jack', 'Jumper Cables'], 
        distance: 1.5,
        points: 150,
        badges: [mockBadges[0], mockBadges[1]],
    },
    { 
        id: 'vol-2', 
        name: 'Sarah P.', 
        skills: ['Fuel Delivery'], 
        tools: ['Gas Can'], 
        distance: 3.2,
        points: 50,
        badges: [mockBadges[0]],
    },
];

export const mockGarages: Garage[] = [
    { id: 'gar-1', name: 'City Auto Repair', services: ['Towing', 'Engine Diagnostics'], distance: 5.5 },
    { id: 'gar-2', name: 'Express Mechanics', services: ['Tire Repair', 'Battery Replacement'], distance: 6.1 },
];
