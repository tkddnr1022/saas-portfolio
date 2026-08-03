"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ko">
      <body className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-white px-6 text-center text-neutral-900">
        <h1 className="text-xl font-semibold">문제가 발생했습니다</h1>
        <p className="max-w-md text-sm text-neutral-600">
          잠시 후 다시 시도해 주세요. 문제가 계속되면 새로고침해 주세요.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
        >
          다시 시도
        </button>
      </body>
    </html>
  );
}
