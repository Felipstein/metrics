import { LucideIcon, LucideProps } from 'lucide-react';
import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

type DashedActionButtonRootProps = ComponentProps<'button'>;

function DashedActionButtonRoot({ className, ...props }: DashedActionButtonRootProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-md border-2 border-dashed px-4 py-3 opacity-80 transition-opacity hover:opacity-100',
        className,
      )}
      {...props}
    />
  );
}

interface DashedActionButtonIconProps extends LucideProps {
  icon: LucideIcon;
}

function DashedActionButtonIcon({ icon: Icon, className, ...props }: DashedActionButtonIconProps) {
  return <Icon className={cn('h-6 w-6', className)} {...props} />;
}

type DashedActionButtonLabelProps = ComponentProps<'span'>;

function DashedActionButtonLabel(props: DashedActionButtonLabelProps) {
  return <span {...props} />;
}

export interface DashedActionButtonProps extends DashedActionButtonRootProps {
  icon?: LucideIcon;
  label?: string;
}

export function DashedActionButton({ icon, label, ...props }: DashedActionButtonProps) {
  return (
    <DashedActionButtonRoot {...props}>
      {icon && <DashedActionButtonIcon icon={icon} />}

      {label && <DashedActionButtonLabel>{label}</DashedActionButtonLabel>}
    </DashedActionButtonRoot>
  );
}

DashedActionButton.Root = DashedActionButtonRoot;
DashedActionButton.Icon = DashedActionButtonIcon;
DashedActionButton.Label = DashedActionButtonLabel;
