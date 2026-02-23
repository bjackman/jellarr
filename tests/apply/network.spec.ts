import { describe, it, expect } from "vitest";
import { calculateNetworkDiff } from "../../src/apply/network";
import type { NetworkConfigurationSchema } from "../../src/types/schema/network";
import type { NetworkConfig } from "../../src/types/config/network";

describe("apply/network", () => {
  it("should return undefined if no changes", () => {
    const current: NetworkConfigurationSchema = {
      KnownProxies: ["1.2.3.4"],
    };
    const desired: NetworkConfig = {
      knownProxies: ["1.2.3.4"],
    };
    const result = calculateNetworkDiff(current, desired);
    expect(result).toBeUndefined();
  });

  it("should return undefined if no changes (different order)", () => {
    const current: NetworkConfigurationSchema = {
      KnownProxies: ["1.2.3.4", "5.6.7.8"],
    };
    const desired: NetworkConfig = {
      knownProxies: ["5.6.7.8", "1.2.3.4"],
    };
    const result = calculateNetworkDiff(current, desired);
    expect(result).toBeUndefined();
  });

  it("should return updated schema if changes detected", () => {
    const current: NetworkConfigurationSchema = {
      KnownProxies: ["1.2.3.4"],
      BaseUrl: "/jellyfin",
    };
    const desired: NetworkConfig = {
      knownProxies: ["1.2.3.4", "5.6.7.8"],
    };
    const result = calculateNetworkDiff(current, desired);
    expect(result).toEqual({
      KnownProxies: ["1.2.3.4", "5.6.7.8"],
      BaseUrl: "/jellyfin",
    });
  });

  it("should ignore fields not present in desired config", () => {
    const current: NetworkConfigurationSchema = {
      KnownProxies: ["1.2.3.4"],
    };
    const desired: NetworkConfig = {};
    const result = calculateNetworkDiff(current, desired);
    expect(result).toBeUndefined();
  });
});
