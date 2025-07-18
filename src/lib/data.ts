export interface HelpRequest {
  id: string;
  driverName: string;
  vehicle: string;
  location: string;
  issue: string;
  status: 'Pending' | 'Accepted' | 'In-Progress' | 'Completed';
  timestamp: string;
  distance: number;
}

export interface Volunteer {
  id: string;
  name: string;
  skills: string[];
  tools: string[];
  distance: number;
}

export interface Garage {
  id:string;
  name: string;
  services: string[];
  distance: number;
}

export const mockHelpRequests: HelpRequest[] = [
  {
    id: 'req-001',
    driverName: 'Alice Johnson',
    vehicle: 'Toyota Camry',
    location: 'I-95, Exit 4B',
    issue: 'Flat Tire',
    status: 'Pending',
    timestamp: '5m ago',
    distance: 2.5
  },
  {
    id: 'req-002',
    driverName: 'Bob Williams',
    vehicle: 'Ford F-150',
    location: 'Main St & 1st Ave',
    issue: 'Dead Battery',
    status: 'Pending',
    timestamp: '12m ago',
    distance: 4.1,
  },
  {
    id: 'req-003',
    driverName: 'Charlie Brown',
    vehicle: 'Honda Civic',
    location: 'Near Central Park',
    issue: 'Out of Gas',
    status: 'Accepted',
    timestamp: '25m ago',
    distance: 7.8
  },
];

export const mockVolunteers: Volunteer[] = [
    { id: 'vol-1', name: 'John D.', skills: ['Tire Change', 'Jump Start'], tools: ['Jack', 'Jumper Cables'], distance: 1.5 },
    { id: 'vol-2', name: 'Sarah P.', skills: ['Fuel Delivery'], tools: ['Gas Can'], distance: 3.2 },
];

export const mockGarages: Garage[] = [
    { id: 'gar-1', name: 'City Auto Repair', services: ['Towing', 'Engine Diagnostics'], distance: 5.5 },
    { id: 'gar-2', name: 'Express Mechanics', services: ['Tire Repair', 'Battery Replacement'], distance: 6.1 },
];
