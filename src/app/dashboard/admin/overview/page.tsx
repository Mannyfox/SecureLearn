import { StatsCard } from "@/components/admin/stats-card"
import { CompletionChart } from "@/components/admin/completion-chart"
import { otherUsers, mockUserProgress, mockModules } from "@/lib/mock-data"
import { Users, ShieldCheck, Target, TrendingUp } from "lucide-react"

export default function AdminOverviewPage() {
    const totalUsers = otherUsers.length + 2; // including regular and admin user
    const totalModules = mockModules.length;
    
    const completedUsers = new Set(
        mockUserProgress
        .filter(p => p.status === 'Completed')
        .map(p => p.userId)
    ).size

    const overallCompletion = (completedUsers / totalUsers) * 100

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Benutzer gesamt" value={totalUsers.toString()} icon={Users} description="Alle registrierten Benutzer"/>
                <StatsCard title="Module gesamt" value={totalModules.toString()} icon={ShieldCheck} description="Verfügbare Schulungsmodule"/>
                <StatsCard title="Abschlussquote" value={`${overallCompletion.toFixed(1)}%`} icon={Target} description="Gesamtabschluss der Module"/>
                <StatsCard title="Aktiv diesen Monat" value="85%" icon={TrendingUp} description="+10% zum letzten Monat"/>
            </div>
            <CompletionChart progressData={mockUserProgress} />
        </div>
    )
}
