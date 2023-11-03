'use client';

import { AlertCircle, LucideIcon, LucideProps, X } from 'lucide-react';
import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

interface DialogBoxRootProps extends ComponentProps<'div'> {
  hasCloseButton?: boolean;
  closeButtonIcon?: LucideIcon;
  onClose?: () => void;
}

function DialogBoxRoot({
  hasCloseButton = true,
  closeButtonIcon: CloseButtonIcon = X,
  onClose,
  className,
  children,
  ...props
}: DialogBoxRootProps) {
  return (
    <div
      className={cn(
        'relative flex max-w-xl items-center gap-3 rounded-md bg-red-200 px-3 py-5 text-red-500 shadow-md',
        className,
      )}
      {...props}
    >
      {children}

      {hasCloseButton && CloseButtonIcon && onClose && (
        <button type="button" onClick={onClose}>
          <CloseButtonIcon className="absolute right-3 top-2.5 h-4 w-4 sm:h-3 sm:w-3" />
        </button>
      )}
    </div>
  );
}

interface DialogBoxIconProps extends LucideProps {
  icon?: LucideIcon;
}

function DialogBoxIcon({ icon: Icon = AlertCircle, className, ...props }: DialogBoxIconProps) {
  return <Icon className={cn('h-4 w-4 flex-shrink-0', className)} {...props} />;
}

type DialogBoxMessageProps = ComponentProps<'span'>;

function DialogBoxMessage({ className, ...props }: DialogBoxMessageProps) {
  return (
    <span
      className={cn('truncate text-sm font-medium', className)}
      title={typeof props.children === 'string' ? props.children : undefined}
      {...props}
    />
  );
}

export interface DialogBoxProps extends DialogBoxRootProps {
  icon?: LucideIcon;
  hasCloseButton?: boolean;
  closeButtonIcon?: LucideIcon;
  onClose?: () => void;
}

export function DialogBox({ icon, children, ...props }: DialogBoxProps) {
  return (
    <DialogBoxRoot {...props}>
      <DialogBoxIcon icon={icon} />

      <DialogBoxMessage>{children}</DialogBoxMessage>
    </DialogBoxRoot>
  );
}

DialogBox.Root = DialogBoxRoot;
DialogBox.Icon = DialogBoxIcon;
DialogBox.Message = DialogBoxMessage;
