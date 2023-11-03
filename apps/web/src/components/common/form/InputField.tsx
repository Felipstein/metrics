'use client';

import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { Input, InputProps } from '../Input';
import { Label } from '../Label';

export interface InputFieldProps extends Omit<InputProps, 'name'> {
  name: string;
  label?: string;
  optional?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id: idProvided, label, optional = false, ...props }, ref) => {
    const formContext = useFormContext();

    if (!formContext) {
      throw new Error('InputField must be used wrapped in a <FormProvider>');
    }

    const {
      register,
      formState: { errors },
    } = formContext;

    const id = idProvided || props.name;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <Label htmlFor={id} className="flex items-center gap-1.5">
            {label}
            {optional && <span className="text-xs italic opacity-60">- Optional</span>}
          </Label>
        )}

        {/* @ts-ignore */}
        <Input ref={ref} id={id} {...props} {...register(props.name)} />

        {errors[props.name]?.message && (
          // @ts-ignore
          <span className="text-sm font-medium text-red-500">{errors[props.name].message}</span>
        )}
      </div>
    );
  },
);
