import { Apple } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ApfelkisteLogo({ className, ...props }: React.HTMLAttributes<SVGElement>) {
  return (
    <Apple
      className={cn("text-primary", className)}
      {...props}
    />
  );
}
