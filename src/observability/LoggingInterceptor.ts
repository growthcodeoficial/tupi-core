import { Interceptor } from "@observability/Interceptor";
import { LogEvent } from "@observability/LogEvent";
import { LogLevel } from "@observability/LogLevel";

export class LoggingInterceptor implements Interceptor {
  private readonly logLevel: LogLevel;

  constructor(logLevel: LogLevel = LogLevel.INFO) {
    this.logLevel = logLevel;
  }

  intercept(event: LogEvent): void {
    if (this.shouldLog(event)) {
      console.log(this.formatLogMessage(event));
    }
  }

  private shouldLog(event: LogEvent): boolean {
    return (
      event.level.localeCompare(this.logLevel, undefined, {
        sensitivity: "base",
      }) >= 0
    );
  }

  private formatLogMessage(event: LogEvent): string {
    return `[${event.level.toUpperCase()}] ${event.message} ${
      event.context ? JSON.stringify(event.context) : ""
    }`;
  }
}
