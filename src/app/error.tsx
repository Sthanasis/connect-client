'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; status?: number };
  reset: () => void;
}) {
  const [isServerError, setIsServerError] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (error.status?.toString().startsWith('5')) {
      setIsServerError(true);
    }
  }, [error]);

  return (
    <div>
      {isServerError ? (
        <>
          <h2>
            Something went wrong on our end! We are trying to fix it as soon as
            possible!
          </h2>
          <button onClick={() => router.replace('/')}>Go to home page</button>
        </>
      ) : (
        <>
          <h2>Something went wrong!</h2>
          <button onClick={() => reset()}>Try again</button>
        </>
      )}
    </div>
  );
}
