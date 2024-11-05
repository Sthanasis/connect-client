'use client';
import { useRouter } from 'next/navigation';

export default function GlobalError() {
  const router = useRouter();

  return (
    <html>
      <body>
        <div>
          <h2>
            Something went wrong on our end! We are trying to fix it as soon as
            possible!
          </h2>
          <button onClick={() => router.replace('/')}>Go to home page</button>
        </div>
      </body>
    </html>
  );
}
