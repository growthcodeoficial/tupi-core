import ConfigurationService from "@config/ConfigurationService";

export default class EventObserver {
  private listeners: Array<(event: string, data: any) => void> = [];

  constructor(private config: ConfigurationService) {}

  subscribe(listener: (event: string, data: any) => void): void {
    this.listeners.push(listener);
  }

  unsubscribe(listener: (event: string, data: any) => void): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  emit(event: string, data: any): void {
    if (this.config.isObservabilityEnabled()) {
      this.listeners.forEach((listener) => listener(event, data));
    }
  }
}
