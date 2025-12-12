"use client";

import { useEffect } from "react";
import ErrorDisplay from "../../components/errors/ErrorDisplay";
import { APIError } from "../../lib/utils/errors";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Projects page error:", error);
  }, [error]);

  // Convert Next.js error to APIError if possible
  const apiError = error instanceof APIError 
    ? error 
    : new APIError(error.message || "An error occurred", 500, "Internal Server Error");

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <ErrorDisplay
          error={apiError}
          onRetry={reset}
          showHomeButton={true}
        />
      </div>
    </div>
  );
}

