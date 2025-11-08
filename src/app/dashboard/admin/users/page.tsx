import { UsersTableClient } from "@/components/admin/users-table-client"
import { regularUser, adminUser, otherUsers, mockUserProgress } from "@/lib/mock-data"

export default function AdminUsersPage() {
  // In a real app, you would fetch all users and their progress from the database.
  const allUsers = [regularUser, adminUser, ...otherUsers]
  const allProgress = mockUserProgress
  
  return (
    <div>
      <UsersTableClient users={allUsers} progress={allProgress} />
    </div>
  )
}
