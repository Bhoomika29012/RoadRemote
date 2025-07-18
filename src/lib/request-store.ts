import { create } from 'zustand';
import type { HelpRequest } from './data';
import { mockHelpRequests } from './data';

// This is a simple in-memory store to simulate a backend/database.
// It allows different components (Driver, Garage dashboards) to share and react to state changes.

type RequestState = {
  requests: HelpRequest[];
  addRequest: (request: Omit<HelpRequest, 'id' | 'timestamp' | 'status'>) => void;
  updateRequestStatus: (id: string, status: HelpRequest['status']) => void;
  getRequestById: (id: string) => HelpRequest | undefined;
};

export const useRequestStore = create<RequestState>((set, get) => ({
  // Initialize with some mock data, but filter out any not in 'Pending' state to start clean.
  requests: mockHelpRequests.filter(r => r.status === 'Pending'),
  
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
  }
}));
