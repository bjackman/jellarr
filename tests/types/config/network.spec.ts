import { describe, it, expect } from "vitest";
import { NetworkConfigType } from "../../../src/types/config/network";

describe("types/config/network", () => {
  it("should validate a valid network config", () => {
    const config = {
      knownProxies: ["1.2.3.4"],
    };
    const result = NetworkConfigType.safeParse(config);
    expect(result.success).toBe(true);
  });

  it("should validate an empty network config", () => {
    const config = {};
    const result = NetworkConfigType.safeParse(config);
    expect(result.success).toBe(true);
  });

  it("should fail validation if knownProxies is not an array", () => {
    const config = {
      knownProxies: "1.2.3.4",
    };
    const result = NetworkConfigType.safeParse(config);
    expect(result.success).toBe(false);
  });

  it("should fail validation if unknown fields are present", () => {
    const config = {
      unknownField: "value",
    };
    const result = NetworkConfigType.safeParse(config);
    expect(result.success).toBe(false);
  });
});
