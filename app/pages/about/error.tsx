"use client";

import { useEffect } from "react";
import ErrorDisplay from "../../components/errors/ErrorDisplay";
import { APIError } from "../../lib/utils/errors";

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("About page error:", error);
  }, [error]);

  const apiError = error instanceof APIError 
    ? error 
    : new APIError(error.message || "Failed to load about data", 500, "Internal Server Error");

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

