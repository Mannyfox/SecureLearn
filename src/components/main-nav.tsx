"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import type { User } from "@/lib/types"
import { Award, BarChart2, BookOpen, ShieldCheck, Users } from "lucide-react"

interface MainNavProps {
  user: User | null
}

export function MainNav({ user }: MainNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Meine Schulung",
      icon: BookOpen,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/certificate",
      label: "Zertifikat",
      icon: Award,
      active: pathname === "/dashboard/certificate",
    },
  ]

  const adminRoutes = [
    {
      href: "/dashboard/admin/overview",
      label: "Übersicht",
      icon: BarChart2,
      active: pathname.startsWith("/dashboard/admin/overview"),
    },
    {
      href: "/dashboard/admin/users",
      label: "Benutzerverwaltung",
      icon: Users,
      active: pathname.startsWith("/dashboard/admin/users"),
    },
    {
      href: "/dashboard/admin/questions",
      label: "Fragen-CMS",
      icon: ShieldCheck,
      active: pathname.startsWith("/dashboard/admin/questions"),
    },
  ]

  return (
    <div className="flex flex-col gap-4 py-4">
      <nav className="grid gap-1 px-2">
        <h3 className="px-2 py-1 text-xs font-medium text-muted-foreground">Dashboard</h3>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              route.active ? "bg-accent text-accent-foreground" : "text-foreground/70"
            )}
          >
            <route.icon className="h-4 w-4" />
            {route.label}
          </Link>
        ))}
      </nav>
      {user?.role === 'admin' && (
        <nav className="grid gap-1 px-2">
          <h3 className="px-2 py-1 text-xs font-medium text-muted-foreground">Admin</h3>
          {adminRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                route.active ? "bg-accent text-accent-foreground" : "text-foreground/70"
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}
