'use client';

import { UsersTableClient } from "@/components/admin/users-table-client"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";
import type { User, UserProgress } from "@/lib/types";

export default function AdminUsersPage() {
  const firestore = useFirestore();
  
  const usersQuery = useMemoFirebase(() => firestore ? query(collection(firestore, "users")) : null, [firestore]);
  const { data: users, isLoading: isLoadingUsers } = useCollection<User>(usersQuery);

  // Note: This fetches all progress data. For large apps, this should be optimized.
  const progressQuery = useMemoFirebase(() => firestore ? query(collection(firestore, "users")) : null, [firestore]);
  const { data: allUsersForProgress, isLoading: isLoadingProgress } = useCollection<User>(progressQuery);

  // A more complex approach is needed to get all subcollections.
  // This is a simplified example. For a real app, you'd likely use a function 
  // to fetch progress for each user or denormalize the latest progress onto the user object.
  // For now, we will pass empty progress.
  const allProgress: UserProgress[] = [];

  if (isLoadingUsers) {
    return <div>Benutzer werden geladen...</div>
  }

  return (
    <div>
      <UsersTableClient users={users || []} progress={allProgress} />
    </div>
  )
}
