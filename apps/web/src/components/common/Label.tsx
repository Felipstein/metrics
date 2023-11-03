import { ComponentProps } from 'react';

export type LabelProps = ComponentProps<'label'>;

export function Label({ className, ...props }: LabelProps) {
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  return <label className={className} {...props} />;
}
