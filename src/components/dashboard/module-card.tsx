import Image from "next/image"
import Link from "next/link"
import type { Module, UserProgress } from "@/lib/types"
import { PlaceHolderImages } from '@/lib/placeholder-images'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, PlayCircle, RefreshCw } from "lucide-react"

interface ModuleCardProps {
  module: Module
  progress: UserProgress
}

const statusInfo = {
  'Abgeschlossen': {
    badge: <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800">Abgeschlossen</Badge>,
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
    buttonText: 'Überprüfen',
  },
  'In Bearbeitung': {
    badge: <Badge variant="outline">In Bearbeitung</Badge>,
    icon: <PlayCircle className="h-5 w-5 text-blue-600" />,
    buttonText: 'Fortsetzen',
  },
  'Nicht begonnen': {
    badge: <Badge variant="secondary">Nicht begonnen</Badge>,
    icon: <PlayCircle className="h-5 w-5 text-gray-500" />,
    buttonText: 'Modul starten',
  },
  'Wiederholung erforderlich': {
    badge: <Badge variant="destructive">Wiederholung erforderlich</Badge>,
    icon: <RefreshCw className="h-5 w-5 text-red-600" />,
    buttonText: 'Modul wiederholen',
  },
}

export function ModuleCard({ module, progress }: ModuleCardProps) {
  // Fallback for unexpected statuses
  const currentStatusInfo = statusInfo[progress.status] || statusInfo['Nicht begonnen'];
  const image = PlaceHolderImages.get(module.id) ?? PlaceHolderImages.getDefault();

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {image && (
            <Image
              src={image.imageUrl}
              alt={module.title}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 space-y-3">
        <div className="space-y-2">
            <CardTitle className="text-xl font-headline leading-snug">{module.title}</CardTitle>
            {currentStatusInfo.badge}
        </div>
        <CardDescription>{module.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 p-6 pt-0 bg-muted/50 dark:bg-card">
        <div className="w-full">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium">Fortschritt</p>
            <p className="text-sm font-semibold text-primary">{progress.score || 0}%</p>
          </div>
          <Progress value={progress.score || 0} className="h-2" />
        </div>
        <Button asChild className="w-full">
          <Link href={`/dashboard/modules/${module.id}`}>
            {currentStatusInfo.buttonText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
