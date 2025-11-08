'use client'

import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { AnnualReminderBanner } from "@/components/dashboard/annual-reminder-banner";
import { ModuleCard } from "@/components/dashboard/module-card";
import { isBefore } from "date-fns";
import type { Module, UserProgress, Certificate } from "@/lib/types";
import { collection, query, orderBy, doc } from "firebase/firestore";
import { useDoc } from "@/firebase/firestore/use-doc";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const modulesQuery = useMemoFirebase(() => firestore ? query(collection(firestore, "modules"), orderBy("order")) : null, [firestore]);
  const { data: modules, isLoading: isLoadingModules } = useCollection<Module>(modulesQuery);

  const userProgressQuery = useMemoFirebase(() => (firestore && user) ? collection(firestore, "users", user.uid, "moduleProgress") : null, [firestore, user]);
  const { data: userProgress, isLoading: isLoadingProgress } = useCollection<UserProgress>(userProgressQuery);

  const certificateRef = useMemoFirebase(() => (firestore && user) ? doc(firestore, `users/${user.uid}/certificates/main`) : null, [firestore, user]);
  const { data: certificate, isLoading: isLoadingCertificate } = useDoc<Certificate>(certificateRef);

  const isCertificateExpired = certificate?.expiresAt ? isBefore(certificate.expiresAt.toDate(), new Date()) : false;

  const isLoading = isLoadingModules || isLoadingProgress || isUserLoading || isLoadingCertificate;

  if (isLoading || !user) {
    return (
        <div className="space-y-6">
          <div>
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="rounded-lg h-[400px]" />
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

      {modules && modules.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map(module => (
            <ModuleCard key={module.id} module={module} progress={getProgressForModule(module.id)} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 border-dashed border-2 rounded-lg">
          <p className="text-muted-foreground">Es sind noch keine Schulungsmodule verfügbar. Bitten Sie einen Administrator, die Module zu initialisieren.</p>
        </div>
      )}
    </div>
  )
}
