'use client';

import { QuestionEditor } from "@/components/admin/question-editor"
import { useFirestore, useCollection, useDoc, useMemoFirebase } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import type { Module } from "@/lib/types";

export default function AdminQuestionsPage() {
  const firestore = useFirestore();

  const modulesQuery = useMemoFirebase(() => firestore ? collection(firestore, "modules") : null, [firestore]);
  const { data: modules, isLoading: isLoadingModules } = useCollection<Module>(modulesQuery);

  const guidelinesRef = useMemoFirebase(() => firestore ? doc(firestore, "settings", "company-guidelines") : null, [firestore]);
  const { data: guidelinesDoc, isLoading: isLoadingGuidelines } = useDoc<{content: string}>(guidelinesRef);

  if (isLoadingModules || isLoadingGuidelines) {
    return <div>Laden...</div>;
  }

  return (
    <div>
      <QuestionEditor modules={modules || []} policyTextForGeneration={guidelinesDoc?.content || ""} />
    </div>
  )
}
