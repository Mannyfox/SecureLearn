import { QuizClient } from "@/components/quiz/quiz-client";
import { mockModules } from "@/lib/mock-data";
import { notFound } from 'next/navigation';

interface ModulePageProps {
    params: {
        id: string;
    }
}

export default function ModulePage({ params }: ModulePageProps) {
  // In a real app, you would fetch module data from a database.
  const module = mockModules.find(m => m.id === params.id);
  
  if (!module) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">{module.title}</h1>
            <p className="text-muted-foreground">{module.description}</p>
        </div>
        <QuizClient module={module} />
    </div>
  )
}
