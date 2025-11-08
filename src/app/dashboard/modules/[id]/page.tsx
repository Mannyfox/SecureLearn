'use client';

import { QuizClient } from "@/components/quiz/quiz-client";
import { notFound } from 'next/navigation';
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import type { Module } from "@/lib/types";

interface ModulePageProps {
    params: {
        id: string;
    }
}

export default function ModulePage({ params }: ModulePageProps) {
  // eslint-disable-next-line @next/next/no-unwanted-polyfillio
  const { id } = params; // Parameters are not promises in client components.
  const firestore = useFirestore();
  const moduleRef = useMemoFirebase(() => firestore ? doc(firestore, "modules", id) : null, [firestore, id]);
  const { data: module, isLoading } = useDoc<Module>(moduleRef);

  if (isLoading) {
    return <div>Laden...</div>;
  }
  
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
