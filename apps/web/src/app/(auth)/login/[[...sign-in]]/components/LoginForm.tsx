'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { email } from '@metrics/contracts/src/http/defaultValidations/email';
import { password } from '@metrics/contracts/src/http/defaultValidations/password';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '@/components/common/Button';
import { DialogBox } from '@/components/common/DialogBox';
import { InputField } from '@/components/common/form/InputField';
import { LabelButton } from '@/components/common/LabelButton';

const logInFormSchema = z.object({
  email,
  password,
});

type LogInFormData = z.infer<typeof logInFormSchema>;

export function LoginForm() {
  const form = useForm<LogInFormData>({
    resolver: zodResolver(logInFormSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = form;

  const [error, setError] = useState<string | null>(null);

  async function handleLogIn(data: LogInFormData) {
    if (error) {
      setError(null);
    }

    try {
      // eslint-disable-next-line no-console
      console.log(data);
    } catch (err: any) {
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
      <form noValidate className="space-y-6" onSubmit={handleSubmit(handleLogIn)}>
        {error && <DialogBox onClose={() => setError(null)}>{error}</DialogBox>}

        <div className="space-y-4">
          <InputField type="email" label="Email" placeholder="example@example.com" {...register('email')} />

          <InputField type="password" label="Password" placeholder="*********" {...register('password')} />
        </div>

        <footer className="flex flex-col items-center justify-center gap-2.5">
          <Button className="w-full" disabled={!isValid} type="submit" loading={isSubmitting}>
            Login
          </Button>

          <LabelButton asChild>
            <Link href="/register">Don&apos;t have an account?</Link>
          </LabelButton>
        </footer>
      </form>
    </FormProvider>
  );
}
