'use client';

import { UsersTableClient } from "@/components/admin/users-table-client"
import { useCollection, useFirestore, useMemoFirebase, errorEmitter, FirestorePermissionError } from "@/firebase";
import { collection, query, where, getDocs, collectionGroup } from "firebase/firestore";
import type { User, UserProgress } from "@/lib/types";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const firestore = useFirestore();
  const [allProgress, setAllProgress] = useState<UserProgress[]>([]);
  const [isProgressLoading, setIsProgressLoading] = useState(true);
  
  const usersQuery = useMemoFirebase(() => firestore ? query(collection(firestore, "users")) : null, [firestore]);
  const { data: users, isLoading: isLoadingUsers } = useCollection<User>(usersQuery);

  useEffect(() => {
    const fetchAllProgress = async () => {
      if (!firestore) return;
      // Don't fetch until users are loaded, otherwise we might not have a logged-in user context for rules
      if (isLoadingUsers) return;

      setIsProgressLoading(true);

      const progressQuery = collectionGroup(firestore, 'moduleProgress');
      
      try {
        const querySnapshot = await getDocs(progressQuery);
        const progressData = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id } as UserProgress));
        setAllProgress(progressData);
      } catch (serverError) {
        console.error("Original Firestore error:", serverError) // Keep for basic debugging, but emit the contextual one.
        const permissionError = new FirestorePermissionError({
          path: 'moduleProgress (collection group)',
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setAllProgress([]); // Clear any potentially stale data
      } finally {
        setIsProgressLoading(false);
      }
    };

    fetchAllProgress();

  }, [firestore, isLoadingUsers]);


  if (isLoadingUsers || isProgressLoading) {
    return <div>Benutzer und Fortschrittsdaten werden geladen...</div>
  }

  return (
    <div>
      <UsersTableClient users={users || []} progress={allProgress} />
    </div>
  )
}
