import { QuestionEditor } from "@/components/admin/question-editor"
import { mockModules } from "@/lib/mock-data"

export default function AdminQuestionsPage() {
  // In a real app, you'd fetch this from a database.
  const modules = mockModules
  
  // In a real app, you'd fetch the latest guidelines from the database.
  const guidelinesText = `1. Datenschutzgrundlagen: Alle Mitarbeitenden sind verpflichtet, personenbezogene Daten (z.B. von Kunden oder anderen Mitarbeitenden) streng vertraulich zu behandeln. Die Weitergabe an Dritte ist nur mit ausdrücklicher Genehmigung gestattet.

2. Passwortsicherheit: Passwörter müssen mindestens 12 Zeichen lang sein und eine Kombination aus Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen enthalten. Passwörter sind alle 90 Tage zu ändern und dürfen nicht wiederverwendet werden.

3. Phishing-Erkennung: Seien Sie wachsam bei E-Mails von unbekannten Absendern, die dringenden Handlungsbedarf fordern oder verdächtige Links enthalten. Klicken Sie niemals auf unbekannte Links und melden Sie verdächtige E-Mails sofort an die IT-Abteilung.

4. Nutzung von Firmengeräten: Firmengeräte (Laptops, Smartphones) sind ausschließlich für geschäftliche Zwecke zu verwenden. Die Installation von nicht genehmigter Software ist verboten.

5. Datensicherung: Wichtige Arbeitsdaten sind regelmäßig auf den dafür vorgesehenen Netzlaufwerken zu sichern. Speichern Sie sensible Unternehmensdaten nicht auf lokalen Desktops oder in privaten Cloud-Speichern.
`

  return (
    <div>
      <QuestionEditor modules={modules} initialPolicyText={guidelinesText} />
    </div>
  )
}
