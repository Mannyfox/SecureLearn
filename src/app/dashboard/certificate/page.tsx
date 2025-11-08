'use client'

import { CertificateDisplay } from "@/components/certificate/certificate-display";
import { useAuth } from "@/hooks/use-auth";
import { mockUserProgress, validCertificate, mockModules } from "@/lib/mock-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function CertificatePage() {
  const { user } = useAuth();
  
  // This is mock logic. In a real app, you'd fetch this from your database.
  if (!user) {
    return null; // or loading
  }

  const userProgress = mockUserProgress.filter(p => p.userId === user.id);
  const allModulesCompleted = userProgress.length === mockModules.length && userProgress.every(p => p.status === 'Completed');
  const certificate = validCertificate; // Mock certificate

  if (!allModulesCompleted) {
    const completedCount = userProgress.filter(p => p.status === 'Completed').length;
    const totalCount = mockModules.length;

    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 rounded-lg border border-dashed p-10">
        <Lock className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-2xl font-bold font-headline">Certificate Locked</h2>
        <p className="text-muted-foreground max-w-md">
          You must complete all training modules to unlock your certificate.
          You have completed {completedCount} out of {totalCount} modules.
        </p>
        <Button asChild>
          <a href="/dashboard">Return to Dashboard</a>
        </Button>
      </div>
    )
  }

  return (
    <div>
        <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Your Certificate</h1>
            <p className="text-muted-foreground">Congratulations on completing your annual security training.</p>
        </div>
        <CertificateDisplay user={user} certificate={certificate} />
    </div>
  )
}
