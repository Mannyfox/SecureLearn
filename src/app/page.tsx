'use client';

import { Button } from "@/components/ui/button";
import { ApfelkisteLogo } from "@/components/apfelkiste-logo";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function GoogleIcon() {
  return (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
      <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-69.5 69.5c-24.3-23.6-55.2-38.1-90.4-38.1-69.1 0-126.2 56.2-126.2 125.9s57.1 125.9 126.2 125.9c79.1 0 109.1-62.4 112.5-92.4H248v-84.9h236.5c2.3 12.7 3.5 25.8 3.5 39.4z"></path>
    </svg>
  );
}

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <ApfelkisteLogo className="h-16 w-16 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 font-headline">
            Apfelkiste SecureLearn
          </h1>
          <p className="mt-2 text-muted-foreground">
            Please sign in to access your security training.
          </p>
        </div>
        <div className="space-y-4">
          <Button 
            onClick={() => login('user')} 
            variant="outline" 
            size="lg" 
            className="w-full text-base"
          >
            <GoogleIcon />
            Sign In as User
          </Button>
          <Button 
            onClick={() => login('admin')} 
            variant="outline" 
            size="lg" 
            className="w-full text-base"
          >
            <GoogleIcon />
            Sign In as Admin
          </Button>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By signing in, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}
