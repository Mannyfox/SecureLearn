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
  { id: 'q13', questionText: 'Welche Art von Information versuchen Phisher typischerweise zu stehlen?', options: ['Ihren Lieblingsfilm', 'Anmeldeinformationen und Finanzdaten', 'Öffentlich verfügbare Nachrichten'], correctAnswerIndex: 1, explanation: 'Phishing-Angriffe zielen darauf ab, sensible Daten wie Passwörter, Kreditkartennummern und Bankinformationen zu stehlen.' },
];

const passwordQuestions: Question[] = [
  { id: 'q3', questionText: 'Was ist die beste Methode, um ein starkes Passwort zu erstellen?', options: ['Den Namen Ihres Haustiers verwenden', 'Eine lange Phrase mit einer Mischung aus Zeichen, Zahlen und Symbolen', 'Ein kurzes, leicht zu merkendes Wort'], correctAnswerIndex: 1, explanation: 'Starke Passwörter sind lang und komplex, was es schwieriger macht, sie zu erraten oder zu knacken.' },
  { id: 'q4', questionText: 'Wie oft sollten Sie idealerweise Ihr Hauptarbeitspasswort ändern?', options: ['Niemals', 'Alle 90 Tage', 'Jeden Tag'], correctAnswerIndex: 1, explanation: 'Regelmäßiges Ändern von Passwörtern minimiert das Risiko, falls Ihr Passwort jemals kompromittiert wird.' },
  { id: 'q14', questionText: 'Was ist Zwei-Faktor-Authentifizierung (2FA)?', options: ['Zwei verschiedene Passwörter für einen Account', 'Eine zusätzliche Sicherheitsebene neben dem Passwort', 'Ein Passwort, das doppelt so lang ist'], correctAnswerIndex: 1, explanation: '2FA erfordert eine zweite Form der Verifizierung (z.B. ein Code vom Handy) zusätzlich zum Passwort und erhöht die Sicherheit erheblich.' },
];

const dataProtectionQuestions: Question[] = [
    { id: 'q5', questionText: 'Was sind personenbezogene Daten?', options: ['Jede Information über das Wetter', 'Informationen, die sich auf eine identifizierte oder identifizierbare Person beziehen', 'Nur die E-Mail-Adresse einer Person'], correctAnswerIndex: 1, explanation: 'Personenbezogene Daten umfassen alle Informationen, die einer Person zugeordnet werden können, wie Name, Adresse, Geburtsdatum etc.' },
    { id: 'q6', questionText: 'Dürfen Sie Kundendaten auf Ihrem privaten USB-Stick speichern?', options: ['Ja, wenn es praktisch ist', 'Nein, sensible Daten dürfen nur auf genehmigten Firmengeräten gespeichert werden', 'Nur, wenn der Stick verschlüsselt ist'], correctAnswerIndex: 1, explanation: 'Das Speichern von Firmendaten auf privaten Geräten ist ein erhebliches Sicherheitsrisiko und in der Regel streng verboten.' },
    { id: 'q15', questionText: 'Was bedeutet der Grundsatz der "Datenminimierung"?', options: ['So viele Daten wie möglich sammeln', 'Daten auf ein Minimum reduzieren, indem man sie löscht', 'Nur die Daten erheben und verarbeiten, die für den Zweck unbedingt erforderlich sind'], correctAnswerIndex: 2, explanation: 'Datenminimierung ist ein Kernprinzip des Datenschutzes und besagt, dass man nur so wenige Daten wie nötig sammeln sollte.' },
];

const socialEngineeringQuestions: Question[] = [
    { id: 'q7', questionText: 'Was ist Social Engineering?', options: ['Ein Networking-Event für Ingenieure', 'Die technische Manipulation von Software', 'Die psychologische Manipulation von Menschen, um Informationen preiszugeben'], correctAnswerIndex: 2, explanation: 'Social Engineering nutzt menschliche Eigenschaften wie Hilfsbereitschaft oder Angst aus, um an vertrauliche Informationen zu gelangen.' },
    { id: 'q8', questionText: 'Jemand ruft an und gibt sich als IT-Support aus. Er bittet um Ihr Passwort, um ein Problem zu beheben. Was tun Sie?', options: ['Das Passwort geben, um das Problem schnell zu lösen', 'Das Gespräch beenden und die IT über den offiziellen Kanal kontaktieren', 'Den Anrufer bitten, später zurückzurufen'], correctAnswerIndex: 1, explanation: 'Seriöse Mitarbeiter, insbesondere von der IT, werden Sie niemals nach Ihrem Passwort fragen. Dies ist ein klassischer Social-Engineering-Versuch.' },
    { id: 'q16', questionText: 'Was ist "Tailgating" im Kontext der physischen Sicherheit?', options: ['Dichtes Auffahren auf der Autobahn', 'Jemandem unbemerkt durch eine gesicherte Tür folgen', 'Eine Grillparty auf dem Firmenparkplatz'], correctAnswerIndex: 1, explanation: 'Tailgating (oder "Piggybacking") ist das Ausnutzen der Höflichkeit, um sich unerlaubt Zutritt zu einem Gebäude zu verschaffen.' },
];

