import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '../stores/authStore';
import { ToastContainer } from '../components/ui/Toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Global providers wrapper.
 * Initializes authentication state from HttpOnly cookie and renders global Toast container.
 */
export function Providers({ children }: ProvidersProps) {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      {children}
    </QueryClientProvider>
  );
}
