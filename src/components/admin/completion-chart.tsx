"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { UserProgress } from "@/lib/types"

interface CompletionChartProps {
  progressData: UserProgress[]
}

export function CompletionChart({ progressData }: CompletionChartProps) {
  const moduleCompletion = progressData.reduce((acc, progress) => {
    if (!acc[progress.moduleId]) {
      acc[progress.moduleId] = { total: 0, completed: 0 }
    }
    acc[progress.moduleId].total += 1
    if (progress.status === "Abgeschlossen") {
      acc[progress.moduleId].completed += 1
    }
    return acc
  }, {} as Record<string, { total: number; completed: number }>)

  const chartData = Object.entries(moduleCompletion).map(([moduleId, data]) => ({
    name: moduleId.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    completionRate: data.total > 0 ? (data.completed / data.total) * 100 : 0,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modul-Abschlussquoten</CardTitle>
        <CardDescription>Prozentsatz der Benutzer, die jedes Modul abgeschlossen haben. (Demodaten)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Bar dataKey="completionRate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
