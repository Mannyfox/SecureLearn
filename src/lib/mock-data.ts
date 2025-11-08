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
const grundlagenQuestions: Question[] = [
    { id: 'q1', questionText: 'Was ist das Hauptziel der Informationssicherheit?', options: ['Maximale Mitarbeiterüberwachung', 'Schutz von Informationen vor unbefugtem Zugriff, Nutzung, Offenlegung, Veränderung oder Zerstörung', 'Die IT-Abteilung zu vergrößern'], correctAnswerIndex: 1, explanation: 'Das Hauptziel der Informationssicherheit ist die Gewährleistung der Vertraulichkeit, Integrität und Verfügbarkeit von Informationen.' },
    { id: 'q2', questionText: 'Wer ist im Unternehmen für die Informationssicherheit verantwortlich?', options: ['Nur die IT-Abteilung', 'Nur die Geschäftsführung', 'Jeder einzelne Mitarbeiter'], correctAnswerIndex: 2, explanation: 'Jeder Mitarbeiter trägt eine Verantwortung für die Informationssicherheit, indem er Richtlinien befolgt und wachsam ist.' },
    { id: 'q3', questionText: 'Was bedeutet das "Need-to-know"-Prinzip?', options: ['Jeder darf alles wissen', 'Mitarbeiter erhalten nur Zugriff auf die Informationen, die sie für ihre Arbeit benötigen', 'Informationen werden nur auf Anfrage mitgeteilt'], correctAnswerIndex: 1, explanation: 'Das "Need-to-know"-Prinzip beschränkt den Zugriff auf Daten und Systeme auf das absolut notwendige Minimum, um das Risiko zu reduzieren.' },
];

const datenklassifizierungQuestions: Question[] = [
    { id: 'q4', questionText: 'Warum ist die Klassifizierung von Daten wichtig?', options: ['Um Dokumente schöner zu gestalten', 'Um den richtigen Schutzbedarf für verschiedene Arten von Informationen zu bestimmen', 'Es ist eine gesetzliche Vorgabe ohne praktischen Nutzen'], correctAnswerIndex: 1, explanation: 'Durch die Klassifizierung (z.B. in "öffentlich", "intern", "vertraulich") wird sichergestellt, dass jede Information den angemessenen Schutz erhält.' },
    { id: 'q5', questionText: 'Welche Datenkategorie erfordert den höchsten Schutz?', options: ['Öffentlich', 'Intern', 'Streng vertraulich'], correctAnswerIndex: 2, explanation: 'Streng vertrauliche Daten, wie z.B. Geschäftsgeheimnisse oder sensible Personaldaten, erfordern die strengsten Sicherheitsmaßnahmen.' },
    { id: 'q6', questionText: 'Wie sollte ein Dokument mit der Klassifizierung "Intern" behandelt werden?', options: ['Es kann auf Social Media geteilt werden', 'Es sollte nur innerhalb des Unternehmens geteilt werden', 'Es kann an Kunden weitergegeben werden'], correctAnswerIndex: 1, explanation: 'Interne Dokumente sind für den Gebrauch innerhalb der Firma bestimmt und dürfen nicht nach außen gelangen.' },
];

const zugriffskontrolleQuestions: Question[] = [
    { id: 'q7', questionText: 'Was ist ein Merkmal eines starken Passworts?', options: ['Kurz und einfach zu merken, z.B. "12345"', 'Eine Kombination aus Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen', 'Der Name des eigenen Haustieres'], correctAnswerIndex: 1, explanation: 'Ein starkes Passwort ist lang und komplex, um es für Angreifer schwer zu machen, es zu erraten oder zu knacken.' },
    { id: 'q8', questionText: 'Was ist Zwei-Faktor-Authentifizierung (2FA)?', options: ['Zwei verschiedene Passwörter für dasselbe Konto', 'Ein Anmeldeverfahren, das zwei verschiedene Arten von Nachweisen erfordert (z.B. Passwort und ein Code vom Handy)', 'Das Passwort zweimal eingeben'], correctAnswerIndex: 1, explanation: '2FA fügt eine zusätzliche Sicherheitsebene hinzu und schützt Ihr Konto selbst dann, wenn Ihr Passwort gestohlen wurde.' },
    { id: 'q9', questionText: 'Warum sollten Sie Passwörter nicht wiederverwenden?', options: ['Weil es langweilig ist', 'Wenn ein Dienst gehackt wird, können Angreifer mit dem gestohlenen Passwort auf andere Dienste zugreifen', 'Es ist kein Problem, Passwörter wiederzuverwenden'], correctAnswerIndex: 1, explanation: 'Die Wiederverwendung von Passwörtern führt dazu, dass eine einzige Sicherheitsverletzung mehrere Ihrer Konten gefährden kann.' },
];

