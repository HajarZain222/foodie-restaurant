"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
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
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">

          <h1 className="text-5xl font-bold text-orange-500 mb-4">
            Oops! Something went wrong 
          </h1>

          <p className="text-gray-600 mb-6">
            The kitchen is having trouble right now. Please try again.
          </p>

          <div className="flex gap-4">

            <button
              onClick={() => reset()}
              className="rounded-xl bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
            >
              Try Again
            </button>

            <Link
              href="/"
              className="rounded-xl border border-orange-500 px-5 py-2 text-orange-500 hover:bg-orange-100"
            >
              Go Home
            </Link>

          </div>

        </div>
      </body>
    </html>
  );
}