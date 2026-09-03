import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[50vh] items-center justify-center text-center px-4">
      <div className="space-y-3">
        <div className="text-display font-bold text-neutral-300 font-mono">404</div>
        <h1 className="text-h2 font-bold text-neutral-900 tracking-tight">
          Record or Page Not Found
        </h1>
        <p className="max-w-md mx-auto text-small text-neutral-600 leading-normal">
          The requested system route does not exist or has been relocated. Return to the portal
          overview.
        </p>
        <div className="pt-3">
          <Button
            variant="secondary"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            onClick={() => navigate('/')}
          >
            Back to Overview
          </Button>
        </div>
      </div>
    </div>
  );
}