const betriebssicherheitQuestions: Question[] = [
    { id: 'q10', questionText: 'Warum sollten Sie Ihren Computer sperren (Win+L / Cmd+Ctrl+Q), wenn Sie Ihren Platz verlassen?', options: ['Um Strom zu sparen', 'Um unbefugten Zugriff auf Ihre Daten durch Dritte zu verhindern', 'Das ist nicht notwendig im Büro'], correctAnswerIndex: 1, explanation: 'Ein ungesperrter Bildschirm ist eine offene Einladung für neugierige Kollegen oder unbefugte Personen, auf Ihre Daten zuzugreifen.' },
    { id: 'q11', questionText: 'Was ist ein "Clean Desk"-Prinzip?', options: ['Den Schreibtisch jeden Abend mit Seife zu waschen', 'Keine persönlichen Gegenstände auf dem Schreibtisch zu haben', 'Am Ende des Tages keine sensiblen Dokumente oder Notizen offen auf dem Schreibtisch liegen zu lassen'], correctAnswerIndex: 2, explanation: 'Eine "Clean Desk Policy" reduziert das Risiko, dass vertrauliche Informationen von unbefugten Personen eingesehen oder gestohlen werden.' },
    { id: 'q12', questionText: 'Wo sollten Sie vertrauliche Ausdrucke entsorgen?', options: ['Im normalen Papierkorb', 'In einem speziellen Aktenvernichter (Schredder)', 'Einfach auf dem Schreibtisch für später liegen lassen'], correctAnswerIndex: 1, explanation: 'Vertrauliche Dokumente müssen geschreddert werden, um zu verhindern, dass sie aus dem Müll gefischt und missbraucht werden.' },
];

const netzwerkEmailQuestions: Question[] = [
    { id: 'q13', questionText: 'Was ist Phishing?', options: ['Ein Angel-Hobby von Kollegen', 'Betrügerische E-Mails, die darauf abzielen, an Ihre sensiblen Daten zu gelangen', 'Eine neue Art von Computerspiel'], correctAnswerIndex: 1, explanation: 'Phishing ist eine der häufigsten Angriffsmethoden. Seien Sie immer misstrauisch gegenüber E-Mails, die nach Passwörtern oder persönlichen Informationen fragen.' },
    { id: 'q14', questionText: 'Dürfen Sie sich mit dem Firmenlaptop in ein öffentliches, ungesichertes WLAN (z.B. im Café) einwählen?', options: ['Ja, das ist kein Problem', 'Nur wenn es unbedingt sein muss und unter Verwendung eines VPN', 'Nein, niemals'], correctAnswerIndex: 1, explanation: 'Öffentliche WLANs sind oft ungesichert, was es Angreifern leicht macht, den Datenverkehr mitzulesen. Ein VPN (Virtual Private Network) verschlüsselt Ihre Verbindung und ist hier unerlässlich.' },
    { id: 'q15', questionText: 'Sie erhalten eine E-Mail mit einem unerwarteten Anhang von einem unbekannten Absender. Was tun Sie?', options: ['Den Anhang sofort öffnen, um zu sehen, was es ist', 'Die E-Mail ignorieren und im Posteingang lassen', 'Die E-Mail löschen, ohne den Anhang zu öffnen, und im Zweifel die IT informieren'], correctAnswerIndex: 2, explanation: 'Unerwartete Anhänge können Schadsoftware (Malware) enthalten. Öffnen Sie sie niemals und melden Sie verdächtige E-Mails.' },
];

