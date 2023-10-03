import { LogEvent } from "@observability/LogEvent";

export interface Interceptor {
  intercept(event: LogEvent): void;
}
