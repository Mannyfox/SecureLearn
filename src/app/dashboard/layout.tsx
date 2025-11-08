'use client';

import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ApfelkisteLogo } from "@/components/apfelkiste-logo";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { doc } from "firebase/firestore";
import type { User as UserProfile } from "@/lib/types";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userProfileRef = useMemoFirebase(() => (firestore && user) ? doc(firestore, 'users', user.uid) : null, [firestore, user]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);
  
  const isLoading = isUserLoading || isProfileLoading;

  if (isLoading || !user) {
     return (
      <div className="flex min-h-screen w-full">
        <div className="hidden md:block w-72 border-r p-4 space-y-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex-1 p-8 space-y-4">
           <Skeleton className="h-10 w-1/3" />
           <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }
  
  const displayUser = {
      id: user.uid,
      name: userProfile?.name || user.displayName || 'Benutzer',
      email: userProfile?.email || user.email || 'anonym@apfelkiste.ch',
      role: userProfile?.role || 'user',
      department: userProfile?.department || 'Technik',
      avatarUrl: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/dashboard" className="flex items-center gap-2 font-semibold">
              <ApfelkisteLogo className="h-6 w-6" />
              <span className="font-headline">Apfelkiste</span>
            </a>
          </div>
          <ScrollArea className="flex-1">
            <MainNav user={displayUser} />
          </ScrollArea>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Navigationsmenü umschalten</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <a href="/dashboard" className="flex items-center gap-2 font-semibold">
                        <ApfelkisteLogo className="h-6 w-6" />
                        <span className="font-headline">Apfelkiste</span>
                    </a>
                </div>
                <ScrollArea className="flex-1">
                    <MainNav user={displayUser} />
                </ScrollArea>
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
            {/* Can add a global search here in the future */}
          </div>
          <UserNav userProfile={displayUser} />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
