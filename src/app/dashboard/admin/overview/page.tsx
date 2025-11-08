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
                <StatsCard title="Total Users" value={totalUsers.toString()} icon={Users} description="All registered users"/>
                <StatsCard title="Total Modules" value={totalModules.toString()} icon={ShieldCheck} description="Available training modules"/>
                <StatsCard title="Completion Rate" value={`${overallCompletion.toFixed(1)}%`} icon={Target} description="Overall module completion"/>
                <StatsCard title="Active This Month" value="85%" icon={TrendingUp} description="+10% from last month"/>
            </div>
            <CompletionChart progressData={mockUserProgress} />
        </div>
    )
}
