"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"

// In a real app, this would be fetched from and saved to a database.
const MOCK_GUIDELINES = `1. Datenschutzgrundlagen: Alle Mitarbeitenden sind verpflichtet, personenbezogene Daten (z.B. von Kunden oder anderen Mitarbeitenden) streng vertraulich zu behandeln. Die Weitergabe an Dritte ist nur mit ausdrücklicher Genehmigung gestattet.

2. Passwortsicherheit: Passwörter müssen mindestens 12 Zeichen lang sein und eine Kombination aus Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen enthalten. Passwörter sind alle 90 Tage zu ändern und dürfen nicht wiederverwendet werden.

3. Phishing-Erkennung: Seien Sie wachsam bei E-Mails von unbekannten Absendern, die dringenden Handlungsbedarf fordern oder verdächtige Links enthalten. Klicken Sie niemals auf unbekannte Links und melden Sie verdächtige E-Mails sofort an die IT-Abteilung.

4. Nutzung von Firmengeräten: Firmengeräte (Laptops, Smartphones) sind ausschließlich für geschäftliche Zwecke zu verwenden. Die Installation von nicht genehmigter Software ist verboten.

5. Datensicherung: Wichtige Arbeitsdaten sind regelmäßig auf den dafür vorgesehenen Netzlaufwerken zu sichern. Speichern Sie sensible Unternehmensdaten nicht auf lokalen Desktops oder in privaten Cloud-Speichern.
`

export default function AdminGuidelinesPage() {
  const [guidelines, setGuidelines] = useState(MOCK_GUIDELINES)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    // Simulate saving to a database
    setIsSaving(true)
    console.log("Saving guidelines:", guidelines)
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Gespeichert!",
        description: "Die Richtlinien wurden erfolgreich aktualisiert.",
      })
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unternehmensrichtlinien verwalten</CardTitle>
        <CardDescription>
          Bearbeiten Sie hier die zentralen Sicherheits- und Datenschutzrichtlinien. 
          Dieser Text kann als Grundlage für die automatische Erstellung von Quizfragen im "Fragen-CMS"-Tab verwendet werden.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          className="min-h-[500px] font-mono text-sm"
          value={guidelines}
          onChange={(e) => setGuidelines(e.target.value)}
        />
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2" />
            {isSaving ? "Speichern..." : "Richtlinien speichern"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
