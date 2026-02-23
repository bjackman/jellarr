import { deepEqual } from "fast-equals";
import { logger } from "../lib/logger";
import type { JellyfinClient } from "../api/jellyfin.types";
import { mapNetworkConfigToSchema } from "../mappers/network";
import { type NetworkConfig } from "../types/config/network";
import { type NetworkConfigurationSchema } from "../types/schema/network";

function hasKnownProxiesChanged(
  current: NetworkConfigurationSchema,
  desired: NetworkConfig,
): boolean {
  if (desired.knownProxies === undefined) return false;

  const cur: string[] = current.KnownProxies ?? [];
  const next: string[] = desired.knownProxies;

  return !deepEqual([...cur].sort(), [...next].sort());
}

export function calculateNetworkDiff(
  current: NetworkConfigurationSchema,
  desired: NetworkConfig,
): NetworkConfigurationSchema | undefined {
  const hasChanges: boolean = hasKnownProxiesChanged(current, desired);

  if (!hasChanges) return undefined;

  if (hasKnownProxiesChanged(current, desired)) {
    logger.info(
      `KnownProxies changed: [${(current.KnownProxies ?? []).join(", ")}] → [${desired.knownProxies?.join(", ") ?? ""}]`,
    );
  }

  const patch: Partial<NetworkConfigurationSchema> =
    mapNetworkConfigToSchema(desired);
  const out: NetworkConfigurationSchema = { ...current };

  if ("KnownProxies" in patch) {
    out.KnownProxies = patch.KnownProxies;
  }

  return out;
}

export async function applyNetworkConfig(
  client: JellyfinClient,
  updatedSchema: NetworkConfigurationSchema | undefined,
): Promise<void> {
  if (!updatedSchema) return;
  await client.updateNetworkConfiguration(updatedSchema);
}
