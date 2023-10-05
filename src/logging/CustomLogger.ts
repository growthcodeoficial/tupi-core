import ConfigurationService from "@config/ConfigurationService";
import Logger from "@logging/Logger";

class CustomLogger implements Logger {
  constructor(private config: ConfigurationService) {}

  info(message: string): void {
    if (this.config.isObservabilityEnabled()) {
      console.info(`INFO: ${message}`);
    }
  }

  error(message: string): void {
    if (this.config.isObservabilityEnabled()) {
      console.error(`ERROR: ${message}`);
    }
  }

  warn(message: string): void {
    if (this.config.isObservabilityEnabled()) {
      console.warn(`WARN: ${message}`);
    }
  }
}
