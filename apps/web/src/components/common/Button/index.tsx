'use client';

import { LucideIcon } from 'lucide-react';
import { ComponentProps, ComponentType, MouseEvent, useState } from 'react';

import { LoaderIcon as DefaultLoaderIcon } from '@/components/LoaderIcon';
import { cn } from '@/utils/cn';

type ButtonVariant = 'default' | 'danger' | 'ghost';

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'onClick'> {
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: LucideIcon;
  loaderIcon?: LucideIcon | ComponentType;
  ignoreAutoLoading?: boolean;
  notHideIconWhenLoaderIconShow?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

export function Button({
  variant = 'default',
  loading = false,
  icon: Icon,
  loaderIcon: LoaderIcon = DefaultLoaderIcon,
  ignoreAutoLoading = false,
  notHideIconWhenLoaderIconShow = false,
  onClick,
  className,
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false);

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (!onClick) {
      return;
    }

    const result = onClick(event);

    if (result instanceof Promise && !ignoreAutoLoading) {
      setInternalLoading(true);

      try {
        await result;
      } finally {
        setInternalLoading(false);
      }
    }
  }

  const isLoading = internalLoading || loading;

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={cn(
        'flex items-center justify-center gap-1 overflow-hidden rounded-md px-4 py-3 text-sm font-medium shadow-md transition-all hover:brightness-105',
        (disabled || isLoading) && 'pointer-events-none opacity-60',
        {
          'bg-sky-400 text-white active:bg-sky-500': variant === 'default',
          'bg-red-400 text-white active:bg-red-500': variant === 'danger',
          'bg-transparent px-2.5 py-1.5 text-sky-500 shadow-none hover:brightness-110 active:text-sky-600':
            variant === 'ghost',
        },
        className,
      )}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && LoaderIcon && <LoaderIcon className="h-4 w-4 animate-spin" />}

      {notHideIconWhenLoaderIconShow
        ? Icon && <Icon className="h-4 w-4" />
        : Icon && !isLoading && !LoaderIcon && <Icon className="h-4 w-4" />}

      {children}
    </button>
  );
}
