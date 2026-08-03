import * as Sentry from "@sentry/nextjs";

type ChatErrorContext = {
  source: "api" | "client" | "stream";
  [key: string]: unknown;
};

export function reportChatError(error: unknown, context: ChatErrorContext) {
  Sentry.withScope((scope) => {
    scope.setTag("feature", "chatbot");
    scope.setTag("chat.source", context.source);
    scope.setExtras(context);
    Sentry.captureException(error);
  });
}
