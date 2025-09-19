type LogLevel = "info" | "warn" | "error" | "debug";

const COLORS = {
  reset: "\x1b[0m",
  info: "\x1b[36m",   // cyan
  warn: "\x1b[33m",   // yellow
  error: "\x1b[31m",  // red
  debug: "\x1b[35m",  // magenta
};

// Safe stringify that avoids crashes on circular objects
function safeStringify(obj: any, space = 2): string {
  try {
    const cache = new Set();
    return JSON.stringify(
      obj,
      (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (cache.has(value)) return "[Circular]";
          cache.add(value);
        }
        return value;
      },
      space
    );
  } catch {
    return String(obj);
  }
}

const Logger = {
  log: (level: LogLevel, message: string, data?: unknown) => {
    const timestamp = new Date().toISOString();
    const color = COLORS[level];
    const formatted =
      data !== undefined
        ? `${message} ${safeStringify(data)}`
        : message;

    const logLine = `${color}[${level.toUpperCase()}] [${timestamp}]${COLORS.reset} ${formatted}`;

    switch (level) {
      case "info":
        console.info(logLine);
        break;
      case "warn":
        console.warn(logLine);
        break;
      case "error":
        console.error(logLine);
        break;
      case "debug":
        if (__DEV__) console.debug(logLine); // only log debug in dev mode
        break;
    }
  },

  info: (message: string, data?: unknown) => Logger.log("info", message, data),
  warn: (message: string, data?: unknown) => Logger.log("warn", message, data),
  error: (message: string, data?: unknown) => Logger.log("error", message, data),
  debug: (message: string, data?: unknown) => Logger.log("debug", message, data),
};

export default Logger;
