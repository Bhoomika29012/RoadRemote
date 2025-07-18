import { create } from 'zustand';
import type { HelpRequest, Volunteer } from './data';
import { mockHelpRequests, mockVolunteers } from './data';

// This is a simple in-memory store to simulate a backend/database.
// It allows different components (Driver, Garage, Volunteer dashboards) to share and react to state changes.

type AppState = {
  requests: HelpRequest[];
  volunteers: Volunteer[];
  addRequest: (request: Omit<HelpRequest, 'id' | 'timestamp' | 'status'>) => void;
  updateRequestStatus: (id: string, status: HelpRequest['status']) => void;
  getRequestById: (id: string) => HelpRequest | undefined;
  updateVolunteer: (id: string, data: Partial<Omit<Volunteer, 'id'>>) => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  requests: mockHelpRequests.filter(r => r.status === 'Pending'),
  volunteers: mockVolunteers,
  
  addRequest: (request) => {
    const newRequest: HelpRequest = {
      ...request,
      id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: 'Just now',
      status: 'Pending',
    };
    set((state) => ({ requests: [newRequest, ...state.requests] }));
  },

  updateRequestStatus: (id, status) => {
    set((state) => ({
      requests: state.requests.map((req) =>
        req.id === id ? { ...req, status } : req
      ),
    }));
  },

  getRequestById: (id) => {
    return get().requests.find(req => req.id === id);
  },

  updateVolunteer: (id, data) => {
    set((state) => ({
      volunteers: state.volunteers.map((vol) =>
        vol.id === id ? { ...vol, ...data } : vol
      ),
    }));
  },
}));
