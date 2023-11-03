import { SignUp } from '@clerk/nextjs';

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1.5">
        <h3 className="text-3xl font-semibold">Register</h3>

        <p className="opacity-80">Welcome</p>
      </header>

      <SignUp />
    </div>
  );
}
