"use client";

import { useEffect } from "react";
import ErrorDisplay from "./components/errors/ErrorDisplay";
import { APIError } from "./lib/utils/errors";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  const apiError = error instanceof APIError 
    ? error 
    : new APIError(error.message || "An unexpected error occurred", 500, "Internal Server Error");

  return (
    <html>
      <body className="min-h-screen w-full bg-[#1a1a1a] flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <ErrorDisplay
            error={apiError}
            onRetry={reset}
            showHomeButton={true}
          />
        </div>
      </body>
    </html>
  );
}

