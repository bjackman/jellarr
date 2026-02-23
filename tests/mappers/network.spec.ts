import { describe, it, expect } from "vitest";
import { mapNetworkConfigToSchema } from "../../src/mappers/network";
import type { NetworkConfig } from "../../src/types/config/network";

describe("mappers/network", () => {
  it("should map knownProxies correctly", () => {
    const desired: NetworkConfig = {
      knownProxies: ["1.2.3.4", "5.6.7.8"],
    };
    const result = mapNetworkConfigToSchema(desired);
    expect(result.KnownProxies).toEqual(["1.2.3.4", "5.6.7.8"]);
  });

  it("should return empty object if knownProxies is undefined", () => {
    const desired: NetworkConfig = {};
    const result = mapNetworkConfigToSchema(desired);
    expect(result).toEqual({});
  });
});
