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
      <AlertTitle>Action Required: Recertification Needed</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <p>Your annual security training certificate has expired. Please complete all modules to issue a new certificate.</p>
        <Button variant="destructive">Start Recertification</Button>
      </AlertDescription>
    </Alert>
  )
}
