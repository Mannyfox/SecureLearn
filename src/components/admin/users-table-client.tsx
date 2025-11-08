"use client"

import { useState } from "react"
import type { User, UserProgress } from "@/lib/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Search } from "lucide-react"
import { format, isBefore } from "date-fns"

interface UsersTableClientProps {
  users: User[]
  progress: UserProgress[]
}

export function UsersTableClient({ users, progress }: UsersTableClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  // This logic is now mostly for demonstration as fetching all subcollections is complex on the client.
  const getOverallStatus = (userId: string) => {
    const userProgress = progress.filter(p => p.userId === userId)
    if (userProgress.length === 0) return <Badge variant="secondary">Nicht begonnen</Badge>
    if (userProgress.some(p => p.status === 'Wiederholung erforderlich')) return <Badge variant="destructive">Wiederholung erforderlich</Badge>
    // This part is tricky without knowing total modules
    // if (userProgress.every(p => p.status === 'Abgeschlossen')) return <Badge className="bg-green-600 text-white">Abgeschlossen</Badge>
    return <Badge variant="outline">In Bearbeitung</Badge>
  }
  
  const getLatestCompletionDate = (userId: string) => {
    const userProgress = progress.filter(p => p.userId === userId && p.status === 'Abgeschlossen' && p.completedAt)
    if (userProgress.length === 0) return '-'

    const latestDate = userProgress.reduce((latest, p) => {
        const pDate = p.completedAt?.toDate();
        if (!pDate) return latest;
        return isBefore(latest, pDate) ? pDate : latest
    }, new Date(0))

    if (latestDate.getFullYear() === 1970) return '-';

    return format(latestDate, "dd.MM.yyyy")
  }

  const filteredUsers = users
    .filter((user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) =>
      departmentFilter === "all" ? true : user.department === departmentFilter
    )

  const handleExport = () => {
    // In a real app, this would trigger a server action to generate and download a CSV.
    alert("Daten werden exportiert... (Dies ist ein Platzhalter)");
  }

  return (
    <div>
      <div className="flex items-center space-x-2 pb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Suche nach Name oder E-Mail..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Nach Abteilung filtern" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Abteilungen</SelectItem>
            <SelectItem value="Sales">Vertrieb</SelectItem>
            <SelectItem value="Engineering">Technik</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="HR">Personal</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Nach Excel exportieren
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Abteilung</TableHead>
              <TableHead>Gesamtstatus</TableHead>
              <TableHead>Zuletzt abgeschlossen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
                <TableCell>{user.email || 'N/A'}</TableCell>
                <TableCell>{user.department || 'N/A'}</TableCell>
                <TableCell>{getOverallStatus(user.id)}</TableCell>
                <TableCell>{getLatestCompletionDate(user.id)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
