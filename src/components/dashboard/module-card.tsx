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
  'Completed': {
    badge: <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800">Abgeschlossen</Badge>,
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
    buttonText: 'Überprüfen',
  },
  'In Progress': {
    badge: <Badge variant="outline">In Bearbeitung</Badge>,
    icon: <PlayCircle className="h-5 w-5 text-blue-600" />,
    buttonText: 'Fortsetzen',
  },
  'Not Started': {
    badge: <Badge variant="secondary">Nicht begonnen</Badge>,
    icon: <PlayCircle className="h-5 w-5 text-gray-500" />,
    buttonText: 'Modul starten',
  },
  'Retake Required': {
    badge: <Badge variant="destructive">Wiederholung erforderlich</Badge>,
    icon: <RefreshCw className="h-5 w-5 text-red-600" />,
    buttonText: 'Modul wiederholen',
  },
  'Nicht begonnen': {
    badge: <Badge variant="secondary">Nicht begonnen</Badge>,
    icon: <PlayCircle className="h-5 w-5 text-gray-500" />,
    buttonText: 'Modul starten',
  },
}

export function ModuleCard({ module, progress }: ModuleCardProps) {
  const { badge, buttonText } = statusInfo[progress.status]
  const image = PlaceHolderImages.find(img => img.id === module.id)

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {image && (
            <Image
              src={image.imageUrl}
              alt={module.title}
              fill
              className="object-cover rounded-t-lg"
              data-ai-hint={image.imageHint}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-xl font-headline mb-1">{module.title}</CardTitle>
            {badge}
        </div>
        <CardDescription>{module.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 p-6 pt-0">
        <div>
          <p className="text-sm font-medium mb-1">Fortschritt</p>
          <Progress value={progress.score} className="w-full h-2" />
        </div>
        <Button asChild className="w-full">
          <Link href={`/dashboard/modules/${module.id}`}>
            {buttonText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
