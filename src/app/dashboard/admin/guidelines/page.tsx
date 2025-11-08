"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"
import { useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking } from "@/firebase"
import { doc } from "firebase/firestore"

const GUIDELINES_DOC_ID = "company-guidelines";

export default function AdminGuidelinesPage() {
  const firestore = useFirestore();
  const guidelinesRef = useMemoFirebase(() => firestore ? doc(firestore, "settings", GUIDELINES_DOC_ID) : null, [firestore]);
  const { data: guidelinesDoc, isLoading } = useDoc<{content: string}>(guidelinesRef);

  const [guidelines, setGuidelines] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (guidelinesDoc) {
      setGuidelines(guidelinesDoc.content);
    }
  }, [guidelinesDoc]);


  const handleSave = async () => {
    if (!firestore || !guidelinesRef) return;
    setIsSaving(true)
    
    setDocumentNonBlocking(guidelinesRef, { content: guidelines }, { merge: true });

    toast({
        title: "Wird gespeichert...",
        description: "Die Richtlinien werden im Hintergrund aktualisiert.",
    })
    
    // Visually we can pretend it's saved, optimistic update.
    setIsSaving(false);
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
          disabled={isLoading}
          placeholder={isLoading ? "Laden..." : "Geben Sie hier Ihre Richtlinien ein..."}
        />
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving || isLoading}>
            <Save className="mr-2" />
            {isSaving ? "Speichern..." : "Richtlinien speichern"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
