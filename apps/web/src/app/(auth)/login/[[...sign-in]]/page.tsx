import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1.5">
        <h3 className="text-3xl font-semibold">Login</h3>

        <p className="opacity-80">Welcome back</p>
      </header>

      <SignIn />
    </div>
  );
}
