'use client'

import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { AnnualReminderBanner } from "@/components/dashboard/annual-reminder-banner";
import { ModuleCard } from "@/components/dashboard/module-card";
import { isBefore } from "date-fns";
import type { Module, UserProgress, Certificate } from "@/lib/types";
import { collection, query, where, orderBy } from "firebase/firestore";
import { useDoc } from "@/firebase/firestore/use-doc";
import { doc } from "firebase/firestore";

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const modulesQuery = useMemoFirebase(() => firestore ? query(collection(firestore, "modules"), orderBy("order")) : null, [firestore]);
  const { data: modules, isLoading: isLoadingModules } = useCollection<Module>(modulesQuery);

  const userProgressQuery = useMemoFirebase(() => (firestore && user) ? collection(firestore, "users", user.uid, "moduleProgress") : null, [firestore, user]);
  const { data: userProgress, isLoading: isLoadingProgress } = useCollection<UserProgress>(userProgressQuery);

  // This is just an example, you might fetch the user's certificate differently
  const certificateRef = useMemoFirebase(() => (firestore && user) ? doc(firestore, `users/${user.uid}/certificates/main`) : null, [firestore, user]);
  const { data: certificate } = useDoc<Certificate>(certificateRef);

  const isCertificateExpired = certificate ? isBefore(certificate.expiresAt.toDate(), new Date()) : false;

  if (isLoadingModules || isLoadingProgress || !user) {
    return (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Willkommen zurück!</h1>
            <p className="text-muted-foreground">Hier sind Ihre zugewiesenen Sicherheitsschulungsmodule.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm h-[400px]"></div>
            ))}
          </div>
        </div>
    );
  }

  const getProgressForModule = (moduleId: string) => {
    return userProgress?.find(p => p.moduleId === moduleId) || {
      userId: user.uid,
      moduleId,
      status: 'Nicht begonnen',
      score: 0,
    };
  };

  const displayName = user.isAnonymous ? 'Benutzer' : user.email?.split('@')[0] || 'Benutzer';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Willkommen zurück, {displayName}!</h1>
        <p className="text-muted-foreground">Hier sind Ihre zugewiesenen Sicherheitsschulungsmodule. Bitte schließen Sie sie ab, um Ihr Zertifikat zu erhalten.</p>
      </div>

      <AnnualReminderBanner isExpired={isCertificateExpired} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules?.map(module => (
          <ModuleCard key={module.id} module={module} progress={getProgressForModule(module.id)} />
        ))}
      </div>
    </div>
  )
}
