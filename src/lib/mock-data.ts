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
  { id: 'q1', questionText: 'Which of these is a common sign of a phishing email?', options: ['A generic greeting like "Dear Customer"', 'An email from your boss', 'A request to reset your password'], correctAnswerIndex: 0, explanation: 'Phishing emails often use generic greetings because they are sent to many people at once.' },
  { id: 'q2', questionText: 'What should you do if you receive a suspicious email with a link?', options: ['Click the link to see where it goes', 'Delete the email and do nothing', 'Do not click the link and report it to IT'], correctAnswerIndex: 2, explanation: 'Never click links in suspicious emails. Always report them to your IT department for investigation.' },
];

const passwordQuestions: Question[] = [
  { id: 'q3', questionText: 'What is the best practice for creating a strong password?', options: ['Using your pet\'s name', 'A long phrase with a mix of characters, numbers, and symbols', 'A short, easy-to-remember word'], correctAnswerIndex: 1, explanation: 'Strong passwords are long and complex, making them harder to guess or crack.' },
  { id: 'q4', questionText: 'How often should you ideally change your main work password?', options: ['Never', 'Every 90 days', 'Every day'], correctAnswerIndex: 1, explanation: 'Regularly changing passwords minimizes the risk if your password is ever compromised.' },
];

// MODULES
export const mockModules: Module[] = [
  { id: 'phishing-awareness', title: 'Phishing Awareness', description: 'Learn to identify and avoid phishing attacks.', questions: phishingQuestions },
  { id: 'password-security', title: 'Password Security', description: 'Master the art of creating and managing strong passwords.', questions: passwordQuestions },
  { id: 'data-protection', title: 'Data Protection Basics', description: 'Understand your role in protecting company and customer data.', questions: phishingQuestions }, // Re-using for demo
  { id: 'social-engineering', title: 'Social Engineering', description: 'Recognize and defend against manipulative tactics.', questions: passwordQuestions }, // Re-using for demo
  { id: 'physical-security', title: 'Physical Security', description: 'Best practices for securing your workspace and devices.', questions: phishingQuestions }, // Re-using for demo
  { id: 'incident-response', title: 'Incident Response', description: 'Know what to do when a security incident occurs.', questions: passwordQuestions }, // Re-using for demo
];

// USER PROGRESS
export const mockUserProgress: UserProgress[] = [
  // Alex Müller's progress
  { userId: 'user123', moduleId: 'phishing-awareness', status: 'Completed', score: 100, completedAt: new Date() },
  { userId: 'user123', moduleId: 'password-security', status: 'In Progress', score: 50, },
  { userId: 'user123', moduleId: 'data-protection', status: 'Not Started', score: 0 },
  { userId: 'user123', moduleId: 'social-engineering', status: 'Retake Required', score: 40 },
  { userId: 'user123', moduleId: 'physical-security', status: 'Not Started', score: 0 },
  { userId: 'user123', moduleId: 'incident-response', status: 'Not Started', score: 0 },

  // Progress for other users for the admin dashboard
  { userId: 'user001', moduleId: 'phishing-awareness', status: 'Completed', score: 100 },
  { userId: 'user001', moduleId: 'password-security', status: 'Completed', score: 100 },
  { userId: 'user002', moduleId: 'phishing-awareness', status: 'Completed', score: 100 },
  { userId: 'user002', moduleId: 'password-security', status: 'In Progress', score: 50 },
  { userId: 'user003', moduleId: 'phishing-awareness', status: 'Retake Required', score: 0 },
  { userId: 'user004', moduleId: 'phishing-awareness', status: 'Completed', score: 100 },
  { userId: 'user004', moduleId: 'password-security', status: 'Completed', score: 100 },
  { userId: 'user004', moduleId: 'data-protection', status: 'Completed', score: 100 },
  { userId: 'user004', moduleId: 'social-engineering', status: 'Completed', score: 100 },
  { userId: 'user004', moduleId: 'physical-security', status: 'Completed', score: 100 },
  { userId: 'user004', moduleId: 'incident-response', status: 'Completed', score: 100 },
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
