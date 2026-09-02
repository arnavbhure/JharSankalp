import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[60vh] items-center justify-center text-center">
      <div>
        <div className="text-6xl font-bold text-ink-200 mb-2">404</div>
        <h1 className="text-lg font-semibold text-ink-900">Page Not Found</h1>
        <p className="mt-1 text-sm text-ink-500 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
