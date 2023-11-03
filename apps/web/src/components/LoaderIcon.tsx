import { Loader2, LucideProps } from 'lucide-react';

import { cn } from '@/utils/cn';

export function LoaderIcon({ className, ...props }: LucideProps) {
  return <Loader2 className={cn('h-6 w-6 animate-spin text-white/80', className)} {...props} />;
}
