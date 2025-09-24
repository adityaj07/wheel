// logger.ts
type LogLevel = "info" | "error" | "warn" | "debug";

interface Logger {
  info: (message: string, data?: any) => void;
  error: (message: string, error?: any) => void;
  warn: (message: string, data?: any) => void;
  debug: (message: string, data?: any) => void;

  // Auth-specific
  authInfo: (message: string, data?: any) => void;
  authError: (message: string, error?: any) => void;
  authDebug: (message: string, data?: any) => void;
}

const createLogger = (
  isDevelopment: boolean = __DEV__ || process.env.NODE_ENV === "development",
): Logger => {
  const log = (level: LogLevel, message: string, data?: any) => {
    if (!isDevelopment) {
      // In production → forward to crash reporting service (Sentry, etc.)
      if (level === "error") {
        // Example: Sentry.captureException(data ?? message);
      }
      return;
    }

    switch (level) {
      case "info":
        console.log(`[INFO] ${message}`, data ?? "");
        break;
      case "error":
        console.error(`[ERROR] ${message}`, data ?? "");
        break;
      case "warn":
        console.warn(`[WARN] ${message}`, data ?? "");
        break;
      case "debug":
        console.debug(`[DEBUG] ${message}`, data ?? "");
        break;
    }
  };

  return {
    info: (message, data) => log("info", message, data),
    error: (message, error) => log("error", message, error),
    warn: (message, data) => log("warn", message, data),
    debug: (message, data) => log("debug", message, data),

    authInfo: (message, data) => log("info", `[AUTH] ${message}`, data),
    authError: (message, error) => log("error", `[AUTH] ${message}`, error),
    authDebug: (message, data) => log("debug", `[AUTH] ${message}`, data),
  };
};

const Logger = createLogger();

export default Logger;
