import { Slot } from '@radix-ui/react-slot';
import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

export type LabelButtonProps<TAsChild extends boolean> = (TAsChild extends true
  ? ComponentProps<'div'>
  : ComponentProps<'button'>) & {
  asChild?: TAsChild;
};

export function LabelButton<TAsChild extends boolean>({ className, asChild, ...props }: LabelButtonProps<TAsChild>) {
  const Comp = asChild ? Slot : 'button';

  return (
    // @ts-ignore
    <Comp
      className={cn('text-sm opacity-80 transition-opacity hover:underline hover:opacity-90', className)}
      {...props}
    />
  );
}
