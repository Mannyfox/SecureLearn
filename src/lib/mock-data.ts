import { addYears, subDays } from "date-fns";
import type { User, Module, Question, UserProgress, Certificate } from './types';

// USERS
export const regularUser: User = {
  id: 'user123',
  name: 'Alex Müller',
  email: 'alex.muller@apfelkiste.ch',
  department: 'Sales',
  role: 'user',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100'
};

export const adminUser: User = {
  id: 'admin456',
  name: 'Samira Keller',
  email: 'samira.keller@apfelkiste.ch',
  role: 'admin',
  department: 'Engineering',
  avatarUrl: 'https://picsum.photos/seed/user2/100/100'
};

export const otherUsers: User[] = [
  { id: 'user001', name: 'Peter Meier', email: 'peter.m@apfelkiste.ch', department: 'Engineering', role: 'user' },
  { id: 'user002', name: 'Anna Freud', email: 'anna.f@apfelkiste.ch', department: 'Marketing', role: 'user' },
  { id: 'user003', name: 'Tom Schmidt', email: 'tom.s@apfelkiste.ch', department: 'Sales', role: 'user' },
  { id: 'user004', name: 'Maria Garcia', email: 'maria.g@apfelkiste.ch', department: 'HR', role: 'user' },
  { id: 'user005', name: 'Jonas Weber', email: 'jonas.w@apfelkiste.ch', department: 'Engineering', role: 'user' },
];

// QUESTIONS
const phishingQuestions: Question[] = [
  { id: 'q1', questionText: 'Was ist ein häufiges Anzeichen für eine Phishing-E-Mail?', options: ['Eine generische Begrüßung wie "Sehr geehrter Kunde"', 'Eine E-Mail von Ihrem Chef', 'Eine Aufforderung, Ihr Passwort zurückzusetzen'], correctAnswerIndex: 0, explanation: 'Phishing-E-Mails verwenden oft generische Begrüßungen, da sie an viele Personen gleichzeitig gesendet werden.' },
  { id: 'q2', questionText: 'Was sollten Sie tun, wenn Sie eine verdächtige E-Mail mit einem Link erhalten?', options: ['Auf den Link klicken, um zu sehen, wohin er führt', 'Die E-Mail löschen und nichts tun', 'Nicht auf den Link klicken und ihn der IT-Abteilung melden'], correctAnswerIndex: 2, explanation: 'Klicken Sie niemals auf Links in verdächtigen E-Mails. Melden Sie diese immer Ihrer IT-Abteilung zur Untersuchung.' },
];

const passwordQuestions: Question[] = [
  { id: 'q3', questionText: 'Was ist die beste Methode, um ein starkes Passwort zu erstellen?', options: ['Den Namen Ihres Haustiers verwenden', 'Eine lange Phrase mit einer Mischung aus Zeichen, Zahlen und Symbolen', 'Ein kurzes, leicht zu merkendes Wort'], correctAnswerIndex: 1, explanation: 'Starke Passwörter sind lang und komplex, was es schwieriger macht, sie zu erraten oder zu knacken.' },
  { id: 'q4', questionText: 'Wie oft sollten Sie idealerweise Ihr Hauptarbeitspasswort ändern?', options: ['Niemals', 'Alle 90 Tage', 'Jeden Tag'], correctAnswerIndex: 1, explanation: 'Regelmäßiges Ändern von Passwörtern minimiert das Risiko, falls Ihr Passwort jemals kompromittiert wird.' },
];

// MODULES
export const mockModules: Module[] = [
  { id: 'phishing-awareness', title: 'Phishing-Bewusstsein', description: 'Lernen Sie, Phishing-Angriffe zu erkennen und zu vermeiden.', questions: phishingQuestions },
  { id: 'password-security', title: 'Passwortsicherheit', description: 'Meistern Sie die Kunst, starke Passwörter zu erstellen und zu verwalten.', questions: passwordQuestions },
  { id: 'data-protection', title: 'Grundlagen des Datenschutzes', description: 'Verstehen Sie Ihre Rolle beim Schutz von Unternehmens- und Kundendaten.', questions: phishingQuestions }, // Re-using for demo
  { id: 'social-engineering', title: 'Social Engineering', description: 'Erkennen und verteidigen Sie sich gegen manipulative Taktiken.', questions: passwordQuestions }, // Re-using for demo
  { id: 'physical-security', title: 'Physische Sicherheit', description: 'Best Practices zur Sicherung Ihres Arbeitsplatzes und Ihrer Geräte.', questions: phishingQuestions }, // Re-using for demo
  { id: 'incident-response', title: 'Reaktion auf Vorfälle', description: 'Wissen, was bei einem Sicherheitsvorfall zu tun ist.', questions: passwordQuestions }, // Re-using for demo
];

// USER PROGRESS
export const mockUserProgress: UserProgress[] = [
  // Alex Müller's progress
  { userId: 'user123', moduleId: 'phishing-awareness', status: 'Completed', score: 100, completedAt: new Date('2023-10-26') },
  { userId: 'user123', moduleId: 'password-security', status: 'In Progress', score: 50, },
  { userId: 'user123', moduleId: 'data-protection', status: 'Not Started', score: 0 },
  { userId: 'user123', moduleId: 'social-engineering', status: 'Retake Required', score: 40 },
  { userId: 'user123', moduleId: 'physical-security', status: 'Not Started', score: 0 },
  { userId: 'user123', moduleId: 'incident-response', status: 'Not Started', score: 0 },

  // Progress for other users for the admin dashboard
  { userId: 'user001', moduleId: 'phishing-awareness', status: 'Completed', score: 100, completedAt: new Date('2024-01-15') },
  { userId: 'user001', moduleId: 'password-security', status: 'Completed', score: 100, completedAt: new Date('2024-01-20') },
  { userId: 'user002', moduleId: 'phishing-awareness', status: 'Completed', score: 100, completedAt: new Date('2024-02-01') },
  { userId: 'user002', moduleId: 'password-security', status: 'In Progress', score: 50 },
  { userId: 'user003', moduleId: 'phishing-awareness', status: 'Retake Required', score: 0 },
  { userId: 'user004', moduleId: 'phishing-awareness', status: 'Completed', score: 100, completedAt: new Date('2024-03-10') },
  { userId: 'user004', moduleId: 'password-security', status: 'Completed', score: 100, completedAt: new Date('2024-03-11') },
  { userId: 'user004', moduleId: 'data-protection', status: 'Completed', score: 100, completedAt: new Date('2024-03-12') },
  { userId: 'user004', moduleId: 'social-engineering', status: 'Completed', score: 100, completedAt: new Date('2024-03-13') },
  { userId: 'user004', moduleId: 'physical-security', status: 'Completed', score: 100, completedAt: new Date('2024-03-14') },
  { userId: 'user004', moduleId: 'incident-response', status: 'Completed', score: 100, completedAt: new Date('2024-03-15') },
  { userId: 'user005', moduleId: 'phishing-awareness', status: 'Not Started', score: 0 },
];


// CERTIFICATES
const lastYear = subDays(new Date(), 370);
export const expiredCertificate: Certificate = {
    id: 'cert-expired-abc',
    userId: 'user123',
    issuedAt: lastYear,
    expiresAt: addYears(lastYear, 1),
}

const today = new Date();
export const validCertificate: Certificate = {
    id: 'cert-valid-xyz',
    userId: 'admin456',
    issuedAt: today,
    expiresAt: addYears(today, 1),
}
