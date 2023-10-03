export default class ConfigurationService {
  isObservabilityEnabled(): boolean {
    return process.env.APP_OBSERVABILITY_ENABLED === "true";
  }
}
