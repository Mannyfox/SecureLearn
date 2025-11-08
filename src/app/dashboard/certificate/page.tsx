'use client'

import { CertificateDisplay } from "@/components/certificate/certificate-display";
import { useUser, useFirestore, useCollection, useDoc, useMemoFirebase } from "@/firebase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { collection, doc } from "firebase/firestore";
import type { Certificate, Module, UserProgress } from "@/lib/types";

export default function CertificatePage() {
  const { user } = useUser();
  const firestore = useFirestore();
  
  const modulesQuery = useMemoFirebase(() => firestore ? collection(firestore, "modules") : null, [firestore]);
  const { data: modules, isLoading: isLoadingModules } = useCollection<Module>(modulesQuery);

  const userProgressQuery = useMemoFirebase(() => (firestore && user) ? collection(firestore, `users/${user.uid}/moduleProgress`) : null, [firestore, user]);
  const { data: userProgress, isLoading: isLoadingProgress } = useCollection<UserProgress>(userProgressQuery);

  const certificateRef = useMemoFirebase(() => (firestore && user) ? doc(firestore, `users/${user.uid}/certificates/main`) : null, [firestore, user]);
  const { data: certificate, isLoading: isLoadingCertificate } = useDoc<Certificate>(certificateRef);

  if (isLoadingModules || isLoadingProgress || isLoadingCertificate || !user || !modules) {
    return <div>Laden...</div>;
  }
  
  const allModulesCompleted = userProgress && modules && userProgress.length === modules.length && userProgress.every(p => p.status === 'Abgeschlossen');
  
  const displayUser = {
      id: user.uid,
      name: user.isAnonymous ? 'Anonymer Benutzer' : user.email || 'Benutzer',
      email: user.email || 'anonym@apfelkiste.ch',
      role: 'user',
      avatarUrl: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`
  }

  if (!allModulesCompleted || !certificate) {
    const completedCount = userProgress?.filter(p => p.status === 'Abgeschlossen').length || 0;
    const totalCount = modules.length;

    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 rounded-lg border border-dashed p-10">
        <Lock className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-2xl font-bold font-headline">Zertifikat gesperrt</h2>
        <p className="text-muted-foreground max-w-md">
          Sie müssen alle Schulungsmodule abschließen, um Ihr Zertifikat freizuschalten.
          Sie haben {completedCount} von {totalCount} Modulen abgeschlossen.
        </p>
        <Button asChild>
          <a href="/dashboard">Zum Dashboard zurückkehren</a>
        </Button>
      </div>
    )
  }

  return (
    <div>
        <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Ihr Zertifikat</h1>
            <p className="text-muted-foreground">Herzlichen Glückwunsch zum Abschluss Ihrer jährlichen Sicherheitsschulung.</p>
        </div>
        <CertificateDisplay user={displayUser} certificate={certificate} />
    </div>
  )
}
