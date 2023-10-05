import ConfigurationService from "@config/ConfigurationService";

export default function Instrumented(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const config = new ConfigurationService();

  descriptor.value = function (...args: any[]) {
    if (config.isObservabilityEnabled()) {
      const start = performance.now();
      const result = originalMethod.apply(this, args);
      const end = performance.now();
      console.log(`${propertyKey} took ${end - start}ms`);
      return result;
    } else {
      return originalMethod.apply(this, args);
    }
  };

  return descriptor;
}
