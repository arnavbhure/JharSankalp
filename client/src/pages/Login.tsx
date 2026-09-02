import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useState } from 'react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="w-full max-w-sm text-left">
        <div className="text-center mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-purple text-neutral-0 text-body font-bold mx-auto mb-3 shadow-subtle">
            JS
          </div>
          <h1 className="text-h2 font-bold text-neutral-900 tracking-tight">Sign in to JharSankalp</h1>
          <p className="mt-1 text-small text-neutral-600">
            Societal Challenge-to-Impact Exchange
          </p>
        </div>

        <Card padding="lg">
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              console.log('Login:', email);
            }}
            className="space-y-4"
          >
            <Input
              label="Official Email / Phone"
              type="email"
              placeholder="user@jharsankalp.in"
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
            <Button type="submit" variant="primary" className="w-full mt-2">
              Sign In
            </Button>
          </form>

          <div className="mt-5 rounded-sm border border-neutral-200 bg-neutral-50 p-3">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Demo Credentials (Password: password123)
            </p>
            <div className="space-y-1 text-caption text-neutral-800 font-mono">
              <div className="flex justify-between"><span>Citizen:</span> <span className="text-neutral-600">citizen@demo.jharsankalp.in</span></div>
              <div className="flex justify-between"><span>Government:</span> <span className="text-neutral-600">officer@demo.jharsankalp.in</span></div>
              <div className="flex justify-between"><span>University:</span> <span className="text-neutral-600">uniadmin@demo.jharsankalp.in</span></div>
              <div className="flex justify-between"><span>Faculty:</span> <span className="text-neutral-600">faculty@demo.jharsankalp.in</span></div>
              <div className="flex justify-between"><span>Industry:</span> <span className="text-neutral-600">industry@demo.jharsankalp.in</span></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
