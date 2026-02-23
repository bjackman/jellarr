import type { NetworkConfig } from "../types/config/network";
import type { NetworkConfigurationSchema } from "../types/schema/network";

export function mapNetworkConfigToSchema(
  desired: NetworkConfig,
): Partial<NetworkConfigurationSchema> {
  const out: Partial<NetworkConfigurationSchema> = {};

  if (desired.knownProxies !== undefined) {
    out.KnownProxies = desired.knownProxies;
  }

  return out;
}
