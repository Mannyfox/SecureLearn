export interface User {
  id: string;
  name: string;
  email: string;
  department: 'Sales' | 'Engineering' | 'Marketing' | 'HR' | 'Vertrieb' | 'Technik' | 'Personal';
  role: 'user' | 'admin';
  avatarUrl?: string;
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
  questions: Question[];
}

export interface UserProgress {
  userId: string;
  moduleId: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Retake Required' | 'Nicht begonnen' | 'In Bearbeitung' | 'Abgeschlossen' | 'Wiederholung erforderlich';
  score: number; // Percentage
  completedAt?: Date;
}

export interface Certificate {
  id: string;
  userId: string;
  issuedAt: Date;
  expiresAt: Date;
}
