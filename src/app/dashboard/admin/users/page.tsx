'use client';

import { UsersTableClient } from "@/components/admin/users-table-client"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
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
      setIsProgressLoading(true);

      const progressQuery = query(collectionGroup(firestore, 'moduleProgress'));
      const querySnapshot = await getDocs(progressQuery);
      const progressData = querySnapshot.docs.map(doc => doc.data() as UserProgress);
      
      setAllProgress(progressData);
      setIsProgressLoading(false);
    };

    fetchAllProgress();

  }, [firestore]);


  if (isLoadingUsers || isProgressLoading) {
    return <div>Benutzer und Fortschrittsdaten werden geladen...</div>
  }

  return (
    <div>
      <UsersTableClient users={users || []} progress={allProgress} />
    </div>
  )
}
