"use client"

import { usePathname, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const adminTabs = [
    { value: "overview", label: "Übersicht", href: "/dashboard/admin/overview" },
    { value: "users", label: "Benutzerverwaltung", href: "/dashboard/admin/users" },
    { value: "questions", label: "Fragen-CMS", href: "/dashboard/admin/questions" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const activeTab = adminTabs.find(tab => pathname.includes(tab.value))?.value || 'overview'

    const onTabChange = (value: string) => {
        const href = adminTabs.find(tab => tab.value === value)?.href
        if (href) {
            router.push(href)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Admin-Dashboard</h1>
                <p className="text-muted-foreground">Benutzer, Schulungsinhalte verwalten und Statistiken einsehen.</p>
            </div>
            <Tabs value={activeTab} onValueChange={onTabChange}>
                <TabsList>
                    {adminTabs.map(tab => (
                         <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
            <div>
                {children}
            </div>
        </div>
    )
}
