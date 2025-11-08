"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser, useAuth as useFirebaseAuth } from "@/firebase";
import { useRouter } from "next/navigation"
import type { User as UserProfile } from "@/lib/types";

interface UserNavProps {
    userProfile: UserProfile;
}

export function UserNav({ userProfile }: UserNavProps) {
  const { user } = useUser();
  const auth = useFirebaseAuth();
  const router = useRouter()
  
  const handleLogout = async () => {
    if (auth) {
        await auth.signOut();
    }
    router.push('/');
  }
  
  if (!user || !userProfile) return null;

  const displayUser = userProfile;

  const initials = displayUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={displayUser.avatarUrl} alt={displayUser.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayUser.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {displayUser.email}
            </p>          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profil
          </DropdownMenuItem>
          <DropdownMenuItem>
            Einstellungen
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Abmelden
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
