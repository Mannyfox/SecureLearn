import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface AnnualReminderBannerProps {
  isExpired: boolean
}

export function AnnualReminderBanner({ isExpired }: AnnualReminderBannerProps) {
  if (!isExpired) {
    return null
  }

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Aktion erforderlich: Rezertifizierung notwendig</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <p>Ihr jährliches Sicherheitsschulungszertifikat ist abgelaufen. Bitte schließen Sie alle Module ab, um ein neues Zertifikat auszustellen.</p>
        <Button variant="destructive">Rezertifizierung starten</Button>
      </AlertDescription>
    </Alert>
  )
}
