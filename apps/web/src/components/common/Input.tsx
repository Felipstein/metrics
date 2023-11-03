import { ComponentProps, forwardRef } from 'react';

import { cn } from '@/utils/cn';

export type InputProps = ComponentProps<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'rounded-md border border-white/30 bg-transparent px-4 py-3 text-sm text-white outline-none ring-2 ring-transparent ring-offset-1 ring-offset-transparent transition-colors placeholder:text-white/40 focus:bg-sky-50/10 focus:ring-sky-300',
      className,
    )}
    {...props}
  />
));