const mobileGeraeteQuestions: Question[] = [
    { id: 'q16', questionText: 'Was bedeutet BYOD?', options: ['Bring Your Own Dinner', 'Bring Your Own Device', 'Be Your Own Director'], correctAnswerIndex: 1, explanation: 'BYOD steht für "Bring Your Own Device" und beschreibt die Praxis, private Geräte wie Smartphones oder Laptops für die Arbeit zu nutzen.' },
    { id: 'q17', questionText: 'Was ist eine wichtige Sicherheitsmaßnahme für Ihr Firmenhandy?', options: ['Eine bunte Hülle verwenden', 'Eine Bildschirmsperre (PIN, Fingerabdruck, etc.) einzurichten', 'Die Helligkeit auf Maximum stellen'], correctAnswerIndex: 1, explanation: 'Eine Bildschirmsperre ist die grundlegendste und eine der wichtigsten Maßnahmen, um Ihr Gerät vor unbefugtem Zugriff bei Verlust oder Diebstahl zu schützen.' },
    { id: 'q18', questionText: 'Ist es sicher, Apps aus inoffiziellen App-Stores zu installieren?', options: ['Ja, dort gibt es coole Apps umsonst', 'Nein, diese Apps sind oft mit Malware infiziert', 'Nur wenn ein Freund sie empfiehlt'], correctAnswerIndex: 1, explanation: 'Installieren Sie Apps nur aus den offiziellen Stores (Google Play Store, Apple App Store), da diese auf Sicherheit geprüft werden. Inoffizielle Quellen sind ein hohes Risiko.' },
];

const kiQuestions: Question[] = [
    { id: 'q19', questionText: 'Dürfen Sie sensible Unternehmensdaten in öffentliche KI-Tools wie ChatGPT eingeben?', options: ['Ja, die KI lernt daraus und wird besser', 'Nein, diese Daten könnten für das Training des Modells verwendet und öffentlich werden', 'Nur, wenn die Daten anonymisiert sind'], correctAnswerIndex: 1, explanation: 'Öffentliche KI-Modelle können die eingegebenen Daten für ihr Training verwenden. Geben Sie niemals vertrauliche oder personenbezogene Unternehmens- oder Kundendaten ein.' },
    { id: 'q20', questionText: 'Was ist eine Gefahr von KI-generierten Inhalten (z.B. Deepfakes)?', options: ['Sie sind immer von schlechter Qualität', 'Sie können zur Erstellung von überzeugenden Fälschungen für Betrug oder Desinformation missbraucht werden', 'Sie sind nur für die Unterhaltungsindustrie relevant'], correctAnswerIndex: 1, explanation: 'Deepfake-Technologie kann missbraucht werden, um Identitäten zu fälschen, gefälschte Anweisungen zu geben oder den Ruf von Personen zu schädigen.' },
    { id: 'q21', questionText: 'Wie sollten Sie von einer KI generierte Informationen überprüfen?', options: ['Man muss sie nicht überprüfen, die KI hat immer Recht', 'Indem man eine zweite KI fragt', 'Indem man die Informationen mit vertrauenswürdigen, unabhängigen Quellen abgleicht'], correctAnswerIndex: 2, explanation: 'KI-Modelle können "halluzinieren", also falsche Informationen erfinden. Überprüfen Sie wichtige Fakten immer kritisch mit verlässlichen Quellen.' },
];

const incidentManagementQuestions: Question[] = [
    { id: 'q22', questionText: 'Sie vermuten einen Virus auf Ihrem Computer. Was ist Ihr erster Schritt?', options: ['Den Computer sofort neu starten', 'Den Vorfall unverzüglich dem Incident Management Team oder der IT-Hotline melden', 'Versuchen, den Virus selbst mit einer heruntergeladenen Software zu entfernen'], correctAnswerIndex: 1, explanation: 'Bei einem Sicherheitsvorfall ist Zeit von entscheidender Bedeutung. Melden Sie den Vorfall sofort, damit Experten die richtigen Schritte einleiten und eine weitere Ausbreitung verhindern können.' },
    { id: 'q23', questionText: 'Warum ist es wichtig, nach einem Sicherheitsvorfall nichts zu verändern (z.B. keine Dateien zu löschen)?', options: ['Das ist nicht wichtig', 'Um wichtige Spuren für die forensische Analyse nicht zu vernichten', 'Um zu sehen, was der Angreifer gemacht hat'], correctAnswerIndex: 1, explanation: 'Jede Veränderung am System kann digitale Beweise zerstören, die für die Aufklärung des Vorfalls und die Identifizierung des Angreifers entscheidend sind.' },
    { id: 'q24', questionText: 'Was ist das Ziel des Incident Managements?', options: ['Den Schuldigen zu finden und zu bestrafen', 'Den normalen Geschäftsbetrieb so schnell wie möglich wiederherzustellen und den Schaden zu minimieren', 'Einen langen Bericht für die Geschäftsführung zu schreiben'], correctAnswerIndex: 1, explanation: 'Das Hauptziel ist die schnelle Eindämmung des Vorfalls, die Wiederherstellung der Systeme und die Minimierung der Auswirkungen auf das Geschäft.' },
];


