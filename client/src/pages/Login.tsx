import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useState } from 'react';

/**
 * Login page — Phase 1 stub.
 * Phase 2 will implement real JWT auth.
 */
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white text-lg font-bold mx-auto">
            JS
          </div>
          <h1 className="mt-3 text-xl font-semibold text-ink-900">Sign in to JharSankalp</h1>
          <p className="mt-1 text-sm text-ink-500">
            Societal Challenge-to-Impact Exchange
          </p>
        </div>

        <Card padding="lg">
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              // Phase 2: Real auth
              console.log('Login:', email);
            }}
            className="space-y-4"
          >
            <Input
              label="Email"
              type="email"
              placeholder="citizen@demo.jharsankalp.in"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-4 rounded bg-ink-50 p-3">
            <p className="text-2xs font-medium text-ink-500 uppercase tracking-wider mb-2">
              Demo Accounts (password: password123)
            </p>
            <div className="space-y-1 text-xs text-ink-600">
              <div>citizen@demo.jharsankalp.in</div>
              <div>officer@demo.jharsankalp.in</div>
              <div>uniadmin@demo.jharsankalp.in</div>
              <div>faculty@demo.jharsankalp.in</div>
              <div>industry@demo.jharsankalp.in</div>
              <div>admin@demo.jharsankalp.in</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
