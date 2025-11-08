'use client';

import { StatsCard } from "@/components/admin/stats-card"
import { CompletionChart } from "@/components/admin/completion-chart"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, doc, writeBatch } from "firebase/firestore";
import type { Module, User, UserProgress } from "@/lib/types";
import { Users, ShieldCheck, Target, TrendingUp, Database } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { mockModules } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminOverviewPage() {
    const firestore = useFirestore();
    const { toast } = useToast();

    const usersQuery = useMemoFirebase(() => firestore ? collection(firestore, "users") : null, [firestore]);
    const { data: users, isLoading: isLoadingUsers } = useCollection<User>(usersQuery);

    const modulesQuery = useMemoFirebase(() => firestore ? collection(firestore, "modules") : null, [firestore]);
    const { data: modules, isLoading: isLoadingModules } = useCollection<Module>(modulesQuery);
    
    // In a real app, fetching all subcollections like this is inefficient.
    // This is a simplification for the demo. You'd typically use aggregated data.
    const { data: userProgress, isLoading: isLoadingProgress } = useCollection<UserProgress>(
      useMemoFirebase(() => firestore ? collection(firestore, 'users/user123/moduleProgress') : null, [firestore])
    );

    const handleSeedDatabase = async () => {
        if (!firestore) return;

        const batch = writeBatch(firestore);

        mockModules.forEach(module => {
            const moduleRef = doc(firestore, "modules", module.id);
            batch.set(moduleRef, module);
        });

        try {
            await batch.commit();
            toast({
                title: "Datenbank initialisiert!",
                description: `${mockModules.length} Module wurden erfolgreich in die Datenbank geschrieben.`
            });
            // You might want to force a refresh of the modules collection data here
        } catch (error) {
            console.error("Error seeding database:", error);
            toast({
                variant: "destructive",
                title: "Fehler beim Initialisieren",
                description: "Die Moduldaten konnten nicht in die Datenbank geschrieben werden."
            });
        }
    };


    if (isLoadingUsers || isLoadingModules || isLoadingProgress) {
        return <div>Laden...</div>
    }

    const totalUsers = users?.length || 0;
    const totalModules = modules?.length || 0;
    
    // This is a mock calculation as we can't easily fetch all progress data on the client
    const completedUsers = new Set(
        userProgress?.filter(p => p.status === 'Abgeschlossen').map(p => p.userId)
    ).size;

    const overallCompletion = totalUsers > 0 ? (completedUsers / totalUsers) * 100 : 0;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Benutzer gesamt" value={totalUsers.toString()} icon={Users} description="Alle registrierten Benutzer"/>
                <StatsCard title="Module gesamt" value={totalModules.toString()} icon={ShieldCheck} description="Verfügbare Schulungsmodule"/>
                <StatsCard title="Abschlussquote" value={`${overallCompletion.toFixed(1)}%`} icon={Target} description="Gesamtabschluss der Module"/>
                <StatsCard title="Aktiv diesen Monat" value="N/A" icon={TrendingUp} description="Daten nicht verfügbar"/>
            </div>
            
            {modules && modules.length === 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Datenbank initialisieren</CardTitle>
                        <CardDescription>
                            Ihre Firestore-Datenbank enthält noch keine Schulungsmodule. Klicken Sie auf die Schaltfläche, um die Beispieldaten zu laden.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleSeedDatabase}>
                            <Database className="mr-2" />
                            Beispieldaten laden
                        </Button>
                    </CardContent>
                </Card>
            )}

            <CompletionChart progressData={userProgress || []} modules={modules || []}/>
        </div>
    )
}