const physicalSecurityQuestions: Question[] = [
    { id: 'q9', questionText: 'Warum sollten Sie Ihren Computer sperren, wenn Sie Ihren Schreibtisch verlassen?', options: ['Um Strom zu sparen', 'Um unbefugten Zugriff auf Ihre Daten und Ihr System zu verhindern', 'Es ist nicht notwendig, wenn man nur kurz weg ist'], correctAnswerIndex: 1, explanation: 'Ein ungesperrter Computer ist eine offene Tür für jeden, der physischen Zugang zu Ihrem Schreibtisch hat.' },
    { id: 'q10', questionText: 'Wo sollten Sie vertrauliche Dokumente entsorgen?', options: ['Im normalen Papierkorb', 'In einem Aktenvernichter', 'Auf dem Schreibtisch liegen lassen'], correctAnswerIndex: 1, explanation: 'Aktenvernichter zerstören Dokumente so, dass sie nicht wiederhergestellt werden können, was für den Schutz sensibler Informationen unerlässlich ist.' },
    { id: 'q17', questionText: 'Sie finden einen unbekannten USB-Stick auf dem Parkplatz. Was sollten Sie tun?', options: ['Ihn an Ihrem Arbeitsrechner anschliessen, um den Besitzer zu finden', 'Ihn ignorieren und liegen lassen', 'Ihn bei der IT-Abteilung abgeben, ohne ihn zu benutzen'], correctAnswerIndex: 2, explanation: 'Unbekannte USB-Sticks können Malware enthalten. Schliessen Sie sie niemals an einen Computer an. Die IT-Abteilung hat sichere Methoden zur Überprüfung.' },
];

const incidentResponseQuestions: Question[] = [
    { id: 'q11', questionText: 'Was ist der erste Schritt, wenn Sie glauben, einen Sicherheitsvorfall entdeckt zu haben?', options: ['Den Computer neu starten', 'Versuchen, das Problem selbst zu beheben', 'Den Vorfall unverzüglich dem zuständigen Team (z.B. IT-Sicherheit) melden'], correctAnswerIndex: 2, explanation: 'Eine schnelle Meldung ist entscheidend, um den Schaden zu begrenzen. Versuche, es selbst zu beheben, können die Situation verschlimmern.' },
    { id: 'q12', questionText: 'Warum sollten Sie nach einem Sicherheitsvorfall keine Beweise verändern oder löschen?', options: ['Es spielt keine Rolle', 'Um die forensische Untersuchung zu ermöglichen', 'Um Speicherplatz zu sparen'], correctAnswerIndex: 1, explanation: 'Digitale Beweise sind entscheidend, um den Vorfall zu verstehen, den Angreifer zu identifizieren und zukünftige Vorfälle zu verhindern.' },
    { id: 'q18', questionText: 'Ihr Laptop wurde gestohlen. Was ist die dringendste Massnahme?', options: ['Einen neuen Laptop bestellen', 'Den Diebstahl der IT-Abteilung melden, damit das Gerät gesperrt werden kann', 'Den Diebstahl bei der Polizei melden'], correctAnswerIndex: 1, explanation: 'Die IT kann das Gerät aus der Ferne sperren oder löschen, um den Zugriff auf Unternehmensdaten zu verhindern. Dies ist die wichtigste erste Massnahme.' },
];

// MODULES
export const mockModules: Module[] = [
  { id: 'phishing-awareness', title: 'Phishing-Bewusstsein', description: 'Lernen Sie, Phishing-Angriffe zu erkennen und zu vermeiden.', questions: phishingQuestions },
  { id: 'password-security', title: 'Passwortsicherheit', description: 'Meistern Sie die Kunst, starke Passwörter zu erstellen und zu verwalten.', questions: passwordQuestions },
  { id: 'data-protection', title: 'Grundlagen des Datenschutzes', description: 'Verstehen Sie Ihre Rolle beim Schutz von Unternehmens- und Kundendaten.', questions: dataProtectionQuestions },
  { id: 'social-engineering', title: 'Social Engineering', description: 'Erkennen und verteidigen Sie sich gegen manipulative Taktiken.', questions: socialEngineeringQuestions },
  { id: 'physical-security', title: 'Physische Sicherheit', description: 'Best Practices zur Sicherung Ihres Arbeitsplatzes und Ihrer Geräte.', questions: physicalSecurityQuestions },
  { id: 'incident-response', title: 'Reaktion auf Vorfälle', description: 'Wissen, was bei einem Sicherheitsvorfall zu tun ist.', questions: incidentResponseQuestions },
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
