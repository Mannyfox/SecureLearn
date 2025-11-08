import type { Module } from './types';

// MODULES
// This data is now only used to seed the initial structure into Firestore.
// Questions are managed dynamically in the admin panel.
export const mockModules: Omit<Module, 'questions'>[] = [
  { id: 'grundlagen-organisation', title: 'Grundlagen & Organisation', order: 1, description: 'Verstehen Sie die Grundlagen der Informationssicherheit und Ihre Rolle im Unternehmen.' },
  { id: 'datenklassifizierung', title: 'Datenklassifizierung', order: 2, description: 'Lernen Sie, wie man Daten nach ihrer Sensibilität einstuft und angemessen schützt.' },
  { id: 'zugriffskontrolle-passwoerter', title: 'Zugriffskontrolle & Passwörter', order: 3, description: 'Meistern Sie den sicheren Umgang mit Passwörtern und Zugriffsrechten.' },
  { id: 'betriebssicherheit', title: 'Betriebssicherheit', order: 4, description: 'Sichern Sie Ihren täglichen Arbeitsablauf und Ihre physische Umgebung ab.' },
  { id: 'netzwerk-email', title: 'Netzwerk & E-Mail', order: 5, description: 'Erkennen Sie Gefahren im Netzwerk und im Umgang mit E-Mails wie z.B. Phishing.' },
  { id: 'mobile-geraete-byod', title: 'Mobile Geräte & BYOD', order: 6, description: 'Sicherer Umgang mit Smartphones, Tablets und privaten Geräten im Firmenkontext.' },
  { id: 'kuenstliche-intelligenz', title: 'Künstliche Intelligenz', order: 7, description: 'Chancen und Risiken im Umgang mit KI-Werkzeugen wie ChatGPT.' },
  { id: 'incident-management', title: 'Incident Management', order: 8, description: 'Richtiges Verhalten bei einem Sicherheitsvorfall: Erkennen, Melden, Reagieren.' },
];
