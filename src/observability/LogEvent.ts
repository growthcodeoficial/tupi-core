import { LogLevel } from "@observability/LogLevel";

export interface LogEvent {
  message: string;
  level: LogLevel;
  context?: any;
}
