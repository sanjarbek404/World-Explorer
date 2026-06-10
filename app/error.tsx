'use client';

import { useEffect } from 'react';
import ErrorMessage from '@/components/ErrorMessage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center py-20 px-4">
      <ErrorMessage 
        message={error.message || "An unexpected error occurred while loading this page."} 
        onRetry={reset} 
      />
    </div>
  );
}
