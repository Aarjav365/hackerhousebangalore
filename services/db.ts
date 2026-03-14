/**
 * SERVICE LAYER - PERSISTENCE
 * 
 * In a full cloud environment, this file would connect to PostgreSQL/MongoDB.
 * For this browser-runnable deliverable, we implement a robust persistence layer
 * using LocalStorage to ensure data survives page reloads, simulating a real database.
 */

import { User, RSVP, Question } from '../types';

const DB_KEYS = {
  USERS: 'outliers_users',
  RSVPS: 'outliers_rsvps',
  QUESTIONS: 'outliers_questions',
  SESSION: 'outliers_session_uid'
};

// Generic helper to simulate DB latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class DatabaseService {
  private getTable<T>(key: string): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private saveTable<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // --- Auth & User ---

  async createUser(name: string, email: string): Promise<User> {
    await delay(300); // Network latency simulation
    const users = this.getTable<User>(DB_KEYS.USERS);
    
    // Simple check if user exists
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) return existing;

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      role: 'attendee',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveTable(DB_KEYS.USERS, users);
    
    // Set session
    localStorage.setItem(DB_KEYS.SESSION, newUser.id);
    
    return newUser;
  }

  async getCurrentUser(): Promise<User | null> {
    const uid = localStorage.getItem(DB_KEYS.SESSION);
    if (!uid) return null;
    const users = this.getTable<User>(DB_KEYS.USERS);
    return users.find(u => u.id === uid) || null;
  }

  async logout(): Promise<void> {
    localStorage.removeItem(DB_KEYS.SESSION);
  }

  // --- RSVP ---

  async createRSVP(userId: string, linkedInUrl: string, company: string): Promise<RSVP> {
    await delay(500);
    const rsvps = this.getTable<RSVP>(DB_KEYS.RSVPS);
    
    // Upsert
    const existingIndex = rsvps.findIndex(r => r.userId === userId);
    const newRSVP: RSVP = {
      id: existingIndex > -1 ? rsvps[existingIndex].id : crypto.randomUUID(),
      userId,
      status: 'waitlist', // Default to waitlist for exclusivity
      linkedInUrl,
      company,
      timestamp: new Date().toISOString()
    };

    if (existingIndex > -1) {
      rsvps[existingIndex] = newRSVP;
    } else {
      rsvps.push(newRSVP);
    }
    
    this.saveTable(DB_KEYS.RSVPS, rsvps);
    return newRSVP;
  }

  async getRSVP(userId: string): Promise<RSVP | null> {
    const rsvps = this.getTable<RSVP>(DB_KEYS.RSVPS);
    return rsvps.find(r => r.userId === userId) || null;
  }

  // --- Questions ---

  async submitQuestion(userId: string, originalText: string, refinedText: string): Promise<Question> {
    await delay(300);
    const questions = this.getTable<Question>(DB_KEYS.QUESTIONS);
    
    const newQ: Question = {
      id: crypto.randomUUID(),
      userId,
      originalText,
      refinedText,
      isAiRefined: !!refinedText,
      timestamp: new Date().toISOString()
    };

    questions.push(newQ);
    this.saveTable(DB_KEYS.QUESTIONS, questions);
    return newQ;
  }

  async getUserQuestions(userId: string): Promise<Question[]> {
    const questions = this.getTable<Question>(DB_KEYS.QUESTIONS);
    return questions.filter(q => q.userId === userId).sort((a,b) => b.timestamp.localeCompare(a.timestamp));
  }
}

export const db = new DatabaseService();