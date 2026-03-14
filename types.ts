export interface User {
  id: string;
  name: string;
  email: string;
  role: 'attendee' | 'admin';
  createdAt: string;
}

export interface RSVP {
  id: string;
  userId: string;
  status: 'confirmed' | 'waitlist' | 'cancelled';
  linkedInUrl?: string;
  company?: string;
  timestamp: string;
}

export interface Question {
  id: string;
  userId: string;
  originalText: string;
  refinedText?: string;
  isAiRefined: boolean;
  timestamp: string;
}

export interface AppState {
  currentUser: User | null;
  hasRsvped: boolean;
}