import type { Timestamp } from "firebase/firestore";

export interface User {
  id: string;
  name: string;
  email: string;
  department: 'Sales' | 'Engineering' | 'Marketing' | 'HR' | 'Vertrieb' | 'Technik' | 'Personal';
  role: 'user' | 'admin';
  avatarUrl?: string;
  createdAt?: Timestamp;
}

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  questions: Question[];
}

export interface UserProgress {
  userId: string;
  moduleId: string;
  status: 'Nicht begonnen' | 'In Bearbeitung' | 'Abgeschlossen' | 'Wiederholung erforderlich';
  score: number; // Percentage
  completedAt?: Timestamp;
}

export interface Certificate {
  id: string;
  userId: string;
  issuedAt: Timestamp;
  expiresAt: Timestamp;
}