// MODULES
export const mockModules: Module[] = [
  { id: 'grundlagen-organisation', title: 'Grundlagen & Organisation', order: 1, description: 'Verstehen Sie die Grundlagen der Informationssicherheit und Ihre Rolle im Unternehmen.', questions: grundlagenQuestions },
  { id: 'datenklassifizierung', title: 'Datenklassifizierung', order: 2, description: 'Lernen Sie, wie man Daten nach ihrer Sensibilität einstuft und angemessen schützt.', questions: datenklassifizierungQuestions },
  { id: 'zugriffskontrolle-passwoerter', title: 'Zugriffskontrolle & Passwörter', order: 3, description: 'Meistern Sie den sicheren Umgang mit Passwörtern und Zugriffsrechten.', questions: zugriffskontrolleQuestions },
  { id: 'betriebssicherheit', title: 'Betriebssicherheit', order: 4, description: 'Sichern Sie Ihren täglichen Arbeitsablauf und Ihre physische Umgebung ab.', questions: betriebssicherheitQuestions },
  { id: 'netzwerk-email', title: 'Netzwerk & E-Mail', order: 5, description: 'Erkennen Sie Gefahren im Netzwerk und im Umgang mit E-Mails wie z.B. Phishing.', questions: netzwerkEmailQuestions },
  { id: 'mobile-geraete-byod', title: 'Mobile Geräte & BYOD', order: 6, description: 'Sicherer Umgang mit Smartphones, Tablets und privaten Geräten im Firmenkontext.', questions: mobileGeraeteQuestions },
  { id: 'kuenstliche-intelligenz', title: 'Künstliche Intelligenz', order: 7, description: 'Chancen und Risiken im Umgang mit KI-Werkzeugen wie ChatGPT.', questions: kiQuestions },
  { id: 'incident-management', title: 'Incident Management', order: 8, description: 'Richtiges Verhalten bei einem Sicherheitsvorfall: Erkennen, Melden, Reagieren.', questions: incidentManagementQuestions },
];

// USER PROGRESS
export const mockUserProgress: UserProgress[] = [
  // Alex Müller's progress
  { userId: 'user123', moduleId: 'grundlagen-organisation', status: 'Completed', score: 100 },
  { userId: 'user123', moduleId: 'datenklassifizierung', status: 'In Progress', score: 50 },
  { userId: 'user123', moduleId: 'zugriffskontrolle-passwoerter', status: 'Not Started', score: 0 },
  { userId: 'user123', moduleId: 'betriebssicherheit', status: 'Retake Required', score: 40 },
  { userId: 'user123', moduleId: 'netzwerk-email', status: 'Not Started', score: 0 },
  { userId: 'user123', moduleId: 'mobile-geraete-byod', status: 'Not Started', score: 0 },
  { userId: 'user123', moduleId: 'kuenstliche-intelligenz', status: 'Not Started', score: 0 },
  { userId: 'user123', moduleId: 'incident-management', status: 'Not Started', score: 0 },

  // Progress for other users for the admin dashboard
  { userId: 'user001', moduleId: 'grundlagen-organisation', status: 'Completed', score: 100 },
  { userId: 'user001', moduleId: 'datenklassifizierung', status: 'Completed', score: 100 },
  { userId: 'user002', moduleId: 'grundlagen-organisation', status: 'Completed', score: 100 },
  { userId: 'user002', moduleId: 'datenklassifizierung', status: 'In Progress', score: 50 },
  { userId: 'user003', moduleId: 'grundlagen-organisation', status: 'Retake Required', score: 0 },
  { userId: 'user004', moduleId: 'grundlagen-organisation', status: 'Completed', score: 100 },
  { userId: 'user004', moduleId: 'datenklassifizierung', status: 'Completed', score: 100 },
  { userId: 'user004', moduleId: 'zugriffskontrolle-passwoerter', status: 'Completed', score: 100 },
  { userId: 'user004', moduleId: 'betriebssicherheit', status: 'Completed', score: 100 },
  { userId: 'user004', moduleId: 'netzwerk-email', status: 'Completed', score: 100 },
  { userId: 'user004', moduleId: 'mobile-geraete-byod', status: 'Completed', score: 100 },
  { userId: 'user005', moduleId: 'grundlagen-organisation', status: 'Not Started', score: 0 },
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
