'use client';

import { UsersTableClient } from "@/components/admin/users-table-client"
import { useCollection, useFirestore, useMemoFirebase, errorEmitter, FirestorePermissionError } from "@/firebase";
import { collection, query, getDocs, collectionGroup } from "firebase/firestore";
import type { User, UserProgress } from "@/lib/types";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const firestore = useFirestore();
  const [allProgress, setAllProgress] = useState<UserProgress[]>([]);
  const [isProgressLoading, setIsProgressLoading] = useState(true);
  
  const usersQuery = useMemoFirebase(() => firestore ? query(collection(firestore, "users")) : null, [firestore]);
  const { data: users, isLoading: isLoadingUsers } = useCollection<User>(usersQuery);

  useEffect(() => {
    if (!firestore || isLoadingUsers) {
      // Don't run if firestore is not available or users are still loading.
      if (!isLoadingUsers) {
        setIsProgressLoading(false);
      }
      return;
    };

    setIsProgressLoading(true);

    const progressQuery = collectionGroup(firestore, 'moduleProgress');
    
    getDocs(progressQuery)
      .then(querySnapshot => {
        const progressData = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id } as UserProgress));
        setAllProgress(progressData);
      })
      .catch(serverError => {
        // This is the correct place to catch and handle the permission error.
        const permissionError = new FirestorePermissionError({
          path: 'moduleProgress (collection group)',
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setAllProgress([]); // Clear any potentially stale data
      })
      .finally(() => {
        setIsProgressLoading(false);
      });

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
