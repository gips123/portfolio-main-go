"use client";

import { useEffect } from "react";
import ErrorDisplay from "../../components/errors/ErrorDisplay";
import { APIError } from "../../lib/utils/errors";

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Home page error:", error);
  }, [error]);

  const apiError = error instanceof APIError 
    ? error 
    : new APIError(error.message || "Failed to load home page", 500, "Internal Server Error");

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <ErrorDisplay
          error={apiError}
          onRetry={reset}
          showHomeButton={false}
        />
      </div>
    </div>
  );
}

