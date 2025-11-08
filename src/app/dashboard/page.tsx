'use client'

import { useAuth } from "@/hooks/use-auth";
import { mockModules, mockUserProgress, expiredCertificate } from "@/lib/mock-data";
import { AnnualReminderBanner } from "@/components/dashboard/annual-reminder-banner";
import { ModuleCard } from "@/components/dashboard/module-card";
import { isBefore } from "date-fns";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return null; // Or a loading skeleton
  }

  // Mock data fetching for the current user
  const userProgress = mockUserProgress.filter(p => p.userId === user.id);
  const isCertificateExpired = isBefore(expiredCertificate.expiresAt, new Date());

  const getProgressForModule = (moduleId: string) => {
    return userProgress.find(p => p.moduleId === moduleId) || {
      userId: user.id,
      moduleId,
      status: 'Nicht begonnen',
      score: 0,
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Willkommen zurück, {user.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Hier sind Ihre zugewiesenen Sicherheitsschulungsmodule. Bitte schließen Sie sie ab, um Ihr Zertifikat zu erhalten.</p>
      </div>

      <AnnualReminderBanner isExpired={user.id === 'user123' && isCertificateExpired} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockModules.map(module => (
          <ModuleCard key={module.id} module={module} progress={getProgressForModule(module.id)} />
        ))}
      </div>
    </div>
  )
}
