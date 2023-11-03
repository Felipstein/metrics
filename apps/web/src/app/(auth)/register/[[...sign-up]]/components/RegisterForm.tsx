'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { confirmPassword } from '@metrics/contracts/lib/http/defaultValidations/confirmPassword';
import { email } from '@metrics/contracts/lib/http/defaultValidations/email';
import { password } from '@metrics/contracts/lib/http/defaultValidations/password';
import { userName } from '@metrics/contracts/lib/http/defaultValidations/userName';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '@/components/common/Button';
import { DialogBox } from '@/components/common/DialogBox';
import { InputField } from '@/components/common/form/InputField';
import { LabelButton } from '@/components/common/LabelButton';

const registerFormSchema = z
  .object({
    name: userName,
    email,
    password,
    confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const {
    register: registerField,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = form;

  const [error, setError] = useState<string | null>(null);

  async function handleRegister(data: RegisterFormData) {
    if (error) {
      setError(null);
    }

    try {
      // eslint-disable-next-line no-console
      console.log(data);
    } catch (err: unknown) {
      let message: string;

      if (err instanceof Error) {
        message = err.message;
      } else {
        message = 'An unknown error occurred. Try again later.';
      }

      setError(message);
      console.error(err);
    }
  }

  return (
    <FormProvider {...form}>
      <form noValidate className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
        {error && <DialogBox onClose={() => setError(null)}>{error}</DialogBox>}

        <div className="space-y-4">
          <InputField type="text" label="Name" {...registerField('name')} />

          <InputField type="email" label="Email" placeholder="example@example.com" {...registerField('email')} />

          <InputField type="password" label="Password" placeholder="*********" {...registerField('password')} />

          <InputField
            type="password"
            label="Confirm Password"
            placeholder="*********"
            {...registerField('confirmPassword')}
          />
        </div>

        <footer className="flex flex-col items-center justify-center gap-2.5">
          <Button className="w-full" disabled={!isValid} type="submit" loading={isSubmitting}>
            Register
          </Button>

          <LabelButton asChild>
            <Link href="/login">Already have an account?</Link>
          </LabelButton>
        </footer>
      </form>
    </FormProvider>
  );
}
